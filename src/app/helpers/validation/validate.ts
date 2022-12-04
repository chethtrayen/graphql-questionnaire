import prisma from "@prismaClient";

export const questionnaireOwnership = async (id: number, ownerId: number): Promise<boolean> => {
  const result = await prisma.questionnaire.findFirst({
    where: {
      AND: [{ id }, { ownerId }],
    },
  });
  return Boolean(result);
};
