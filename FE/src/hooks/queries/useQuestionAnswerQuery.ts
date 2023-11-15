import { getQuestionAnswer } from '@/apis/answer';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

const useQuestionAnswerQuery = (questionId: number) => {
  return useQuery({
    queryKey: QUERY_KEY.QUESTION_ANSWER(questionId),
    queryFn: () => getQuestionAnswer(questionId),
  });
};

export default useQuestionAnswerQuery;
