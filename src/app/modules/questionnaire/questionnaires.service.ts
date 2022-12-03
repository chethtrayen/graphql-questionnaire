import { ApolloError } from "@apollo/client/errors";
import { validate, validator } from "@helpers/validation";
import { IQuestionnaire, Questionnaire, QuestionnaireEditable } from "@type";

import * as QuestionnaireRepo from "./questionnaire.repo";

const QuestionnaireService: IQuestionnaire = {
  create: async (questionnaire: QuestionnaireEditable, userId: number): Promise<Questionnaire | ApolloError> => {
    let insertRes: Questionnaire;

    try {
      const { title } = questionnaire;

      insertRes = await QuestionnaireRepo.create({ title, userId });

      return insertRes;
    } catch (error) {
      throw error;
    }
  },

  getByOwner: async (userId: number): Promise<Questionnaire[] | ApolloError> => {
    try {
      return await QuestionnaireRepo.getByOwner(userId);
    } catch (error) {
      throw new ApolloError({ errorMessage: "Error: Failed to get Questionnaires" });
    }
  },

  update: async (id: number, updated: QuestionnaireEditable, userId: number): Promise<Questionnaire | ApolloError> => {
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
