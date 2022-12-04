import prisma from "@prismaClient";

export const questionnaireOwnership = async (id: number, ownerId: number): Promise<boolean> => {
  const result = await prisma.questionnaire.findFirst({
    where: {
      AND: [{ id }, { ownerId }],
    },
  });
  return Boolean(result);
};

export const questionOwnership = async (id: number, ownerId: number): Promise<boolean> => {
  const result = await prisma.question.findFirst({
    where: {
      AND: [{ id }, { ownerId }],
    },
  });
  return Boolean(result);
};
