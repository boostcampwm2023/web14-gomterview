import { getQuestionAnswer } from '@/apis/answer';
import { useQuery } from '@tanstack/react-query';

const useQuestionAnswerQuery = (questionId: number) => {
  return useQuery({
    queryKey: ['answer', questionId],
    queryFn: () => getQuestionAnswer(questionId),
  });
};

export default useQuestionAnswerQuery;
