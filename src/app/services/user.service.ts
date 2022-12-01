
import { IUser } from "../../types/user";
import { JwtService } from '../auth/jwt.service';
import prisma from "../../../src/prisma-client";

const UserService : IUser = {
  login: async (email: string): Promise<string | Error> => {
   try{
    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email
        }
      }
    })

    if(user){
      const { id } = user
      return JwtService.sign({ id });
    } else{
      throw Error("Error: user not found.")
    }
   }catch(error){
      throw error 
   }
  }
}

export default UserService;