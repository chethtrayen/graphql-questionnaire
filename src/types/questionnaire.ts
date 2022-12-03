import { APIResponse, QuestionnaireStatus } from "@type";

export type Questionnaire = {
  id: number;
  ownerId: number;
  status: QuestionnaireStatus;
  title: string;
};

export type QuestionnaireCreate = {
  inserted: QuestionnaireEditable;
};

export type QuestionnaireEditable = Omit<Questionnaire, "id" | "ownerId" | "status">;

export type QuestionnairePublishResponse = {
  questionnaire: Questionnaire;
  url: string;
};

export type QuestionnaireUpdate = {
  id: number;
  updated: QuestionnaireEditable;
};

export interface IQuestionnaire {
  /**
   * Create questionnaire
   *
   * @param questionnaire questionnaire create data
   */

  create(questionnaire: QuestionnaireEditable, userId: number | undefined): APIResponse<Questionnaire>;

  /**
   * Get published questionnaire
   *
   * @param id questionnaire id
   */

  getPublishById(id: number): APIResponse<Questionnaire>;

  /**
   * Get all user's questionnaires
   *
   */

  getByOwner(userId: number): APIResponse<Questionnaire[]>;

  /**
   * (Owner only) publish questionnaire
   *
   * @param id questionnaire id
   */

  publish(id: number, userId: number): APIResponse<QuestionnairePublishResponse>;

  /**
   * (Owner only) update questionnaire
   *
   * @param id questionnaire id
   * @param update editable data
   */

  update(id: number, updated: QuestionnaireEditable, userId: number | undefined): APIResponse<Questionnaire>;
}
