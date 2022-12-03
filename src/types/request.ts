import { QuestionWritable, QuestionnaireWritable, Question } from "@type";

export interface RequestUtils<R> {
  getTokenFromRequest(req: R): string | null;
}

export type QuestionnaireUpdateRequest = {
  id: number;
  updated: QuestionnaireWritable;
};

export type QuestionnaireCreateRequest = {
  questionnaire: QuestionnaireWritable;
  questions?: Question[];
};

export type QuestionCreateRequest = {
  questionnaireId: number;
  questions: QuestionWritable[];
};
