import questionnaireService from "@modules/questionnaire/questionnaires.service";
import prisma from "@prismaClient";
import { Questionnaire, QuestionnaireStatus } from "@type";

describe("Questionnaire unit test", () => {
  const mockQuestionnaire: Questionnaire = {
    id: 1,
    ownerId: 1,
    status: QuestionnaireStatus.DRAFT,
    title: "foo bar",
  };

  describe("Create questionnaire", () => {
    describe("Successfully create questionnaire", () => {
      it("should return jwt token", async () => {
        jest.spyOn(prisma.questionnaire, "create").mockResolvedValueOnce(mockQuestionnaire);

        const questionaires: Questionnaire | Error = await questionnaireService.create(
          { title: mockQuestionnaire.title },
          mockQuestionnaire.ownerId
        );
        expect(prisma.questionnaire.create).toHaveBeenCalledTimes(1);
        expect(questionaires).toMatchObject(mockQuestionnaire);
      });
    });

    describe("UnSuccessful user login", () => {
      it("should return an error", () => {
        jest.spyOn(prisma.questionnaire, "create").mockResolvedValueOnce(mockQuestionnaire);

        // eslint-disable-next-line @typescript-eslint/promise-function-async, @typescript-eslint/no-floating-promises, jest/valid-expect
        expect(() =>
          questionnaireService.create({ title: mockQuestionnaire.title }, undefined)
        ).rejects.toThrow("Error: Failed to create group. No user logged in");
      });
    });
  });
});
