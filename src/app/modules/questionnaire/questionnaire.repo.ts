import { questionContext } from "@helpers/question/questionContext";
import prisma from "@prismaClient";
import { Question, Questionnaire, QuestionWritable, QuestionnaireWritable, QuestionnaireStatus } from "@type";

export const create = async (questionnaire: QuestionnaireWritable, userId: number): Promise<Questionnaire> => {
  const insertRes: Questionnaire = (await prisma.questionnaire.create({
    data: {
      ...questionnaire,
      ownerId: userId,
    },
  })) as unknown as Questionnaire;

  return insertRes;
};

export const createWithQuestions = async (
  questionnaire: QuestionnaireWritable,
  questions: QuestionWritable[],
  userId: number
): Promise<Questionnaire> => {
  const insertRes: Questionnaire = (await prisma.$transaction(async (tx) => {
    // Insert questionnaire first
    const insertedQuestionnaire = await tx.questionnaire.create({ data: { ...questionnaire, ownerId: userId } });

    // Bulk insert questions
    const questionQueries = questions.map((q) => {
      const context = questionContext(q.type);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const data = context!.build(q, insertedQuestionnaire.id, userId);

      return tx.question.create({ data });
    });

    const insertedQuestions = await Promise.all(questionQueries);

    return { ...insertedQuestionnaire, questions: insertedQuestions };
  })) as unknown as Questionnaire;

  return insertRes;
};

export const getPublishById = async (id: number): Promise<Questionnaire | undefined> => {
  const questionnaire: Questionnaire = (await prisma.questionnaire.findFirst({
    where: {
      AND: [{ id }, { status: QuestionnaireStatus.PUBLISH }],
    },
  })) as unknown as Questionnaire;

  return questionnaire;
};

export const getByOwner = async (ownerId: number): Promise<Questionnaire[]> => {
  const questionnaires: Questionnaire[] = (await prisma.questionnaire.findMany({
    where: {
      ownerId,
    },
    include: {
      questions: {
        orderBy: {
          order: "asc",
        },
      },
    },
  })) as unknown as Questionnaire[];

  return questionnaires;
};

export const publish = async (id: number): Promise<Questionnaire> => {
  const updateRes: Questionnaire = (await prisma.questionnaire.update({
    where: {
      id,
    },
    data: {
      status: QuestionnaireStatus.PUBLISH,
    },
    include: {
      questions: {
        orderBy: {
          order: "asc",
        },
      },
    },
  })) as unknown as Questionnaire;

  return updateRes;
};

export const update = async (id: number, questionnaire: QuestionnaireWritable): Promise<Questionnaire> => {
  const updateRes: Questionnaire = (await prisma.questionnaire.update({
    where: {
      id,
    },
    data: questionnaire,
  })) as unknown as Questionnaire;

  return updateRes;
};

export const updateWithQuestions = async (id: number, questionnaire: QuestionnaireWritable, questions: Question[]): Promise<Questionnaire> => {
  const updateRes: Questionnaire = (await prisma.$transaction(async (tx) => {
    const updatedQuestionnaire = await tx.questionnaire.update({
      where: {
        id,
      },
      data: questionnaire,
    });

    const questionQuery = questions.map((q: Question) => {
      const context = questionContext(q.type);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { id, ...writable } = context!.update(q);
      return tx.question.update({
        where: {
          id,
        },
        data: writable,
      });
    });

    const updatedQuesions = await Promise.all(questionQuery);

    return { ...updatedQuestionnaire, questions: updatedQuesions };
  })) as unknown as Questionnaire;

  return updateRes;
};
