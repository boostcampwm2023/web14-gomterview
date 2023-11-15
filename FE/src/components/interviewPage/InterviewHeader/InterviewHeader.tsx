import { css } from '@emotion/react';
import RecordStatus from './RecordStatus';
import RecordTimer from './RecordTimer';
import IntervieweeName from './IntervieweeName';

type InterviewHeaderProps = {
  isRecording: boolean;
  intervieweeName: string;
};

const InterviewHeader: React.FC<InterviewHeaderProps> = ({
  isRecording,
  intervieweeName,
}) => {
  return (
    <div
      css={css`
        display: flex;
        position: fixed;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 3.125rem;
        background-color: black;
        z-index: 10;
      `}
    >
      <RecordStatus isRecording={isRecording} />
      <IntervieweeName intervieweeName={intervieweeName} />
      <RecordTimer isRecording={isRecording} />
    </div>
  );
};
export default InterviewHeader;
