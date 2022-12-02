import prisma from "@prismaClient";
import { User } from "@type";
import { JwtService } from "@jwtService";

/**
 * Find a user and sign a token
 *
 * @returns user token
 */
export const getUserTkn = async (): Promise<string> => {
  const user = (await prisma.user.findFirst()) as unknown as User;

  return JwtService.sign({ id: user.id });
};
