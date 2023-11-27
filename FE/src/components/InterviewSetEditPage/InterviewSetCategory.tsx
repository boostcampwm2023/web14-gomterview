import { css } from '@emotion/react';
import { Typography } from '@foundation/index';

const InterviewSetCategory: React.FC = () => {
  const categoryList = ['FE', 'BE', 'CS', 'Android', 'iOS', 'Android'];
  return (
    <div
      css={css`
        display: flex;
        column-gap: 1rem;
        padding-left: 0.25rem;
      `}
    >
      {categoryList.map((category, index) => (
        <Typography key={index} variant="title4">
          {category}
        </Typography>
      ))}
    </div>
  );
};

export default InterviewSetCategory;
