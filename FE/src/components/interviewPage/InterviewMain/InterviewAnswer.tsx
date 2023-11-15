import { css } from '@emotion/react';

type InterviewAnswerType = {
  answer: string;
};

const InterviewAnswer: React.FC<InterviewAnswerType> = ({ answer }) => {
  return (
    <div
      css={css`
        display: 'flex';
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
  );
};
export default InterviewAnswer;
