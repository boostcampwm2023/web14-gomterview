import { postAnswer } from '@/apis/answer';
import { useMutation } from '@tanstack/react-query';

const useQuestionAnswerMutation = (
  questionId: number,
  customAnswer: string
) => {
  return useMutation({
    mutationFn: () => postAnswer(questionId, customAnswer),
  });
};

export default useQuestionAnswerMutation;
