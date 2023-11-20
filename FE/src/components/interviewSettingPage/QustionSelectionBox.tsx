import Box from '@foundation/Box/Box';
import Button from '../foundation/Button/Button';

type QuestionSelectionBoxProps = {
  onNextClick?: () => void;
  onPrevClick?: () => void;
};

const QuestionSelectionBox: React.FC<QuestionSelectionBoxProps> = ({
  onNextClick,
  onPrevClick,
}) => {
  return (
    <Box>
      여기에는 Question Box가 들어갑니다
      <Button onClick={onNextClick}>다음</Button>
    </Box>
  );
};
export default QuestionSelectionBox;
