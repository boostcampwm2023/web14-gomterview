import { css } from '@emotion/react';
import { RefObject } from 'react';
import InterviewQuestion from './InterviewQuestion';
import InterviewAnswer from './InterviewAnswer';
import Mirror from './Mirror';

type InterviewMainProps = {
  mirrorVideoRef: RefObject<HTMLVideoElement>;
  isScriptInView: boolean;
  question: string;
  answer: string;
};

const InterviewMain: React.FC<InterviewMainProps> = ({
  mirrorVideoRef,
  isScriptInView,
  question,
  answer,
}) => {
  return (
    <div
      css={css`
        display: flex;
        position: relative;
        justify-content: center;
        height: 100%;
        align-items: center;
        background-color: black;
        overflow: hidden;
      `}
    >
      <InterviewQuestion question={question} />
      <Mirror mirrorVideoRef={mirrorVideoRef} />
      {isScriptInView && <InterviewAnswer answer={answer} />}
    </div>
  );
};

export default InterviewMain;
