import { ApolloError } from "@apollo/client/errors";
import { IQuestionnaire, Questionnaire, QuestionnaireEditable } from "@type";

import QuestionnaireRepo from "./questionnaire.repo";

const QuestionnaireService: IQuestionnaire = {
  create: async (
    questionnaire: QuestionnaireEditable,
    userId: number | undefined
  ): Promise<Questionnaire | ApolloError> => {
    let insertRes: Questionnaire;

    try {
      if (userId) {
        insertRes = await QuestionnaireRepo.create(userId, questionnaire.title);

        return insertRes;
      } else {
        throw new Error("Error: Failed to create group. No user logged in");
      }
    } catch (error) {
      throw error;
    }
  },
};

export default QuestionnaireService;
