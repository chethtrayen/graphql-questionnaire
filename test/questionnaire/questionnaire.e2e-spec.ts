import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import request from "supertest";

import { getGraphQLContext } from "@context";
import { getUserTkn } from "@testHelpers";
import { resolvers, typeDefs } from "@testUtils";

describe("Questionnaire", () => {
  let app: express.Application;
  let httpServer: http.Server;
  let server: ApolloServer;
  let bearerTkn: string;
  beforeEach(async () => {
    bearerTkn = await getUserTkn();
  });

  beforeAll(async () => {
    app = express();
    httpServer = http.createServer(app);
    server = new ApolloServer({
      typeDefs,
      resolvers,
      context: getGraphQLContext,
    });
    await server.start();
    server.applyMiddleware({ app });
  });

  afterAll(async () => {
    await server.stop();
  });

  describe("POST /questionnare/create", () => {
    const variables = { title: "foo@bar.com" };

    it("should return a successful response", async () => {
      const queryData = {
        query: `mutation create($title: String!) 
          {
            createQuestionnaire(title: $title) 
            {id, ownerId, status, title}
          }
          `,
        variables,
      };

      const response = await request(httpServer)
        .post("/graphql")
        .set("Authorization", "Bearer " + bearerTkn)
        .send(queryData);

      expect(response.statusCode).toBe(200);

      expect(response.body.data.createQuestionnaire).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          ownerId: expect.any(Number),
          status: expect.any(String),
          title: expect.any(String),
        })
      );

      expect(response.body.data.createQuestionnaire.title).toEqual(variables.title);
    });
  });
});
