import { ApolloError } from "@apollo/client/errors";
import { generatePublishQuestionniareUrl } from "@helpers/urlGenrator";
import { validate, validator } from "@helpers/validation";
import { APIResponse, IQuestionnaire, QuestionEditable, Questionnaire, QuestionnaireEditable, QuestionnairePublishResponse } from "@type";

import * as QuestionnaireRepo from "./questionnaire.repo";

const QuestionnaireService: IQuestionnaire = {
  create: async (questionnaire: QuestionnaireEditable, questions: QuestionEditable[] | undefined, userId: number): APIResponse<Questionnaire> => {
    let insertRes: Questionnaire;

    try {
      if (questions && questions.length > 0) {
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

  update: async (id: number, updated: QuestionnaireEditable, userId: number): APIResponse<Questionnaire> => {
    try {
      const isValid = await validator([validate.questionnaireOwnership(id, userId)]);

      if (!isValid) {
        throw new ApolloError({ errorMessage: "Error: Failed to update questionniare" });
      }

      return await QuestionnaireRepo.update({ id, updated });
    } catch (error) {
      throw error;
    }
  },
};

export default QuestionnaireService;
