import { QuestionEditable, QuestionnaireEditable, Question } from "@type";

export interface RequestUtils<R> {
  getTokenFromRequest(req: R): string | null;
}

export type QuestionnaireUpdateRequest = {
  id: number;
  updated: QuestionnaireEditable;
};

export type QuestionnaireCreateRequest = {
  inserted: QuestionnaireEditable;
  questions?: Question[];
};

export type QuestionCreateRequest = {
  questionnaireId: number;
  questions: QuestionEditable[];
};
