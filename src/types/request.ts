import { Questionnaire, QuestionWritable, QuestionnaireWritable, Question } from "@type";

export interface RequestUtils<R> {
  getTokenFromRequest(req: R): string | null;
}

export type QuestionCreateRequest = {
  questionnaireId: number;
  questions: QuestionWritable[];
};

export type QuestionnaireCreateRequest = {
  questionnaire: QuestionnaireWritable;
  questions?: Question[];
};

export type QuestionnaireUpdateRequest = {
  questionnaire: Questionnaire;
};
