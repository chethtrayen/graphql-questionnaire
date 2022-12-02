import { ApolloError } from "@apollo/client/errors";
import { Context, Questionnaire, QuestionnaireEditable } from "@type";
import questionnaireService from "./questionnaires.service";

export default {
  Mutation: {
    createQuestionnaire: async (
      _: never,
      args: QuestionnaireEditable,
      context: Context
    ): Promise<Questionnaire | ApolloError> => {
      return await questionnaireService.create(args, context.user?.id);
    },
  },
};
