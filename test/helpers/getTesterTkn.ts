import prisma from "@prismaClient";
import { User } from "@type";
import { JwtService } from "@jwtService";
import { testUser, negativeTestUser } from "../../prisma/seeds";
import { TestUser, TestUsersTkn } from "@testUtils";

const _getTkn = async (tester: TestUser): Promise<string> => {
  const user = (await prisma.user.findFirst({
    where: { email: tester.email },
  })) as unknown as User;

  return JwtService.sign({ id: user.id });
};

//Get seeded user tkns
export const getTesterTkn = async (): Promise<TestUsersTkn> => {
  const testerTkn = await _getTkn(testUser);
  const negativeTesterTkn = await _getTkn(negativeTestUser);

  return { testerTkn, negativeTesterTkn };
};
