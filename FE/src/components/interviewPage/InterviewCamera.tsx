import { css } from '@emotion/react';
import { RefObject } from 'react';

type InterviewCameraProps = {
  mirrorVideoRef: RefObject<HTMLVideoElement>;
  isScriptInView: boolean;
  question: string;
  answer: string;
};

const InterviewCamera: React.FC<InterviewCameraProps> = ({
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
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 3.125rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1;
          width: 62.5rem;
          height: 5rem;
          background-color: black;
          color: white;
          opacity: 60%;
          border-radius: 0rem 0rem 2rem 2rem;

          @media (max-width: 1000px) {
            width: 80%;
          }

          @media (max-width: 500px) {
            width: 90%;
          }
        `}
      >
        {question}
      </div>
      <video
        ref={mirrorVideoRef}
        autoPlay
        muted
        css={css`
          height: 100%;
          transform: scaleX(-1);
        `}
      />
      <div
        css={css`
          display: ${isScriptInView ? 'flex' : 'none'};
          justify-content: center;
          align-items: center;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1;
          width: 62.5rem;
          height: 11.5rem;
          background-color: black;
          color: white;
          opacity: 60%;
          border-radius: 2rem 2rem 0rem 0rem;
          padding: 1.25rem;

          @media (max-width: 1000px) {
            width: 80%;
          }

          @media (max-width: 500px) {
            width: 90%;
            height: 14rem;
          }
        `}
      >
        <div
          css={css`
            width: 100%;
            height: 100%;
            overflow-y: scroll;
          `}
        >
          {answer}
        </div>
      </div>
    </div>
  );
};

export default InterviewCamera;
