import { APIResponse } from "@type";

import UserService from "./user.service";

export default {
  Query: {
    login: async (_: never, { email }: { email: string }): APIResponse<string> => {
      return await UserService.login(email);
    },
  },
};
