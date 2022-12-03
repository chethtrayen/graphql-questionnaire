import errorHandler from "errorhandler";
import express from "express";
import http from "http";
import { startGraphQLServer } from "./app/graphql/server";
import config from "./config";
import questionnaireRouter from "./routes/questionnaire";

async function main(): Promise<void> {
  // Create Express server
  const app: express.Application = express();
  const httpServer = http.createServer(app);

  //Error Handler. Provides full stack trace.
  if (config.debug) {
    app.use(errorHandler());
  }

  app.use("/questionnaire", questionnaireRouter);

  await startGraphQLServer(app, httpServer);

  // Start Express server.
  await new Promise<void>((resolve) => httpServer.listen(config.http.port, resolve));
  console.log("[Server] Server is running on " + `http://${config.http.host}:${config.http.port} in ${app.get("env") as string} mode.`);
  console.log("[Server] Press CTRL-C to stop.\n");
}

void main();
