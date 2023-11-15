import { css } from '@emotion/react';
import RecordStatus from './RecordStatus';
import Typography from '../foundation/Typography/Typography';
import RecordTimer from './RecordTimer';

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
      <div
        css={css`
          max-width: 600px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;

          @media (max-width: 46rem) {
            width: 9.375rem;
          }
        `}
      >
        <Typography noWrap paragraph variant={'body1'} color="white">
          {intervieweeName}
        </Typography>
      </div>
      <RecordTimer isRecording={isRecording} />
    </div>
  );
};
export default InterviewHeader;
