import { deleteQuestionById } from '@/apis/question';
import { useMutation } from '@tanstack/react-query';

/**
 * DELETE /question/${questionId}
 *
 * questionId 해당하는 질문을 서버에서 지우기 위한 api입니다.
 */
const useDeleteQuestionMutation = () => {
  return useMutation({
    mutationFn: deleteQuestionById,
  });
};

export default useDeleteQuestionMutation;
