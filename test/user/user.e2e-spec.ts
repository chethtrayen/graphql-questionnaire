import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import request from "supertest";

import { resolvers, typeDefs } from "@testUtils";

describe("User e2e login", () => {
  let app: express.Application;
  let httpServer: http.Server;
  let server: ApolloServer;

  describe("POST /login", () => {
    beforeAll(async () => {
      app = express();
      httpServer = http.createServer(app);
      server = new ApolloServer({
        typeDefs,
        resolvers,
      });
      await server.start();
      server.applyMiddleware({ app });
    });

    afterAll(async () => {
      await server.stop();
    });

    it("should return a successful response", async () => {
      const queryData = {
        query: `query userLogin($email: String!) {
          login(email: $email)
        }`,
        variables: { email: "foo@bar.com" },
      };

      const response = await request(httpServer).post("/graphql").send(queryData);

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toEqual(
        expect.objectContaining({
          login: expect.any(String),
        })
      );
    });
  });
});
