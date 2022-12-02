import prisma from "@prisma"
import { User } from "@type"


const getByEmail = async (email: string): Promise<User> => {
  const user = await prisma.user.findFirst({
    where: {
      email: {
        equals: email
      }
    }
  }) as unknown as User

  return user
}

const UserRepo = {
  getByEmail
}

export default UserRepo