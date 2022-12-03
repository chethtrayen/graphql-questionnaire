/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Context, APIResponse, Questionnaire, QuestionnaireEditable, QuestionnairePublishResponse, QuestionnaireUpdateRequest } from "@type";

import QuestionnaireService from "./questionnaires.service";

export default {
  Query: {
    getQuestionnaires: async (_: never, __: never, context: Context): APIResponse<Questionnaire[]> => {
      return await QuestionnaireService.getByOwner(context.user!.id);
    },
  },

  Mutation: {
    createQuestionnaire: async (_: never, args: QuestionnaireEditable, context: Context): APIResponse<Questionnaire> => {
      return await QuestionnaireService.create(args, context.user!.id);
    },

    publishQuestionnaire: async (_: never, args: { id: number }, context: Context): APIResponse<QuestionnairePublishResponse> => {
      return await QuestionnaireService.publish(args.id, context.user!.id);
    },

    updateQuestionnaire: async (_: never, args: QuestionnaireUpdateRequest, context: Context): APIResponse<Questionnaire> => {
      return await QuestionnaireService.update(args.id, args.updated, context.user!.id);
    },
  },
};
