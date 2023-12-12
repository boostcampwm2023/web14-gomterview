import { css } from '@emotion/react';
import { RefObject } from 'react';
import { Mirror } from '@common/index';
import { theme } from '@styles/theme';
import { InterviewQuestion, InterviewAnswer } from './index';
import { ConnectStatus } from '@atoms/media';

type InterviewMainProps = {
  mirrorVideoRef: RefObject<HTMLVideoElement>;
  isScriptInView: boolean;
  question: string;
  answer: string;
  connectStatus: ConnectStatus;
  reloadMedia: () => void;
};

const InterviewMain: React.FC<InterviewMainProps> = ({
  mirrorVideoRef,
  isScriptInView,
  question,
  answer,
  connectStatus,
  reloadMedia,
}) => {
  return (
    <div
      css={css`
        display: flex;
        position: relative;
        justify-content: center;
        height: 100%;
        align-items: center;
        background-color: ${theme.colors.surface.black100};
        overflow: hidden;
        padding-top: 3.125rem;
      `}
    >
      <InterviewQuestion question={question} />
      <Mirror
        mirrorVideoRef={mirrorVideoRef}
        connectStatus={connectStatus}
        reloadMedia={reloadMedia}
      />
      {isScriptInView && <InterviewAnswer answer={answer} />}
    </div>
  );
};

export default InterviewMain;
