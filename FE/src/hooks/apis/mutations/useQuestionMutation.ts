import { postQuestion } from '@/apis/question';
import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * POST /question
 *
 * 문제집에 새로운 질문을 등록하기 위한 api입니다.
 */
const useQuestionMutation = (workbookId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postQuestion,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.QUESTION_WORKBOOK(workbookId),
      });
    },
  });
};

export default useQuestionMutation;
