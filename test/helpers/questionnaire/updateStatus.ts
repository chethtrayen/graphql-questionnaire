import prisma from "@prismaClient";
import { QuestionnaireStatus } from "@type";

export const updateQuestionnaireStatus = async (id: number, status: QuestionnaireStatus): Promise<void> => {
  await prisma.questionnaire.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};
