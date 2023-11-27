import { theme } from '@styles/theme';
import { Typography, LeadingDot } from '@foundation/index';
type RecordStatusType = {
  isRecording: boolean;
};

const RecordStatus: React.FC<RecordStatusType> = ({ isRecording }) => {
  return (
    <LeadingDot
      color={
        isRecording
          ? `${theme.colors.status.record}`
          : `${theme.colors.status.active}`
      }
    >
      <Typography
        noWrap
        paragraph
        variant={'body1'}
        color={theme.colors.text.white}
      >
        {isRecording ? '녹화중' : '녹화준비'}
      </Typography>
    </LeadingDot>
  );
};
export default RecordStatus;
