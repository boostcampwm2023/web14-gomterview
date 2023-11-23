import { css } from '@emotion/react';
import { theme } from '@styles/theme';
type InterviewAnswerType = {
  answer: string;
};
import Typography from '@/components/foundation/Typography/Typography';
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
        background-color: ${theme.colors.surface.black100};
        color: ${theme.colors.text.white};
        opacity: 60%;
        border-radius: 2rem 2rem 0rem 0rem;
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
