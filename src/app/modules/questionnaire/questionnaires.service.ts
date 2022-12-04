import { ApolloError } from "@apollo/client/errors";
import { questionContext } from "@helpers/question/questionContext";
import { generatePublishQuestionniareUrl } from "@helpers/urlGenrator";
import { validate, validator } from "@helpers/validation";
import { APIResponse, IQuestionnaire, Question, Questionnaire, QuestionnaireCreate, QuestionnairePublishResponse, QuestionUpdate } from "@type";

import * as QuestionnaireRepo from "./questionnaire.repo";

const QuestionnaireService: IQuestionnaire = {
  create: async (inserted: QuestionnaireCreate, userId: number): APIResponse<Questionnaire> => {
    let insertRes: Questionnaire;
    const { questions, ...questionnaire } = inserted;
    try {
      if (questions?.length) {
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

  update: async (updated: Questionnaire, userId: number): APIResponse<Questionnaire> => {
    try {
      const { questions, ...questionnaire } = updated;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ownerId, status, ...writeable } = questionnaire;

      const isOwner = await validate.questionnaireOwnership(id, userId);

      if (!isOwner) {
        throw new ApolloError({ errorMessage: "Error: User doesn't own this questionnaire" });
      }

      if (questions?.length) {
        const questionContexts = questions.map((q: Question) => questionContext(q.type));

        // eslint-disable-next-line @typescript-eslint/promise-function-async, @typescript-eslint/no-non-null-assertion
        const questionValidate = questionContexts.map((q, i) => q!.validateExistInQuestionnaire(questions[i].id, questionnaire.id));

        const isValid = await validator(questionValidate);

        if (!isValid) {
          throw new ApolloError({ errorMessage: "Error: Failed to update questionniare" });
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const questionUpdates: QuestionUpdate[] = questionContexts.map((q, i) => q!.update(questions[i]));

        return await QuestionnaireRepo.updateWithQuestions(id, writeable, questionUpdates);
      } else {
        return await QuestionnaireRepo.update(id, writeable);
      }
    } catch (error) {
      throw error;
    }
  },
};

export default QuestionnaireService;
