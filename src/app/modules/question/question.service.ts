import { ApolloError } from "@apollo/client/errors";
import { APIResponse, IQuestion, QuestionWritable, Question } from "@type";
import { validate, validator } from "@helpers/validation";

import * as QuestionRepo from "./question.repo";

const QuestionService: IQuestion = {
  create: async (questionnaireId: number, questions: QuestionWritable[], userId: number): APIResponse<Question[]> => {
    try {
      const isValid = await validator([validate.questionnaireOwnership(questionnaireId, userId)]);

      if (!isValid) {
        throw new ApolloError({ errorMessage: "Error: Failed to create question" });
      }

      return await QuestionRepo.create(questionnaireId, questions, userId);
    } catch (error) {
      throw error;
    }
  },
};

export default QuestionService;
