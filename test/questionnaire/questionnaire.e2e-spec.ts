import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import request from "supertest";

import { getGraphQLContext } from "@context";
import { getTesterData, getTesterTkn } from "@testHelpers";
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
  let testerTkn: string;
  let negativeTesterTkn: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let testerData: any;

  beforeAll(async () => {
    const token = await getTesterTkn();

    testerTkn = token.testerTkn;
    negativeTesterTkn = token.negativeTesterTkn;

    testerData = await getTesterData();

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

    it("should successfully create questionnaire", async () => {
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
        .set("Authorization", "Bearer " + testerTkn)
        .send(queryData);

      const { createQuestionnaire } = res.body.data;
      expect(res.statusCode).toBe(200);
      expect(createQuestionnaire).toEqual(expect.objectContaining(questionnaireSchemaValidation));
      expect(createQuestionnaire.title).toEqual(variables.title);
    });
  });

  describe("POST /questionnare/update", () => {
    const rand = Math.floor(Math.random() * 100);
    const updated = { title: `updatedTitle-${rand}` };

    it("should successfully update questionnaire", async () => {
      const id = testerData.questionnaires[0].id;
      const queryData = {
        query: `
          mutation update($id: Int!, $updated: QuestionnaireEditable!)
          {
            updateQuestionnaire(id: $id, updated: $updated) 
            {id, ownerId, status, title}
          }
        `,
        variables: { id, updated },
      };

      const res = await request(httpServer)
        .post("/graphql")
        .set("Authorization", "Bearer " + testerTkn)
        .send(queryData);

      const { updateQuestionnaire } = res.body.data;

      expect(res.statusCode).toBe(200);
      expect(updateQuestionnaire).toEqual(questionnaireSchemaValidation);
      expect(updateQuestionnaire.title).toEqual(updated.title);
    });

    it("should fail to update questionnaire from validation error", async () => {
      const id = testerData.questionnaires[0].id;

      const queryData = {
        query: `
          mutation update($id: Int!, $updated: QuestionnaireEditable!)
          {
            updateQuestionnaire(id: $id, updated: $updated) 
            {id, ownerId, status, title}
          }
        `,
        variables: { id, updated },
      };

      const res = await request(httpServer)
        .post("/graphql")
        .set("Authorization", "Bearer " + negativeTesterTkn)
        .send(queryData);

      const { errors } = res.body;

      expect(res.statusCode).toBe(200);
      expect(errors.length).toEqual(1);
      expect(errors[0].message).toEqual("Error: Failed to update questionniare");
    });
  });
});
