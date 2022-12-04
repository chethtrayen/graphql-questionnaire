import { ApolloError } from "@apollo/client/errors";
import { generatePublishQuestionniareUrl } from "@helpers/urlGenrator";
import { validate, validator } from "@helpers/validation";
import {
  APIResponse,
  IQuestionnaire,
  Question,
  QuestionWritable,
  Questionnaire,
  QuestionnaireWritable,
  QuestionnairePublishResponse,
  BaseQuestionnaire,
} from "@type";

import * as QuestionnaireRepo from "./questionnaire.repo";

const QuestionnaireService: IQuestionnaire = {
  create: async (questionnaire: QuestionnaireWritable, questions: QuestionWritable[] = [], userId: number): APIResponse<Questionnaire> => {
    let insertRes: Questionnaire;

    try {
      if (questions.length > 0) {
        insertRes = await QuestionnaireRepo.createWithQuestions(questionnaire, questions, userId);

        // sort the questions by asc order
        insertRes.questions = insertRes.questions?.sort((a, b) => a.order - b.order);
      } else {
        insertRes = await QuestionnaireRepo.create(questionnaire, userId);
      }

      return insertRes;
    } catch (error) {
      throw error;
    }
  },

  getByOwner: async (userId: number): APIResponse<Questionnaire[]> => {
    try {
      return await QuestionnaireRepo.getByOwner(userId);
    } catch (error) {
      throw new ApolloError({ errorMessage: "Error: Failed to get Questionnaires" });
    }
  },

  getPublishById: async (id: number): APIResponse<Questionnaire> => {
    try {
      const questionnaire: Questionnaire | undefined = await QuestionnaireRepo.getPublishById(id);

      if (questionnaire) {
        return questionnaire;
      }

      throw new ApolloError({ errorMessage: "Error: Failed to get questionnaire" });
    } catch (error) {
      throw error;
    }
  },

  publish: async (id: number, userId: number): APIResponse<QuestionnairePublishResponse> => {
    try {
      const isValid = await validator([validate.questionnaireOwnership(id, userId)]);

      if (!isValid) {
        throw new ApolloError({ errorMessage: "Error: Failed to publish questionniare" });
      }

      const updateRes = await QuestionnaireRepo.publish(id);
      const url = generatePublishQuestionniareUrl(id);

      return {
        questionnaire: updateRes,
        url,
      };
    } catch (error) {
      throw error;
    }
  },

  update: async (questionnaire: BaseQuestionnaire, userId: number, questions: Question[] = []): APIResponse<Questionnaire> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ownerId, status, ...writeable } = questionnaire;

      const isOwner = await validate.questionnaireOwnership(id, userId);
      if (!isOwner) {
        throw new ApolloError({ errorMessage: "Error: User doesn't own this questionnaire" });
      }

      // eslint-disable-next-line @typescript-eslint/promise-function-async
      const questionValidate = questions.map((q) => validate.questionExistInQuestionnaire(q.id, id));

      const isValid = await validator(questionValidate);

      if (!isValid) {
        throw new ApolloError({ errorMessage: "Error: Failed to update questionniare" });
      }

      return await QuestionnaireRepo.update(id, writeable);
    } catch (error) {
      throw error;
    }
  },
};

export default QuestionnaireService;
