import Box from '@foundation/Box/Box';
import Button from '@foundation/Button/Button';

type VideoBoxProps = {
  onNextClick?: () => void;
  onPrevClick?: () => void;
};

const VideoSettingBox: React.FC<VideoBoxProps> = ({
  onNextClick,
  onPrevClick,
}) => {
  return (
    <Box>
      <Button onClick={onPrevClick}>이전</Button>
      videoSettionBox 입니다
      <Button onClick={onNextClick}>다음</Button>
    </Box>
  );
};
export default VideoSettingBox;
