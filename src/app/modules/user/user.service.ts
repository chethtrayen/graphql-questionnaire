import { ApolloError } from "@apollo/client/errors";
import { IUser } from "@type";
import { JwtService } from "@jwtService";

import UserRepo from "./user.repo";

const UserService: IUser = {
  login: async (email: string): Promise<string | ApolloError> => {
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
