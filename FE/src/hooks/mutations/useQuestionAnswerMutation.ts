import { postAnswer } from '@/apis/answer';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useQuestionAnswerMutation = (
  questionId: number,
  customAnswer: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postAnswer(questionId, customAnswer),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['answer', questionId] });
    },
  });
};

export default useQuestionAnswerMutation;
