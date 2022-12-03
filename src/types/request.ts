import { ApolloError } from "apollo-server-express";

export interface RequestUtils<R> {
  getTokenFromRequest(req: R): string | null;
}

export type APIResponse<T> = Promise<T | ApolloError>;
