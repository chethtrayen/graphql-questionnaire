import prisma from "@prismaClient";
import { Questionnaire, QuestionnaireEditable } from "@type";

export const create = async ({ title, userId }: { title: string; userId: number }): Promise<Questionnaire> => {
  const insertRes: Questionnaire = (await prisma.questionnaire.create({
    data: {
      ownerId: userId,
      title: title,
    },
  })) as unknown as Questionnaire;

  return insertRes;
};

export const getByOwner = async (ownerId: number): Promise<Questionnaire[]> => {
  const questionnaires: Questionnaire[] = (await prisma.questionnaire.findMany({
    where: {
      ownerId,
    },
  })) as unknown as Questionnaire[];

  return questionnaires;
};

export const update = async ({ id, updated }: { id: number; updated: QuestionnaireEditable }): Promise<Questionnaire> => {
  const updateRes = (await prisma.questionnaire.update({
    where: {
      id,
    },
    data: updated,
  })) as unknown as Questionnaire;

  return updateRes;
};
