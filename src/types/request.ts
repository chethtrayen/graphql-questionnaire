import { QuestionnaireEditable, Question } from "@type";

export type QuestionnaireUpdateRequest = {
  id: number;
  updated: QuestionnaireEditable;
};

export type QuestionnaireCreateRequest = {
  inserted: QuestionnaireEditable;
  questions?: Question[];
};

export interface RequestUtils<R> {
  getTokenFromRequest(req: R): string | null;
}
