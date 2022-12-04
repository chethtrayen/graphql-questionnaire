import { Questionnaire, QuestionWritable, QuestionnaireCreate } from "@type";

export interface RequestUtils<R> {
  getTokenFromRequest(req: R): string | null;
}

export type QuestionCreateRequest = {
  questionnaireId: number;
  questions: QuestionWritable[];
};

export type QuestionnaireCreateRequest = {
  questionnaire: QuestionnaireCreate;
};

export type QuestionnaireUpdateRequest = {
  questionnaire: Questionnaire;
};
