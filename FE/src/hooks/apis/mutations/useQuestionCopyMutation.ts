import { useMutation } from '@tanstack/react-query';
import { postQuestionCopy } from '@/apis/question';

/**
 * POST question/copy
 *
 * 다른사람의 문제집에서 질문을 가져올 때 질문을 복제하기 위한 api입니다.
 */
const useQuestionCopyMutation = () => {
  return useMutation({
    mutationFn: postQuestionCopy,
  });
};

export default useQuestionCopyMutation;
