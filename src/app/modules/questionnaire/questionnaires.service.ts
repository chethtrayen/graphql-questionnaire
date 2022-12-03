import { ApolloError } from "@apollo/client/errors";
import { validate, validator } from "@helpers/validation";
import { IQuestionnaire, Questionnaire, QuestionnaireEditable } from "@type";

import * as QuestionnaireRepo from "./questionnaire.repo";

const QuestionnaireService: IQuestionnaire = {
  create: async (
    questionnaire: QuestionnaireEditable,
    userId: number
  ): Promise<Questionnaire | ApolloError> => {
    let insertRes: Questionnaire;

    try {
      const { title } = questionnaire;

      insertRes = await QuestionnaireRepo.create({ title, userId });

      return insertRes;
    } catch (error) {
      throw error;
    }
  },

  update: async (
    id: number,
    updated: QuestionnaireEditable,
    userId: number
  ): Promise<Questionnaire | ApolloError> => {
    try {
      const isValid = await validator([validate.questionnaireOwnership(id, userId)]);

      if (!isValid) {
        throw new ApolloError({ errorMessage: "Error: Failed to update questionniare" });
      }

      const updateRes: Questionnaire = await QuestionnaireRepo.update({ id, updated });

      return updateRes;
    } catch (error) {
      throw error;
    }
  },
};

export default QuestionnaireService;
