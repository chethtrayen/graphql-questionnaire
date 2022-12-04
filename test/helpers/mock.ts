import { questionContext } from "@helpers/question/questionContext";
import { Question, Questionnaire, QuestionnaireStatus, QuestionWritable, QuestionnaireWritable, QuestionType } from "@type";

const userId = 2;

export const mockQuestionnaireWritable: QuestionnaireWritable = {
  title: "foo bar",
};

export const mockQuestionWritable: QuestionWritable[] = [
  {
    answers: ["A"],
    label: "Testing2",
    order: 0,
    type: QuestionType.MULTIPLE_CHOICE,
  },
  {
    answers: ["A"],
    order: 1,
    label: "Testing1",
    type: QuestionType.MULTIPLE_CHOICE,
  },
];
export const mockQuestionnaire: Questionnaire = {
  ...mockQuestionnaireWritable,
  id: 1,
  ownerId: 1,
  status: QuestionnaireStatus.DRAFT,
};

export const mockQuestions: Question[] = mockQuestionWritable.map((q) => {
  const context = questionContext(q.type);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const data = context!.getBuildData(q, mockQuestionnaire.id, userId);

  return { ...data, id: 2 };
});
