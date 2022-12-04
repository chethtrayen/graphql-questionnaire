export const questionnaireSchemaValidation = {
  id: expect.any(Number),
  ownerId: expect.any(Number),
  status: expect.any(String),
  title: expect.any(String),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const questionSchemaValidation = (answers: string[]): any => ({
  answers: expect.arrayContaining(answers),
  id: expect.any(Number),
  label: expect.any(String),
  order: expect.any(Number),
  questionnaireId: expect.any(Number),
  type: expect.any(String),
  ownerId: expect.any(Number),
});
