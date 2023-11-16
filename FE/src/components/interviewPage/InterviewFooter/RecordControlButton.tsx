import { theme } from '@styles/theme';
import { css } from '@emotion/react';
import Icon from '@foundation/Icon/Icon';
import Typography from '@foundation/Typography/Typography';

type RecordControlButtonType = {
  isRecording: boolean;
  handleStartRecording: () => void;
  handleStopRecording: () => void;
};

const RecordControlButton: React.FC<RecordControlButtonType> = ({
  isRecording,
  handleStartRecording,
  handleStopRecording,
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
      `}
      onClick={isRecording ? handleStopRecording : handleStartRecording}
    >
      {isRecording ? (
        <Icon id="record-stop" width="2rem" height="2rem" />
      ) : (
        <Icon id="record-start" width="2rem" height="2rem" />
      )}
      <Typography variant={'body1'} color={theme.colors.text.white}>
        {isRecording ? '녹화종료' : '녹화시작'}
      </Typography>
    </div>
  );
};
export default RecordControlButton;
