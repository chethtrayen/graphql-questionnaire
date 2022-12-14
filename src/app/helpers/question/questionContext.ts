import prisma from "@prismaClient";
import { Question, QuestionType, QuestionWritable } from "@type";

export const questionContext = (type: QuestionType): QuestionPrototype | undefined => {
  if (type === QuestionType.MULTIPLE_CHOICE) {
    return new MultipleChoiceQuestion();
  }
};

export abstract class QuestionPrototype {
  // Include relational ids to all prototypes
  getBuildData(question: QuestionWritable, questionnaireId: number, userId: number): Omit<Question, "id"> {
    return { ...question, ownerId: userId, questionnaireId };
  }

  // Get update data ready
  getUpdateData(question: Question): Omit<Question, "ownerId" | "questionnaireId"> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ownerId, questionnaireId, ...writable } = question;
    return { ...writable, id };
  }

  abstract validateAnswer(question: Question, answer: string): Promise<boolean>;

  async validateExistInQuestionnaire(questionId: number, questionnaireId: number): Promise<boolean> {
    const result = await prisma.question.findFirst({
      where: {
        AND: [{ id: questionId }, { questionnaireId }],
      },
    });

    return Boolean(result);
  }
}

class MultipleChoiceQuestion extends QuestionPrototype {
  // Check if answer exist in question
  async validateAnswer(question: Question, answer: string): Promise<boolean> {
    const answers: string[] = (await prisma.question.findFirst({
      where: {
        id: question.id,
      },
      select: {
        answers: true,
      },
    })) as unknown as string[];

    return answers.indexOf(answer) > -1;
  }
}
