import { ApolloError } from "@apollo/client/errors";

import UserService from "./user.service";

export default {
  Query: {
    login: async (_: never, { email }: { email: string }): Promise<string | ApolloError> => {
      return await UserService.login(email);
    },
  },
};
