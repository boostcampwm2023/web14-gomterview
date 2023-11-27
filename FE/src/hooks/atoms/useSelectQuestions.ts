import { questionSetting } from '@/atoms/interviewSetting';
import { Question } from '@/types/question';
import { useRecoilState } from 'recoil';

const useSelectQuestions = ({
  question,
  categoryId,
}: {
  question: Question;
  categoryId: number;
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
        { ...question, categoryId: categoryId },
      ],
    }));
  };

  const toggleSelected = () => (isSelected ? setUnselected() : setSelected());

  const isSelected = selectedQuestions.selectedData.some(
    (item) =>
      item.questionId === question.questionId && item.categoryId === categoryId
  );

  return { isSelected, setUnselected, setSelected, toggleSelected };
};

export default useSelectQuestions;
