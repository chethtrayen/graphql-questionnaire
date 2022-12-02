import { ApolloError } from "@apollo/client/errors";
import { validate, validator } from "@helpers/validation";
import { IQuestionnaire, Questionnaire, QuestionnaireEditable } from "@type";

import QuestionnaireRepo from "./questionnaire.repo";

const QuestionnaireService: IQuestionnaire = {
  create: async (
    questionnaire: QuestionnaireEditable,
    userId: number | undefined
  ): Promise<Questionnaire | ApolloError> => {
    let insertRes: Questionnaire;

    try {
      if (!userId) {
        throw new ApolloError({ errorMessage: "Error: Failed to create questionnaire" });
      }

      const { title } = questionnaire;

      insertRes = await QuestionnaireRepo.create({ title, userId });

      return insertRes;
    } catch (error) {
      throw new ApolloError({ errorMessage: "Error: Failed to create questionnaire" });
    }
  },
};

export default QuestionnaireService;
