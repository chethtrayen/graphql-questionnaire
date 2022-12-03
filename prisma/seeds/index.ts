import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import { TestUser } from "@testUtils";
import { QuestionnaireEditable } from "@type";

export const testUser: TestUser = {
  email: "foo@bar.com",
  name: "foobar",
};

const questionnaires: QuestionnaireEditable[] = [
  {
    title: "test",
  },
];

const createTestUser = {
  ...testUser,
  questionnaires: {
    create: questionnaires,
  },
};

export const negativeTestUser: TestUser = {
  email: "bar@foo.com",
  name: "barfoo",
};

const createNegativeTestUser = {
  ...negativeTestUser,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const _createSeed = async (createData: any): Promise<void> => {
  await prisma.user.upsert({
    where: { email: createData.email },
    update: {},
    create: createData,
  });
};

export const runSeed = async (): Promise<void> => {
  await _createSeed(createTestUser);
  await _createSeed(createNegativeTestUser);
};
