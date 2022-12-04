import prisma from "@prismaClient";
import { testUser } from "../../prisma/seeds";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTesterData = async (): Promise<any> => {
  const data = await prisma.user.findFirst({
    where: {
      email: testUser.email,
    },
    include: {
      questionnaires: {
        include: {
          questions: true,
        },
      },
    },
  });

  return data;
};
