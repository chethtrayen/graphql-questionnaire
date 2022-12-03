import { ApolloError } from "@apollo/client/errors";
import { APIResponse, IUser } from "@type";
import { JwtService } from "@jwtService";

import UserRepo from "./user.repo";

const UserService: IUser = {
  login: async (email: string): APIResponse<string> => {
    try {
      const user = await UserRepo.getByEmail(email);

      if (!user) {
        throw new ApolloError({ errorMessage: "Error: failed to login" });
      }

      return JwtService.sign({ id: user.id });
    } catch (error) {
      throw error;
    }
  },
};

export default UserService;
