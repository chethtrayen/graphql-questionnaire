import { ApolloError } from "apollo-server-express";
import { Questionnaire } from "@type";

export type APIResponse<T> = Promise<T | ApolloError>;

export type QuestionnairePublishResponse = {
  questionnaire: Questionnaire;
  url: string;
};
