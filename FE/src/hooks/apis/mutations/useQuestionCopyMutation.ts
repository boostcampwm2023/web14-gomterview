import { useMutation } from '@tanstack/react-query';
import { postQuestionCopy } from '@/apis/question';

const useQuestionCopyMutation = () => {
  return useMutation({
    mutationFn: postQuestionCopy,
  });
};

export default useQuestionCopyMutation;
