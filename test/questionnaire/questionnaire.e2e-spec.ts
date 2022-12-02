import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import request from "supertest";

import { getGraphQLContext } from "@context";
import { resolvers, typeDefs } from "@testUtils";

describe("User e2e login", () => {
  let app: express.Application;
  let httpServer: http.Server;
  let server: ApolloServer;
  const bearerTkn =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY5OTQxMTI5fQ.84NoOMeWBhRFdx-qLIbZfImtNkLJAPoHPgJkisB_yxE";

  describe("POST /login", () => {
    const title = "foo@bar.com";

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

    it("should return a successful response", async () => {
      const queryData = {
        query: `mutation create($title: String!) 
          {
            createQuestionnaire(title: $title) 
            {id, ownerId, status, title}
          }
          `,
        variables: { title },
      };

      const response = await request(httpServer)
        .post("/graphql")
        .set("Authorization", "Bearer " + bearerTkn)
        .send(queryData);

      expect(response.statusCode).toBe(200);
      console.log(response.body.data);
      expect(response.body.data.createQuestionnaire).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          ownerId: expect.any(Number),
          status: expect.any(String),
          title: expect.any(String),
        })
      );

      expect(response.body.data.createQuestionnaire.title).toEqual(title);
    });
  });
});
