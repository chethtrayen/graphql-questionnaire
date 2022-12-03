import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import request from "supertest";

import { getGraphQLContext } from "@context";
import { generatePublishQuestionniareUrl } from "@helpers/urlGenrator";
import questionnaireRouter from "@routes/questionnaire";
import { getTesterData, getTesterTkn, questionnaireSchemaValidation, updateQuestionnaireStatus } from "@testHelpers";
import { resolvers, typeDefs } from "@testUtils";
import { QuestionnaireStatus } from "@type";

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

    app.use("/questionnaire", questionnaireRouter);

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

  describe("GET /questionnare/", () => {
    it("should successfully create questionnaire", async () => {
      const query = `
         {getQuestionnaires {id, ownerId, status, title}}
      `;
      const res = await request(httpServer)
        .get("/graphql")
        .query({ query })
        .set("Authorization", "Bearer " + testerTkn);

      const { getQuestionnaires } = res.body.data;

      expect(res.statusCode).toBe(200);
      expect(getQuestionnaires.length).toBeGreaterThan(0);
      expect(getQuestionnaires[0]).toEqual(expect.objectContaining(questionnaireSchemaValidation));
    });
  });

  describe("GET /questionnare/published", () => {
    it("should successfully update questionnaire", async () => {
      const id = testerData.questionnaires[0].id;

      // Update questionnaire status to publish
      await updateQuestionnaireStatus(id, QuestionnaireStatus.PUBLISH);

      const query = {
        qid: id,
      };

      const res = await request(httpServer).get("/questionnaire/published").query(query);

      const { questionnaire, success } = res.body;

      expect(res.statusCode).toBe(200);
      expect(questionnaire).toEqual(questionnaireSchemaValidation);
      expect(questionnaire.status).toEqual(QuestionnaireStatus.PUBLISH);
      expect(success).toBeTruthy();
    });

    it("should return an error for status", async () => {
      const id = testerData.questionnaires[0].id;

      // Update questionnaire status to publish
      await updateQuestionnaireStatus(id, QuestionnaireStatus.DRAFT);

      const query = {
        qid: id,
      };

      const res = await request(httpServer).get("/questionnaire/published").query(query);

      const { msg, success } = res.body;

      expect(res.statusCode).toBe(200);
      expect(msg).toEqual("Error: Failed to get questionnaire");
      expect(success).toBeFalsy();
    });
  });

  describe("POST /questionnare/create", () => {
    const questionnaire = { title: "foo@bar.com" };

    it("should successfully create questionnaire", async () => {
      const queryData = {
        query: `
          mutation create($questionnaire: QuestionnaireWritable!) 
          {
            createQuestionnaire(questionnaire: $questionnaire) 
            {id, ownerId, status, title}
          }
        `,
        variables: { questionnaire },
      };

      const res = await request(httpServer)
        .post("/graphql")
        .set("Authorization", "Bearer " + testerTkn)
        .send(queryData);

      const { createQuestionnaire } = res.body.data;

      expect(res.statusCode).toBe(200);
      expect(createQuestionnaire).toEqual(expect.objectContaining(questionnaireSchemaValidation));
      expect(createQuestionnaire.title).toEqual(questionnaire.title);
    });
  });

  describe("POST /questionnare/publish", () => {
    it("should successfully update questionnaire", async () => {
      const id = testerData.questionnaires[0].id;

      const queryData = {
        query: `
          mutation publish($id: Int!)
          {
            publishQuestionnaire(id: $id)
            {questionnaire {id, ownerId, status, title}, url}
          }
        `,
        variables: { id },
      };

      const res = await request(httpServer)
        .post("/graphql")
        .set("Authorization", "Bearer " + testerTkn)
        .send(queryData);

      const { questionnaire, url } = res.body.data.publishQuestionnaire;
      const expectedUrl = generatePublishQuestionniareUrl(id);

      expect(res.statusCode).toBe(200);
      expect(questionnaire).toEqual(questionnaireSchemaValidation);
      expect(questionnaire.status).toEqual(QuestionnaireStatus.PUBLISH);

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      expect(url).toEqual(expectedUrl);
    });

    it("should return an error from validation", async () => {
      const id = testerData.questionnaires[0].id;

      const queryData = {
        query: `
          mutation publish($id: Int!) 
          {
            publishQuestionnaire(id: $id)
            {questionnaire {id, ownerId, status, title}, url}
          }
        `,
        variables: { id },
      };

      const res = await request(httpServer)
        .post("/graphql")
        .set("Authorization", "Bearer " + negativeTesterTkn)
        .send(queryData);

      const { errors } = res.body;

      expect(res.statusCode).toBe(200);
      expect(errors.length).toEqual(1);
      expect(errors[0].message).toEqual("Error: Failed to publish questionniare");
    });
  });

  describe("POST /questionnare/update", () => {
    const rand = Math.floor(Math.random() * 100);
    const updated = { title: `updatedTitle-${rand}` };

    it("should successfully update questionnaire", async () => {
      const id = testerData.questionnaires[0].id;
      const queryData = {
        query: `
          mutation update($id: Int!, $updated: QuestionnaireWritable!)
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
          mutation update($id: Int!, $updated: QuestionnaireWritable!)
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
