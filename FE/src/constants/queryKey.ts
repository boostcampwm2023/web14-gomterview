export const QUERY_KEY = {
  QUESTION_ANSWER: (questionId: number) => ['answer', questionId],
  QUESTION_CATEGORY: (categoryId: number) => ['questions', categoryId],
  CATEGORY: ['categories'],
  MEMBER: ['member'],
  MEMBER_NICKNAME: ['member', 'nickname'],
  VIDEO: ['video'],
  VIDEO_ID: (videoId: number) => ['video', videoId],
  VIDEO_HASH: (videoHash: string) => ['video', videoHash],
  WORKBOOK: ['workbook'],
  WORKBOOK_ID: (workbookId: number) => ['workbook', workbookId],
  QUESTION_WORKBOOK_ID: (workbookId: number) => [
    'question',
    'workbook',
    workbookId,
  ],
};
