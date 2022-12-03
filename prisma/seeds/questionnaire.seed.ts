import { PrismaClient } from "@prisma/client";
import { Questionnaire } from "@type";

const prisma = new PrismaClient();

export const seedQuestionnaires = async (ownerId: number): Promise<Questionnaire> => {
  const questionnaire: Questionnaire = (await prisma.questionnaire.create({
    data: {
      title: "test",
      ownerId,
    },
  })) as unknown as Questionnaire;

  return questionnaire;
};
