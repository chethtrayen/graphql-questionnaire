import { ApolloError } from "@apollo/client/errors";

import { Authenticable } from "./auth";

export interface User extends Authenticable {
  id: number;
  name?: string;
}

export interface IUser {
  login: (email: string) => Promise<string | ApolloError>;
}
