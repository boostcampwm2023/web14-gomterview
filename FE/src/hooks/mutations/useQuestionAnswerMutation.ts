import { postAnswer } from '@/apis/answer';
import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useQuestionAnswerMutation = (
  questionId: number,
  customAnswer: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postAnswer(questionId, customAnswer),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.QUESTION_ANSWER(questionId),
      });
    },
  });
};

export default useQuestionAnswerMutation;
