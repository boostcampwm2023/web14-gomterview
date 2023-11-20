export const QUERY_KEY = {
  QUESTION_ANSWER: (questionId: number) => ['answer', questionId],
  QUESTION_CATEGORY: (categoryId: number) => ['questions', categoryId],
  CATEGORY: ['categories'],
  MEMBER: ['member'],
  VIDEO: ['video'],
  VIDEO_ID: (videoId: number) => ['video', videoId],
  VIDEO_HASH: (videoHash: string) => ['video', videoHash],
};
