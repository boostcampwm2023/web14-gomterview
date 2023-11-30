import { getQuestionAnswer } from '@/apis/answer';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

/**
 * GET /answer/${questionId}
 *
 * questionId로 해당 질문의 모든 답안 스크립트를 조회하는 api입니다.
 *
 * 답변을 수정하는 모달에서 사용됩니다.
 */
const useQuestionAnswerQuery = (questionId: number) => {
  return useQuery({
    queryKey: QUERY_KEY.QUESTION_ANSWER(questionId),
    queryFn: () => getQuestionAnswer(questionId),
  });
};

export default useQuestionAnswerQuery;
