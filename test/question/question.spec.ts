import * as validation from "@helpers/validation";
import questionService from "@modules/question/question.service";
import prisma from "@prismaClient";
import { Question } from "@type";
import { mockQuestionnaire, mockQuestions, mockQuestionWritable } from "@testHelpers";

jest.mock("@helpers/validation");

describe("Question", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("Create", () => {
    it("should create and return questions", async () => {
      jest.spyOn(prisma, "$transaction").mockResolvedValueOnce(mockQuestions);
      jest.spyOn(validation, "validator").mockResolvedValueOnce(true);

      const res: Question[] | Error = await questionService.create(mockQuestionnaire.id, mockQuestionWritable, mockQuestionnaire.ownerId);

      expect(prisma.$transaction).toHaveBeenCalledTimes(1);
      expect(res).toMatchObject(mockQuestions);
    });

    it("should return an error from validation", async () => {
      jest.spyOn(validation, "validator").mockResolvedValueOnce(false);

      // eslint-disable-next-line @typescript-eslint/promise-function-async
      await expect(() => questionService.create(mockQuestionnaire.id, mockQuestionWritable, mockQuestionnaire.ownerId)).rejects.toThrow(
        "Error: Failed to create question"
      );
    });
  });
});
