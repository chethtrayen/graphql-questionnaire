import { generatePublishQuestionniareUrl } from "@helpers/urlGenrator";
import * as validation from "@helpers/validation";
import questionnaireService from "@modules/questionnaire/questionnaires.service";
import prisma from "@prismaClient";
import { Questionnaire, QuestionnairePublishResponse, QuestionnaireStatus } from "@type";

jest.mock("@helpers/validation");

describe("Questionnaire", () => {
  const mockQuestionnaire: Questionnaire = {
    id: 1,
    ownerId: 1,
    status: QuestionnaireStatus.DRAFT,
    title: "foo bar",
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("Create", () => {
    it("should create and return questionnaire", async () => {
      jest.spyOn(prisma.questionnaire, "create").mockResolvedValueOnce(mockQuestionnaire);

      const res: Questionnaire | Error = await questionnaireService.create({ title: mockQuestionnaire.title }, undefined, mockQuestionnaire.ownerId);

      expect(prisma.questionnaire.create).toHaveBeenCalledTimes(1);
      expect(res).toMatchObject(mockQuestionnaire);
    });
  });

  describe("Get by owner", () => {
    it("should return questionnaires", async () => {
      jest.spyOn(prisma.questionnaire, "findMany").mockResolvedValueOnce([mockQuestionnaire]);

      const res: Questionnaire[] | Error = (await questionnaireService.getByOwner(mockQuestionnaire.id)) as unknown as Questionnaire[];

      expect(prisma.questionnaire.findMany).toHaveBeenCalledTimes(1);
      expect(res.length).toEqual(1);
      expect(res).toMatchObject([mockQuestionnaire]);
    });
  });

  describe("Get publish", () => {
    const mock = { ...mockQuestionnaire, status: QuestionnaireStatus.PUBLISH };

    it("should return questionnaires", async () => {
      jest.spyOn(prisma.questionnaire, "findFirst").mockResolvedValueOnce(mock);

      const res: Questionnaire | Error = (await questionnaireService.getPublishById(mock.id)) as unknown as Questionnaire;

      expect(prisma.questionnaire.findFirst).toHaveBeenCalledTimes(1);
      expect(res).toMatchObject(mock);
    });

    it("should return an error from status", async () => {
      jest.spyOn(prisma.questionnaire, "findFirst").mockResolvedValueOnce(null);

      // eslint-disable-next-line @typescript-eslint/promise-function-async, @typescript-eslint/no-floating-promises, jest/valid-expect
      await expect(() => questionnaireService.getPublishById(mock.id)).rejects.toThrow("Error: Failed to get questionnaire");
    });
  });

  describe("Publish", () => {
    it("should publish and return a url", async () => {
      jest.spyOn(prisma.questionnaire, "update").mockResolvedValueOnce(mockQuestionnaire);
      jest.spyOn(validation, "validator").mockResolvedValueOnce(true);

      const res: QuestionnairePublishResponse | Error = (await questionnaireService.publish(
        mockQuestionnaire.id,
        mockQuestionnaire.ownerId
      )) as unknown as QuestionnairePublishResponse;
      const expectedUrl = generatePublishQuestionniareUrl(mockQuestionnaire.id);

      expect(prisma.questionnaire.update).toHaveBeenCalledTimes(1);
      expect(validation.validator).toHaveBeenCalledTimes(1);
      expect(res.questionnaire).toMatchObject(mockQuestionnaire);
      expect(res.url).toEqual(expectedUrl);
    });

    it("should return an error from validation", async () => {
      jest.spyOn(prisma.questionnaire, "update").mockResolvedValueOnce(mockQuestionnaire);
      jest.spyOn(validation, "validator").mockResolvedValueOnce(false);

      // eslint-disable-next-line @typescript-eslint/promise-function-async, @typescript-eslint/no-floating-promises, jest/valid-expect
      await expect(() => questionnaireService.publish(mockQuestionnaire.id, mockQuestionnaire.ownerId)).rejects.toThrow(
        "Error: Failed to publish questionniare"
      );
    });
  });

  describe("Update", () => {
    it("should update and return questionnaire", async () => {
      jest.spyOn(prisma.questionnaire, "update").mockResolvedValueOnce(mockQuestionnaire);
      jest.spyOn(validation, "validator").mockResolvedValueOnce(true);

      const res: Questionnaire | Error = await questionnaireService.update(mockQuestionnaire.id, { title: "test" }, mockQuestionnaire.ownerId);

      expect(prisma.questionnaire.update).toHaveBeenCalledTimes(1);
      expect(validation.validator).toHaveBeenCalledTimes(1);
      expect(res).toMatchObject(mockQuestionnaire);
    });

    it("should return an error from validation", async () => {
      jest.spyOn(prisma.questionnaire, "update").mockResolvedValueOnce(mockQuestionnaire);
      //jest.spyOn(validation, "validator").mockResolvedValueOnce(false);

      // eslint-disable-next-line @typescript-eslint/promise-function-async, @typescript-eslint/no-floating-promises, jest/valid-expect
      await expect(() => questionnaireService.update(mockQuestionnaire.id, { title: "test" }, mockQuestionnaire.ownerId)).rejects.toThrow(
        "Error: Failed to update questionniare"
      );
    });
  });
});
