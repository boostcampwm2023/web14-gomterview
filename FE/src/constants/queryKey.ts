export const QUERY_KEY = {
  QUESTION_ANSWER: (questionId: number) => ['answer', questionId],
  QUESTION_CATEGORY: (categoryId: number) => ['questions', categoryId],
  CATEGORY: ['categories'],
  MEMBER: ['member'],
};
