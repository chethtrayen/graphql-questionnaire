import { QuestionEditable, QuestionnaireEditable, Question } from "@type";

export interface RequestUtils<R> {
  getTokenFromRequest(req: R): string | null;
}

export type QuestionnaireUpdateRequest = {
  id: number;
  updated: QuestionnaireEditable;
};

export type QuestionnaireCreateRequest = {
  questionnaire: QuestionnaireEditable;
  questions?: Question[];
};

export type QuestionCreateRequest = {
  questionnaireId: number;
  questions: QuestionEditable[];
};
