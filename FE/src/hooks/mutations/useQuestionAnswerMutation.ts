import { postAnswer } from '@/apis/answer';
import { QUERY_KEY } from '@/constants/queryKey';
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

const useQuestionAnswerMutation = (
  questionId: number,
  customAnswer: string,
  options?: UseMutationOptions<unknown, Error, void, unknown>
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...leftOption } = options || {};

  return useMutation({
    mutationFn: () => postAnswer(questionId, customAnswer),
    onSuccess: (...args) => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.QUESTION_ANSWER(questionId),
      });
      onSuccess?.(...args);
    },
    ...leftOption,
  });
};

export default useQuestionAnswerMutation;
