import { postDefaultAnswer } from '@/apis/answer';
import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useAnswerDefaultMutation = (categoryId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postDefaultAnswer,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.QUESTION_CATEGORY(categoryId),
      });
    },
  });
};

export default useAnswerDefaultMutation;
