import { css } from '@emotion/react';
import { theme } from '@styles/theme';

import {
  RecordStatus,
  IntervieweeName,
  RecordTimer,
  VolumeStatus,
} from './index';

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
        z-index: ${theme.zIndex.header.content};
      `}
    >
      <RecordStatus isRecording={isRecording} />
      <IntervieweeName />
      <div
        css={css`
          display: flex;
          gap: 1.875rem;
        `}
      >
        <RecordTimer isRecording={isRecording} />
        <VolumeStatus />
      </div>
    </div>
  );
};
export default InterviewHeader;
