import prisma from "@prismaClient";
import { QuestionEditable, Question } from "@type";

export const create = async (questionnaireId: number, questions: QuestionEditable[], userId: number): Promise<Question[]> => {
  // Bulk insert questions and return inserted questions
  const insertRes: Question[] = (await prisma.$transaction(
    questions.map((q) => prisma.question.create({ data: { ...q, ownerId: userId, questionnaireId } }))
  )) as unknown as Question[];

  return insertRes;
};
