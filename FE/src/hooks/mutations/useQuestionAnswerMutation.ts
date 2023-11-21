import { postAnswer } from '@/apis/answer';
import { QUERY_KEY } from '@/constants/queryKey';
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

const useQuestionAnswerMutation = (
  questionId: number,
  options?: UseMutationOptions<
    unknown,
    Error,
    {
      questionId: number;
      content: string;
    },
    unknown
  >
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...leftOption } = options || {};

  return useMutation({
    mutationFn: postAnswer,
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
