import { QuestionType } from "@type";

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

export type QuestionEditable = Omit<BaseQuestion, "id" | "ownerId" | "questionnaireId">;

export interface IQuestion {
  /**
   * Create question
   *
   * @param questionnaireId questionnaire id
   * @param questions question create data
   */
  create(questionnaireId: number, questions: QuestionEditable[]): Promise<Question>;

  /**
   * (Owner only) delete question
   *
   * @param id question id
   */
  delete(id: number): Promise<boolean>;

  /**
   * Get questions from questionnaire
   *
   * @param questionnaireId questionnaire id
   */
  getByQuestionnaire(questionnaireId: number): Promise<Question>[];

  /**
   * (Owner only) update question
   *
   * @param id question id
   * @param update editable data
   */
  update(id: number, update: QuestionEditable): Promise<boolean>;
}
