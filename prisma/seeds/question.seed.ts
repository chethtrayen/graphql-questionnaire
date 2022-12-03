import { PrismaClient } from "@prisma/client";
import { Question } from "@type";
import { QuestionType } from "./enums.seed";

const prisma = new PrismaClient();

export const _generateQuestions = (ownerId: number, questionnaireId: number): Omit<Question, "id">[] => {
  return [
    {
      answers: ["1", "2", "3", "4"],
      label: "Rank the second question",
      order: 1,
      questionnaireId,
      ownerId,
      type: QuestionType.MULTIPLE_CHOICE,
    },
    {
      answers: ["1", "2", "3", "4"],
      label: "Rank this question",
      order: 0,
      questionnaireId,
      ownerId,
      type: QuestionType.MULTIPLE_CHOICE,
    },
  ];
};

export const seedQuestions = async (ownerId: number, questionnaireId: number): Promise<Question> => {
  const questions: Question = (await prisma.question.createMany({
    data: _generateQuestions(ownerId, questionnaireId),
  })) as unknown as Question;

  return questions;
};
