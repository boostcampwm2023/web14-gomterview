import { questionSetting } from '@/atoms/interviewSetting';
import { Question } from '@/types/question';
import { useRecoilState } from 'recoil';

const useSelectQuestions = ({
  question,
  workbookId,
}: {
  question: Question;
  workbookId: number;
}) => {
  const [selectedQuestions, setSelectedQuestions] =
    useRecoilState(questionSetting);

  const setUnselected = () => {
    setSelectedQuestions((prevState) => ({
      isSuccess: prevState.selectedData.length > 1,
      selectedData: prevState.selectedData.filter(
        (item) => item.questionId !== question.questionId
      ),
    }));
  };

  const setSelected = () => {
    setSelectedQuestions((prevState) => ({
      isSuccess: true,
      selectedData: [
        ...prevState.selectedData,
        { ...question, workbookId: workbookId },
      ],
    }));
  };

  const toggleSelected = () => (isSelected ? setUnselected() : setSelected());

  const isSelected = selectedQuestions.selectedData.some(
    (item) =>
      item.questionId === question.questionId && item.workbookId === workbookId
  );

  return { isSelected, setUnselected, setSelected, toggleSelected };
};

export default useSelectQuestions;
