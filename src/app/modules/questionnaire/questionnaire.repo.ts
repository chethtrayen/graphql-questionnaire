import prisma from "@prisma";
import { Questionnaire } from '@type'

const create = async (userId: number, title: string): Promise<Questionnaire> => {
  const insertRes: Questionnaire = await prisma.questionnaire.create({
    data: {
      ownerId: userId,
      title: title,
    }
  }) as unknown as Questionnaire

  return insertRes; 
}

const QuestionnaireRepo = {
  create
}

export default QuestionnaireRepo;