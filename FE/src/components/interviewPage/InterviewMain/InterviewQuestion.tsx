import { Typography } from '@foundation/index';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';
type InterviewQuestionProps = {
  question: string;
};

const InterviewQuestion: React.FC<InterviewQuestionProps> = ({ question }) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 3.125rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: ${theme.zIndex.contentOverlay.overlay5};
        width: 62.5rem;
        height: 5rem;
        background-color: ${theme.colors.surface.black100};
        opacity: 60%;
        border-radius: 0rem 0rem 2rem 2rem;

        @media (max-width: ${theme.breakpoints.laptop}) {
          width: 80%;
        }

        @media (max-width: ${theme.breakpoints.mobileL}) {
          width: 90%;
        }
      `}
    >
      <Typography
        noWrap
        paragraph
        variant={'title4'}
        color={theme.colors.text.white}
      >
        {question}
      </Typography>
    </div>
  );
};
export default InterviewQuestion;
