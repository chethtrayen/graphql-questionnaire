/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { APIResponse, Question, QuestionCreateRequest, Context } from "@type";
import QuestionService from "./question.service";

export default {
  Mutation: {
    createQuestion: async (_: never, args: QuestionCreateRequest, context: Context): APIResponse<Question[]> => {
      const { questionnaireId, questions } = args;
      return await QuestionService.create(questionnaireId, questions, context.user!.id);
    },
  },
};
