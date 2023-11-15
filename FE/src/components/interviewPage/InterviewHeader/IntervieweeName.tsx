import Typography from '@foundation/Typography/Typography';
import { css } from '@emotion/react';

type IntervieweeNameType = {
  intervieweeName: string;
};

const IntervieweeName: React.FC<IntervieweeNameType> = ({
  intervieweeName,
}) => {
  return (
    <div
      css={css`
        max-width: 600px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;

        @media (max-width: 46rem) {
          width: 9.375rem;
        }
      `}
    >
      <Typography noWrap paragraph variant={'body1'} color="white">
        {intervieweeName}
      </Typography>
    </div>
  );
};
export default IntervieweeName;
