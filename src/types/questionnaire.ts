import { APIResponse, Question, QuestionnairePublishResponse, QuestionnaireStatus } from "@type";

export type BaseQuestionnaire = {
  id: number;
  ownerId: number;
  status: QuestionnaireStatus;
  title: string;
};

export interface Questionnaire extends BaseQuestionnaire {
  questions?: Question[];
}

export type QuestionnaireEditable = Omit<BaseQuestionnaire, "id" | "ownerId" | "status">;

export interface IQuestionnaire {
  /**
   * Create questionnaire
   *
   * @param questionnaire questionnaire create data
   */

  create(questionnaire: QuestionnaireEditable, questions: Question[] | undefined, userId: number | undefined): APIResponse<Questionnaire>;

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
