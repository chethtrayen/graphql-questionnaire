export enum QuestionTypes {
  SHORT_ANSWER,
  PARAGRAPH,
  CHECKBOXES,
  MULTIPLE_CHOICE,
  DROPDOWN
}

export type Question = {
  id: number;
  label: string;
  order: number;
  ownerId: number;
  type: QuestionTypes
}

export type QuestionEditable = Omit<Question, 'id' | 'ownerId'>

export interface IQuestion {

  /**
   * Create question
   * 
   * @param questionaireId questionaire id
   * @param questions question create data
   */
  create(questionaireId: number, questions: QuestionEditable[]): Promise<Question>

  /**
   * (Owner only) delete question
   *
   * @param id question id
  */
  delete(id: number) : Promise<boolean>

  /**
   * Get questions from questionaire
   *
   * @param questionaireId questionaire id
  */
  getByQuestionaire(questionaireId: number): Promise<Question>[];

  /**
   * (Owner only) update question
   *
   * @param id question id
   * @param update editable data
   */
  update(id: number, update: QuestionEditable): Promise<boolean>;
}
