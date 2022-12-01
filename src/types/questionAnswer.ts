export type QuestionAnswer = {
  id: number;
  ownerId: string;
  order: number;
  value: string;
} 

export type QuestionAnswerEditable = Omit<QuestionAnswer, 'id' | 'ownerId'>

export interface IQuestionAnswer {

  /**
   * Create answer for question
   * 
   * @param questionId question id 
   * @param QuestionAnswers answer create data
   */
  create(questionId: number, QuestionAnswers: QuestionAnswerEditable[]): Promise<QuestionAnswer>

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
  getByQuestion(questionId: number) : Promise<QuestionAnswer>[];

  /**
   * (Owner only) Update answer for question
   * 
   * @param id questionAnswer id 
   * @param updates: editable data
   */
  update(id: number, updates: QuestionAnswerEditable): Promise<boolean>;
}