import prisma from "@prismaClient";
import { Questionnaire, QuestionnaireEditable, QuestionnaireStatus } from "@type";

export const create = async ({ title, userId }: { title: string; userId: number }): Promise<Questionnaire> => {
  const insertRes: Questionnaire = (await prisma.questionnaire.create({
    data: {
      ownerId: userId,
      title: title,
    },
  })) as unknown as Questionnaire;

  return insertRes;
};

export const getPublishById = async (id: number): Promise<Questionnaire | undefined> => {
  const questionnaire: Questionnaire = (await prisma.questionnaire.findFirst({
    where: {
      AND: [{ id }, { status: QuestionnaireStatus.PUBLISH }],
    },
  })) as unknown as Questionnaire;

  return questionnaire;
};

export const getByOwner = async (ownerId: number): Promise<Questionnaire[]> => {
  const questionnaires: Questionnaire[] = (await prisma.questionnaire.findMany({
    where: {
      ownerId,
    },
  })) as unknown as Questionnaire[];

  return questionnaires;
};

export const publish = async (id: number): Promise<Questionnaire> => {
  const updateRes: Questionnaire = (await prisma.questionnaire.update({
    where: {
      id,
    },
    data: {
      status: QuestionnaireStatus.PUBLISH,
    },
  })) as unknown as Questionnaire;

  return updateRes;
};

export const update = async ({ id, updated }: { id: number; updated: QuestionnaireEditable }): Promise<Questionnaire> => {
  const updateRes: Questionnaire = (await prisma.questionnaire.update({
    where: {
      id,
    },
    data: updated,
  })) as unknown as Questionnaire;

  return updateRes;
};
