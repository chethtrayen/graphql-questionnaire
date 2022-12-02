import { Context } from "./context";

export enum QuestionnaireStatus  {
  DRAFT = "DRAFT",
  PUBLISH = "PUBLISH",
  ARCHIVE = "ARCHIVE"
}

export type Questionnaire = {
  id: number;
  ownerId: number;
  status: QuestionnaireStatus;
  title: string;
}

export type QuestionnaireEditable = Omit<Questionnaire, 'id' | 'ownerId' | 'status'>


export interface IQuestionnaire {

  /**
   * Create questionnaire
   * 
   * @param questionnaire questionnaire create data
   */

  create(questionnaire: QuestionnaireEditable, userId: number | undefined): Promise<Questionnaire | Error>;

  /**
   * (Owner only) delete questionnaire
   *
   * @param id questionnaire id
   */
  // delete(id: number): Promise<boolean>;

  // /**
  //  * Get questionnaire
  //  * If publish this is accessible to all, else accessible to the owner 
  //  *
  //  * @param id questionnaire id
  //  */
  // getById(id: number): Promise<Questionnaire>;

  // /**
  //  * Get all user's questionnaires
  //  *
  // */
  // getByUser(): Promise<Questionnaire>[];

  // /**
  //  * (Owner only) publish questionnaire
  //  *
  //  * @param id questionnaire id
  //  */
  // publish(id: number): Promise<string>;

  // /**
  //  * (Owner only) update questionnaire
  //  *
  //  * @param id questionnaire id
  //  * @param update editable data
  //  */
  // update(id: number, updates: QuestionnaireEditable): Promise<boolean>;
}