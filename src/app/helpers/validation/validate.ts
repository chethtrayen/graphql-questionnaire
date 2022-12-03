import prisma from "@prismaClient";

export const questionnaireOwnership = async (questionnaireId: number, userId: number): Promise<boolean> => {
  const result = await prisma.questionnaire.findFirst({
    where: {
      AND: [{ id: questionnaireId }, { ownerId: userId }],
    },
  });

  return Boolean(result);
};