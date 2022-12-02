import { ApolloError } from "@apollo/client/errors";

import userService from "./user.service";

export default {
  Query: {
    login: async (_: never, { email }: { email: string }): Promise<string | ApolloError> => {
      return await userService.login(email);
    },
  },
};
