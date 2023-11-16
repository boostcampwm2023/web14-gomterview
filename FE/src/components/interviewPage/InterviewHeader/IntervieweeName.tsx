import Typography from '@foundation/Typography/Typography';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';

type IntervieweeNameType = {
  intervieweeName: string;
};

const IntervieweeName: React.FC<IntervieweeNameType> = ({
  intervieweeName,
}) => {
  return (
    <div
      css={css`
        max-width: 37.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;

        @media (max-width: ${theme.breakpoints.tablet}) {
          width: 9.375rem;
        }
      `}
    >
      <Typography
        noWrap
        paragraph
        variant={'title4'}
        color={theme.colors.text.white}
      >
        {intervieweeName}
      </Typography>
    </div>
  );
};
export default IntervieweeName;
