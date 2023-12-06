import { useQueryClient } from '@tanstack/react-query';
import useQuestionMutation from './apis/mutations/useQuestionMutation';
import useUserInfo from './useUserInfo';
import { Question } from '@/types/question';
import { QUERY_KEY } from '@/constants/queryKey';

const useQuestionAdd = (
  workbookId: number,
  { onSuccess }: { onSuccess?: () => void }
) => {
  const userInfo = useUserInfo();
  const queryClient = useQueryClient();

  const { mutate } = useQuestionMutation(workbookId);

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
    workbookId,
  }: {
    value: string;
    workbookId: number;
  }) => {
    if (userInfo) {
      mutate(
        { content: value, workbookId: workbookId },
        {
          onSuccess: () => onSuccess && onSuccess(),
        }
      );
    } else {
      queryClient.setQueryData<Question[] | []>(
        QUERY_KEY.QUESTION_WORKBOOK(workbookId),
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
