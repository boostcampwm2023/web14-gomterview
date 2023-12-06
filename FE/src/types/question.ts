export type QuestionEntity = {
  workbookId: number;
  questionId: number;
  questionContent: string;
  answerId: number;
  answerContent: string;
};

export type Question = {
  questionId: number;
  questionContent: string;
  answerId: number;
  answerContent: string;
};

/**
 * POST question/copy
 * 문제집에서 질문을 새로운 문제집으로 복사할 때 요청 객체 타입입니다.
 */
export type QuestionCopyReqDto = {
  workbookId: number;
  questionIds: number[];
};

/**
 * POST question/copy
 * 문제집에서 질문을 새로운 문제집으로 복사할 때 응답 객체 타입입니다.
 */
export type QuestionCopyResDto = {
  workbookId: number;
};
