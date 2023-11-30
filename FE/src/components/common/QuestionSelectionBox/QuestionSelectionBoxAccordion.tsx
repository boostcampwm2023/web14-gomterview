import { Question } from '@/types/question';
import QuestionAccordion from '@common/QuestionAccordion/QuestionAccordion';
import useSelectQuestions from '@hooks/atoms/useSelectQuestions';

type QuestionSelectionBoxAccordionProps = {
  question: Question;
  workbookId: number;
};

const QuestionSelectionBoxAccordion: React.FC<
  QuestionSelectionBoxAccordionProps
> = ({ question, workbookId }) => {
  const { isSelected, toggleSelected } = useSelectQuestions({
    question: question,
    workbookId: workbookId,
  });
  return (
    <QuestionAccordion
      question={question}
      workbookId={workbookId}
      isEditable={true}
      isSelected={isSelected}
      toggleSelected={toggleSelected}
    />
  );
};

export default QuestionSelectionBoxAccordion;
