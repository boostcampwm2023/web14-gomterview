import { Question } from '@/types/question';
import QuestionAccordion from '@common/QuestionAccordion/QuestionAccordion';
import useSelectQuestions from '@hooks/atoms/useSelectQuestions';

type QuestionSelectionBoxAccordionProps = {
  question: Question;
  workbookId: number;
  isSelectable?: boolean;
};

const QuestionSelectionBoxAccordion: React.FC<
  QuestionSelectionBoxAccordionProps
> = ({ question, workbookId, isSelectable = true }) => {
  const { isSelected, toggleSelected } = useSelectQuestions({
    question: question,
    workbookId: workbookId,
  });
  return (
    <QuestionAccordion
      question={question}
      workbookId={workbookId}
      isSelected={isSelected}
      toggleSelected={isSelectable ? toggleSelected : undefined}
    />
  );
};

export default QuestionSelectionBoxAccordion;
