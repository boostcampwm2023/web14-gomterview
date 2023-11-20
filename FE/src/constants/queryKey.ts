export const QUERY_KEY = {
  QUESTION_ANSWER: (questionId: number) => ['answer', questionId],
  MEMBER: ['member'],
  VIDEO: ['video'],
  VIDEO_ID: (videoId: number) => ['video', videoId],
};
