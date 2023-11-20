import Box from '@foundation/Box/Box';
import Button from '@foundation/Button/Button';

type RecordMethodBoxProps = {
  onNextClick?: () => void;
  onPrevClick?: () => void;
};

const RecordMethodBox: React.FC<RecordMethodBoxProps> = ({
  onNextClick,
  onPrevClick,
}) => {
  return (
    <Box>
      SaveMethodBox 입니다 <Button onClick={onNextClick}>다음</Button>
    </Box>
  );
};
export default RecordMethodBox;
