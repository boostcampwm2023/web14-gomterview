import { css } from '@emotion/react';
import Typography from '@foundation/Typography/Typography';
import Icon from '@foundation/Icon/Icon';

type InterviewFooterProps = {
  isRecording: boolean;
  recordedBlobs: Blob[];
  handleStartRecording: () => void;
  handleStopRecording: () => void;
  handleScript: () => void;
  handleDownload: () => void;
};

const InterviewFooter: React.FC<InterviewFooterProps> = ({
  isRecording,
  recordedBlobs,
  handleStartRecording,
  handleStopRecording,
  handleScript,
  handleDownload,
}) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 6.25rem;
        background-color: black;
      `}
    >
      <div
        css={css`
          display: flex;
          gap: 2.5rem;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.25rem;
          `}
          onClick={() => {
            alert('면접을 종료하겠냐는 모달을 띄웁니다.');
            console.log('hi');
          }}
        >
          <Icon id="close-circle" width="2rem" height="2rem" />
          <Typography variant={'body1'} color="white">
            나가기
          </Typography>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.25rem;
          `}
          onClick={handleScript}
        >
          <Icon id="script" width="2rem" height="2rem" />
          <Typography variant={'body1'} color="white">
            스크립트
          </Typography>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.25rem;
          `}
          onClick={isRecording ? handleStopRecording : handleStartRecording}
        >
          {isRecording ? (
            <Icon id="record-start" width="2rem" height="2rem" />
          ) : (
            <Icon id="record-start" width="2rem" height="2rem" />
          )}
          <Typography variant={'body1'} color="white">
            {isRecording ? '녹화종료' : '녹화시작'}
          </Typography>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.25rem;
          `}
          onClick={handleDownload}
        >
          <Icon
            id="next" // symbol 옆에 작성한 id를 인자로 받습니다.
            width="2rem"
            height="2rem"
          />
          <Typography variant={'body1'} color="white">
            다음질문
          </Typography>
        </div>
      </div>
    </div>
  );
};
export default InterviewFooter;
