import { css } from '@emotion/react';
import { Typography } from '@foundation/index';
import useCategoryQuery from '@hooks/apis/queries/useCategoryQuery';
import { theme } from '@styles/theme';

type InterviewSetCategoryProps = {
  selectedId: number;
  onClick: (id: number) => void;
};
const InterviewSetCategory: React.FC<InterviewSetCategoryProps> = ({
  selectedId,
  onClick,
}) => {
  const { data } = useCategoryQuery();
  return (
    <div
      css={css`
        display: flex;
        column-gap: 1rem;
        padding-left: 0.25rem;
        cursor: pointer;
      `}
    >
      {data?.map(({ id, name }) => (
        <Typography
          key={id}
          variant="title4"
          color={
            selectedId === id
              ? theme.colors.text.default
              : theme.colors.text.subStrong
          }
          onClick={() => onClick(id)}
        >
          {name}
        </Typography>
      ))}
    </div>
  );
};

export default InterviewSetCategory;
