import { postQuestion } from '@/apis/question';
import { QUERY_KEY } from '@/constants/queryKey';
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

const useQuestionMutation = (
  categoryId: number,
  options?: UseMutationOptions<
    unknown,
    Error,
    {
      categoryId: number;
      content: string;
    },
    unknown
  >
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...leftOption } = options || {};

  return useMutation({
    mutationFn: postQuestion,
    onSuccess: (...args) => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.QUESTION_CATEGORY(categoryId),
      });
      onSuccess?.(...args);
    },
    ...leftOption,
  });
};

export default useQuestionMutation;
