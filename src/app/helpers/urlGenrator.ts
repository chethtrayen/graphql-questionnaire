import config from "@config";

export const generatePublishQuestionniareUrl = (id: number): string => {
  return `http://${config.http.host}:${config.http.port}/questionnaire/published?qid=${id}`;
};
