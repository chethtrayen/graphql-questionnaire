import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import request from "supertest";

import { getGraphQLContext } from "@context";
import { getTesterData, getTesterTkn, questionSchemaValidation } from "@testHelpers";
import { resolvers, typeDefs } from "@testUtils";
import { Question } from "@type";
import { mockQuestionWritable } from "@testHelpers";
import { addQuestion } from "test/helpers/question/addQuestion";

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

  describe("POST /question/create", () => {
    const query = `
      mutation create($questionnaireId: Int!, $questions: [QuestionCreate]!)
      {
        createQuestion(questionnaireId: $questionnaireId, questions: $questions)
        {
          answers, id, label, questionnaireId, order, ownerId, type, 
        }
      }
    `;

    it("should successfully create question", async () => {
      const id = testerData.questionnaires[0].id;

      const queryData = {
        query,
        variables: { questionnaireId: id, questions: mockQuestionWritable },
      };

      const res = await request(httpServer)
        .post("/graphql")
        .set("Authorization", "Bearer " + testerTkn)
        .send(queryData);

      const { createQuestion } = res.body.data;

      expect(res.statusCode).toBe(200);
      createQuestion.forEach((q: Question) => {
        expect(q).toEqual(expect.objectContaining(questionSchemaValidation(q.answers)));
      });

      expect(createQuestion).toMatchObject(mockQuestionWritable);
    });

    it("should fail to update questionnaire from validation error", async () => {
      const id = testerData.questionnaires[0].id;

      const queryData = {
        query,
        variables: { questionnaireId: id, questions: mockQuestionWritable },
      };

      const res = await request(httpServer)
        .post("/graphql")
        .set("Authorization", "Bearer " + negativeTesterTkn)
        .send(queryData);

      const { errors } = res.body;

      expect(res.statusCode).toBe(200);
      expect(errors.length).toEqual(1);
      expect(errors[0].message).toEqual("Error: Failed to create question");
    });
  });

  describe("Delete /question", () => {
    const query = `
      mutation delete($id: Int!)
      {
        deleteQuestion(id: $id)
        {
          id
        }
      }
    `;

    beforeAll(async () => {
      const questionnaire = testerData.questionnaires[0];
      const insertedQuestion = await addQuestion(questionnaire.id, testerData.id);
      const questions = testerData.questionnaires[0].questions;

      testerData.questionnaires[0].questions = [...questions, insertedQuestion];
    });

    it("should successfully delete question", async () => {
      const { id } = testerData.questionnaires[0].questions[0];

      const queryData = {
        query,
        variables: { id },
      };

      const res = await request(httpServer)
        .post("/graphql")
        .set("Authorization", "Bearer " + testerTkn)
        .send(queryData);

      const { deleteQuestion } = res.body.data;

      expect(res.statusCode).toBe(200);
      expect(id).toEqual(deleteQuestion.id);
    });

    it("should fail to delete question from validation error", async () => {
      const { id } = testerData.questionnaires[0].questions[0];

      const queryData = {
        query,
        variables: { id },
      };

      const res = await request(httpServer)
        .post("/graphql")
        .set("Authorization", "Bearer " + negativeTesterTkn)
        .send(queryData);

      const { errors } = res.body;

      expect(res.statusCode).toBe(200);
      expect(errors.length).toEqual(1);
      expect(errors[0].message).toEqual("Error: Failed to delete question");
    });
  });
});
