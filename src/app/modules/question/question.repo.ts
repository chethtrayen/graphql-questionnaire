import prisma from "@prismaClient";
import { QuestionEditable, Question } from "@type";

export const create = async (questionnaireId: number, questions: QuestionEditable[], userId: number): Promise<Question[]> => {
  const questionsWithRelation = questions.map((q) => ({ ...q, ownerId: userId, questionnaireId }));
  const insertRes: Question[] = (await prisma.$transaction(questionsWithRelation.map((data) => prisma.question.create({ data })))) as unknown as Question[];
  return insertRes;
};
