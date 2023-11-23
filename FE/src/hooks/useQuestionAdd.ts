import { useQueryClient } from '@tanstack/react-query';
import useQuestionMutation from './mutations/useQuestionMutation';
import useUserInfo from './useUserInfo';
import { Question } from '@/types/question';
import { QUERY_KEY } from '@/constants/queryKey';

const useQuestionAdd = (
  categoryId: number,
  { onSuccess }: { onSuccess?: () => void }
) => {
  const userInfo = useUserInfo();
  const queryClient = useQueryClient();

  const { mutate } = useQuestionMutation(categoryId, {
    onSuccess: onSuccess,
  });

  const createNewQuestion = (content: string, lastId: number = 1) => {
    return {
      questionId: lastId - 1,
      questionContent: content,
      answerId: 0,
      answerContent: '',
    };
  };

  const addQuestion = ({
    value,
    categoryId,
  }: {
    value: string;
    categoryId: number;
  }) => {
    if (userInfo) {
      mutate({ content: value, categoryId: categoryId });
    } else {
      queryClient.setQueryData<Question[] | []>(
        QUERY_KEY.QUESTION_CATEGORY(categoryId),
        (prev) => {
          if (prev?.length === 0 || !prev) return [createNewQuestion(value)];
          return [createNewQuestion(value, prev[0].questionId), ...prev];
        }
      );
      onSuccess && onSuccess();
    }
  };
  return { addQuestion };
};

export default useQuestionAdd;
