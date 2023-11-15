import Typography from '@foundation/Typography/Typography';
import { css } from '@emotion/react';

type InterviewQuestionType = {
  question: string;
};

const InterviewQuestion: React.FC<InterviewQuestionType> = ({ question }) => {
  return (
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
      <Typography noWrap paragraph variant={'title4'} color="white">
        {question}
      </Typography>
    </div>
  );
};
export default InterviewQuestion;
