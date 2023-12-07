import { css } from '@emotion/react';
import { theme } from '@styles/theme';

import { Typography } from '@foundation/index';

type InterviewAnswerProps = {
  answer: string;
};

const InterviewAnswer: React.FC<InterviewAnswerProps> = ({ answer }) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: ${theme.zIndex.contentOverlay.overlay5};
        width: 62.5rem;
        height: 11.5rem;
        background-color: ${theme.colors.surface.black100};
        color: ${theme.colors.text.white};
        opacity: 60%;
        border-radius: 2rem 2rem 0 0;
        padding: 1.25rem;

        @media (max-width: ${theme.breakpoints.laptop}) {
          width: 80%;
        }

        @media (max-width: ${theme.breakpoints.mobileL}) {
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
        <Typography>{answer}</Typography>
      </div>
    </div>
  );
};
export default InterviewAnswer;
