export type Questionaire = {
  id: number;
  ownerId: number;
  publish: boolean;
  title: string;
}

export type QuestionaireEditable = Omit<Questionaire, 'id' | 'ownerId' | 'publish'>

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

export type QuestionAnswer = {
  id: number;
  ownerId: string;
  order: number;
  value: string;
} 

export type QuestionAnswerEditable = Omit<Question, 'id' | 'ownerId'>

export interface IQuestionaire {

  /**
   * Create questionaire
   * 
   * @param questionaire questionaire create data
   */
  create(questionaire: QuestionaireEditable): Promise<Questionaire>;

  /**
   * (Owner only) delete questionaire
   *
   * @param id questionaire id
   */
  delete(id: number): Promise<boolean>;

  /**
   * Get questionaire
   * If publish this is accessible to all, else accessible to the owner 
   *
   * @param id questionaire id
   */
  getById(id: number): Promise<Questionaire>;

  /**
   * Get all user's questionaires
   *
  */
  getByUser(): Promise<Questionaire>[];

  /**
   * (Owner only) publish questionaire
   *
   * @param id questionaire id
   */
  publish(id: number): Promise<string>;

  /**
   * (Owner only) update questionaire
   *
   * @param id questionaire id
   * @param update editable data
   */
  update(id: number, updates: QuestionaireEditable): Promise<boolean>;
}

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


export interface IQuestionAnswer {

  /**
   * Create answer for question
   * 
   * @param questionId question id 
   * @param QuestionAnswers answer create data
   */
  create(questionId: number, QuestionAnswers: QuestionAnswerEditable[]): Promise<Question>

  /**
   * (Owner only) Delete answer from question
   * 
   * @param id questionAnswer id 
   */
  delete(id: number) : Promise<boolean>

  /**
   * Get answer for question
   *
   * @param questionId question id
  */
  getByQuestion(questionId: number) : Promise<Question>[];

  /**
   * (Owner only) Update answer for question
   * 
   * @param id questionAnswer id 
   * @param updates: editable data
   */
  update(id: number, updates: QuestionAnswerEditable): Promise<boolean>;
}