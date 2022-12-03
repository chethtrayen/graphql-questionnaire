/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ApolloError } from "@apollo/client/errors";
import { Context, Questionnaire, QuestionnaireEditable, QuestionnaireUpdate } from "@type";

import QuestionnaireService from "./questionnaires.service";

export default {
  Query: {
    getQuestionnaires: async (_: never, __: never, context: Context): Promise<Questionnaire[] | ApolloError> => {
      return await QuestionnaireService.getByOwner(context.user!.id);
    },
  },

  Mutation: {
    createQuestionnaire: async (_: never, args: QuestionnaireEditable, context: Context): Promise<Questionnaire | ApolloError> => {
      return await QuestionnaireService.create(args, context.user!.id);
    },

    publishQuestionnaire: async (_: never, args: { id: number }, context: Context): Promise<string | ApolloError> => {
      return await QuestionnaireService.publish(args.id, context.user!.id);
    },

    updateQuestionnaire: async (_: never, args: QuestionnaireUpdate, context: Context): Promise<Questionnaire | ApolloError> => {
      return await QuestionnaireService.update(args.id, args.updated, context.user!.id);
    },
  },
};
