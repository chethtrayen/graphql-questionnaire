import prisma from "@prismaClient";
import { Question, QuestionType } from "@type";

export const addQuestion = async (questionnaireId: number, userId: number): Promise<Question> => {
  const question: Omit<Question, "id"> = {
    answers: ["test"],
    label: "test",
    order: 1,
    ownerId: userId,
    questionnaireId: questionnaireId,
    type: QuestionType.MULTIPLE_CHOICE,
  };

  const insertRes: Question = (await prisma.question.create({
    data: question,
  })) as unknown as Question;

  return insertRes;
};
