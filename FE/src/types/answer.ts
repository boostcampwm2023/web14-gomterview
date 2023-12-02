export type AnswerEntity = {
  answerId: number;
  content: string;
  memberId: number;
  memberName: string;
  memberImage: string;
};

/**
 * GET answer/${questionId}
 * questionID로 질문을 단건 조회했을 때 응답 객체압니다.
 */
export type AnswerItemResDto = AnswerEntity;
