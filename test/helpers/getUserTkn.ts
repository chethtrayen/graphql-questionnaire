import prisma from "@prismaClient";
import { User } from "@type";
import { JwtService } from "@jwtService";

export const getUserTkn = async (): Promise<string> => {
  const user = (await prisma.user.findFirst()) as unknown as User;

  console.log(user);

  return JwtService.sign({ id: user.id });
};
