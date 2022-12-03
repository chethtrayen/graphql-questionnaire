import { ApolloError } from "@apollo/client/errors";
import { Context, Questionnaire, QuestionnaireEditable, QuestionnaireUpdate } from "@type";

import QuestionnaireService from "./questionnaires.service";

export default {
  Mutation: {
    createQuestionnaire: async (
      _: never,
      args: QuestionnaireEditable,
      context: Context
    ): Promise<Questionnaire | ApolloError> => {
      return await QuestionnaireService.create(args, context.user?.id);
    },
    updateQuestionnaire: async (
      _: never,
      args: QuestionnaireUpdate,
      context: Context
    ): Promise<Questionnaire | ApolloError> => {
      return await QuestionnaireService.update(args.id, args.updated, context.user?.id);
    },
  },
};
