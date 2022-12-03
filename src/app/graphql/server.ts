import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import path from "path";
import http from "http";

import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

import config from "../../config";
import { getGraphQLContext } from "./context";

export async function startGraphQLServer(app: express.Application, httpServer: http.Server): Promise<void> {
  // Merge schemas
  const typesArray = loadFilesSync(path.join(__dirname, "schemas/*.graphql"));
  const typeDefs = mergeTypeDefs(typesArray);

  // Merge resolver
  const resolverArray = loadFilesSync(path.join(__dirname, "/../modules/**/*.resolver.ts"));
  const resolvers = mergeResolvers(resolverArray);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: getGraphQLContext,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground(), ApolloServerPluginDrainHttpServer({ httpServer })],
    csrfPrevention: config.graphql.csrfPrevention,
    introspection: config.graphql.introspectionEnabled,
  });

  await server.start();

  server.applyMiddleware({ app });
}
