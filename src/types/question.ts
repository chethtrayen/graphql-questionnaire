import { APIResponse, QuestionType } from "@type";

export type BaseQuestion = {
  answers: string[];
  id: number;
  label: string;
  order: number;
  ownerId: number;
  questionnaireId: number;
  type: QuestionType;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Question extends BaseQuestion {}

export type QuestionWritable = Omit<BaseQuestion, "id" | "ownerId" | "questionnaireId">;

export interface QuestionUpdate extends QuestionWritable {
  id: number;
}

export interface IQuestion {
  /**
   * Create question
   *
   * @param questionnaireId questionnaire id
   * @param questions question create data
   */
  create(questionnaireId: number, questions: QuestionWritable[], userId: number): APIResponse<Question[]>;

  /**
   * (Owner only) delete question
   *
   * @param id question id
   */
  delete(id: number, userId: number): APIResponse<Question>;
}
