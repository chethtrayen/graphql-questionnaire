import { IUser } from "@type";
import { JwtService } from "../../auth/jwt.service";

import UserRepo from "./user.repo";

const UserService: IUser = {
  login: async (email: string): Promise<string | Error> => {
    try {
      const user = await UserRepo.getByEmail(email);

      if (user) {
        const { id } = user;
        return JwtService.sign({ id });
      } else {
        throw Error("Error: user not found.");
      }
    } catch (error) {
      throw error;
    }
  },
};

export default UserService;
