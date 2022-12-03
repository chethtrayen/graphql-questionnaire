import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import request from "supertest";

import { getGraphQLContext } from "@context";
import { getUserTkn } from "@testHelpers";
import { resolvers, typeDefs } from "@testUtils";

const questionnaireSchemaValidation = {
  id: expect.any(Number),
  ownerId: expect.any(Number),
  status: expect.any(String),
  title: expect.any(String),
};

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
        query: `
          mutation create($title: String!) 
          {
            createQuestionnaire(title: $title) 
            {id, ownerId, status, title}
          }
        `,
        variables,
      };

      const res = await request(httpServer)
        .post("/graphql")
        .set("Authorization", "Bearer " + bearerTkn)
        .send(queryData);

      expect(res.statusCode).toBe(200);
      expect(res.body.data.createQuestionnaire).toEqual(expect.objectContaining(questionnaireSchemaValidation));
      expect(res.body.data.createQuestionnaire.title).toEqual(variables.title);
    });
  });

  describe("POST /questionnare/update", () => {
    const rand = Math.floor(Math.random() * 100);
    const updated = { title: `updatedTitle-${rand}` };

    // eslint-disable-next-line jest/no-focused-tests
    it.only("should return a successful response", async () => {
      const queryData = {
        query: `
          mutation update($id: Int!, $updated: QuestionnaireEditable!)
          {
            updateQuestionnaire(id: $id, updated: $updated) 
            {id, ownerId, status, title}
          }
        `,
        variables: { id: 1, updated },
      };

      const res = await request(httpServer)
        .post("/graphql")
        .set("Authorization", "Bearer " + bearerTkn)
        .send(queryData);

      expect(res.statusCode).toBe(200);
      expect(res.body.data.updateQuestionnaire).toEqual(questionnaireSchemaValidation);
      expect(res.body.data.updateQuestionnaire.title).toEqual(updated.title);
    });
  });
});
