import useUserInfo from '@hooks/useUserInfo';
import { useState } from 'react';
import useDeleteQuestionMutation from '@hooks/apis/mutations/useDeleteQuestionMutation';
import { useRecoilState } from 'recoil';
import { questionSetting } from '@atoms/interviewSetting';
import { QUERY_KEY } from '@constants/queryKey';
import { Question } from '@/types/question';
import { useQueryClient } from '@tanstack/react-query';

const useWorkbookQuestionDelete = (workbookId: number) => {
  const userInfo = useUserInfo();
  const queryClient = useQueryClient();
  const [, setSelectedQuestions] = useRecoilState(questionSetting);
  const { mutateAsync: deleteQuestionAsync } = useDeleteQuestionMutation();

  const [checkedQuestion, setCheckedQuestion] = useState<number[]>([]);

  const deleteServerQuestion = async () => {
    await Promise.all(
      checkedQuestion.map((questionId) => {
        return deleteQuestionAsync(questionId);
      })
    );
    void queryClient.invalidateQueries({
      queryKey: QUERY_KEY.QUESTION_WORKBOOK(workbookId),
    });
  };

  const deleteStateQuestion = () => {
    queryClient.setQueryData<Question[]>(
      QUERY_KEY.QUESTION_WORKBOOK(workbookId),
      (prev) => {
        return prev?.filter(
          (item) => !checkedQuestion.includes(item.questionId)
        );
      }
    );
  };

  const removeCheckedQuestionFromSelectedQuestion = () => {
    setSelectedQuestions((prev) => {
      const selectedQuestions = prev.selectedData.filter(
        (question) => !checkedQuestion.includes(question.questionId)
      );
      return {
        isSuccess: selectedQuestions.length >= 1,
        selectedData: selectedQuestions,
      };
    });
  };

  const addCheckedQuestion = (questionId: number) => {
    setCheckedQuestion((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const resetCheckedQuestion = () => {
    setCheckedQuestion([]);
  };

  const deleteCheckedQuestion = async () => {
    userInfo ? await deleteServerQuestion() : deleteStateQuestion();
    removeCheckedQuestionFromSelectedQuestion();
  };

  const isCheckedQuestion = (questionId: number) => {
    return checkedQuestion.includes(questionId);
  };

  const checkQuestionCount = () => {
    return checkedQuestion.length;
  };

  return {
    addCheckedQuestion,
    resetCheckedQuestion,
    deleteCheckedQuestion,
    isCheckedQuestion,
    checkQuestionCount,
  };
};

export default useWorkbookQuestionDelete;
