import { LeadingDot } from '@foundation/LeadingDot/LeadingDot';
import Typography from '@foundation/Typography/Typography';
type RecordStatusType = {
  isRecording: boolean;
};

const RecordStatus: React.FC<RecordStatusType> = ({ isRecording }) => {
  return (
    <LeadingDot color={isRecording ? 'red' : 'green'}>
      <Typography noWrap paragraph variant={'body1'} color="white">
        {isRecording ? '녹화중' : '녹화준비'}
      </Typography>
    </LeadingDot>
  );
};
export default RecordStatus;
