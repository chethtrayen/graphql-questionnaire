import * as validation from "@helpers/validation";
import questionnaireService from "@modules/questionnaire/questionnaires.service";
import prisma from "@prismaClient";
import { Questionnaire, QuestionnaireStatus } from "@type";

jest.mock("@helpers/validation");

describe("Questionnaire unit test", () => {
  const mockQuestionnaire: Questionnaire = {
    id: 1,
    ownerId: 1,
    status: QuestionnaireStatus.DRAFT,
    title: "foo bar",
  };

  describe("Create", () => {
    it("should return jwt token", async () => {
      jest.spyOn(prisma.questionnaire, "create").mockResolvedValueOnce(mockQuestionnaire);

      const res: Questionnaire | Error = await questionnaireService.create({ title: mockQuestionnaire.title }, mockQuestionnaire.ownerId);
      expect(prisma.questionnaire.create).toHaveBeenCalledTimes(1);
      expect(res).toMatchObject(mockQuestionnaire);
    });
  });

  describe("Update", () => {
    it("should return jwt token", async () => {
      jest.spyOn(prisma.questionnaire, "update").mockResolvedValueOnce(mockQuestionnaire);
      jest.spyOn(validation, "validator").mockResolvedValueOnce(true);
      const res: Questionnaire | Error = await questionnaireService.update(mockQuestionnaire.id, { title: "test" }, 1);

      expect(prisma.questionnaire.update).toHaveBeenCalledTimes(1);
      expect(validation.validator).toHaveBeenCalledTimes(1);
      expect(res).toMatchObject(mockQuestionnaire);
    });
  });
});
