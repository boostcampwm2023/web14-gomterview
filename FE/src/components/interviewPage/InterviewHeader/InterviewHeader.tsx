import { css } from '@emotion/react';
import { theme } from '@styles/theme';

import { RecordStatus, IntervieweeName, RecordTimer } from './index';
type InterviewHeaderProps = {
  isRecording: boolean;
};

const InterviewHeader: React.FC<InterviewHeaderProps> = ({ isRecording }) => {
  return (
    <div
      css={css`
        display: flex;
        position: fixed;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 3.125rem;
        background-color: ${theme.colors.surface.black100};
        z-index: 10;
      `}
    >
      <RecordStatus isRecording={isRecording} />
      <IntervieweeName />
      <RecordTimer isRecording={isRecording} />
    </div>
  );
};
export default InterviewHeader;
