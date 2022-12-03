import { PrismaClient } from "@prisma/client";
import { TestUser } from "@testUtils";

import { seedQuestions } from "./question.seed";
import { seedQuestionnaires } from "./questionnaire.seed";

const prisma = new PrismaClient();

export const testUser: TestUser = {
  email: "foo@bar.com",
  name: "foobar",
};

export const negativeTestUser: TestUser = {
  email: "bar@foo.com",
  name: "barfoo",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const _createSeed = async (createData: any): Promise<void> => {
  const user = await prisma.user.upsert({
    where: { email: createData.email },
    update: {},
    create: createData,
  });

  const questionnaires = await seedQuestionnaires(user.id);
  await seedQuestions(user.id, questionnaires.id);
};

export const runSeed = async (): Promise<void> => {
  await _createSeed(testUser);
  await _createSeed(negativeTestUser);
};
