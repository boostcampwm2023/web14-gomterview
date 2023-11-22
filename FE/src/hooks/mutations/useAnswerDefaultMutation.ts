import { postDefaultAnswer } from '@/apis/answer';
import { QUERY_KEY } from '@/constants/queryKey';
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

const useAnswerDefaultMutation = (
  categoryId: number,
  options?: UseMutationOptions<
    unknown,
    Error,
    {
      questionId: number;
      answerId: number;
    },
    unknown
  >
) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...leftOption } = options || {};

  return useMutation({
    mutationFn: postDefaultAnswer,
    onSuccess: (...args) => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.QUESTION_CATEGORY(categoryId),
      });
      onSuccess?.(...args);
    },
    ...leftOption,
  });
};

export default useAnswerDefaultMutation;
