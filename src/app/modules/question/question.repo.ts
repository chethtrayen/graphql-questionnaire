import prisma from "@prismaClient";
import { QuestionWritable, Question } from "@type";
import { questionContext } from "@helpers/question/questionContext";

export const create = async (questionnaireId: number, questions: QuestionWritable[], userId: number): Promise<Question[]> => {
  // Bulk insert questions and return inserted questions
  const insertRes: Question[] = (await prisma.$transaction(
    questions.map((q) => {
      const context = questionContext(q.type);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const data = context!.getBuildData(q, questionnaireId, userId);
      return prisma.question.create({ data });
    })
  )) as unknown as Question[];

  return insertRes;
};

export const deleteById = async (id: number): Promise<Question> => {
  const deleteRes: Question = (await prisma.question.delete({
    where: {
      id,
    },
  })) as unknown as Question;

  return deleteRes;
};
