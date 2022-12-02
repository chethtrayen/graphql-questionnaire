import prisma from "@prismaClient";
import { Questionnaire } from "@type";

const create = async ({
  title,
  userId,
}: {
  title: string;
  userId: number;
}): Promise<Questionnaire> => {
  const insertRes: Questionnaire = (await prisma.questionnaire.create({
    data: {
      ownerId: userId,
      title: title,
    },
  })) as unknown as Questionnaire;

  return insertRes;
};

const QuestionnaireRepo = {
  create,
};

export default QuestionnaireRepo;
