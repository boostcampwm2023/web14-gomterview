import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import { Typography } from '@foundation/index';
import { CategoryListResDto } from '@/types/category';

type WorkbookCategoryProps = {
  categories?: CategoryListResDto;
  selectedCategoryIndex: number;
  onClick: (index: number) => void;
};
const WorkbookCategory: React.FC<WorkbookCategoryProps> = ({
  categories,
  selectedCategoryIndex,
  onClick,
}) => {
  return (
    <div
      css={css`
        display: flex;
        column-gap: 1rem;
        padding-left: 0.25rem;
        cursor: pointer;
      `}
    >
      {categories?.map(({ id, name }, index) => (
        <Typography
          key={id}
          variant="title4"
          onClick={() => onClick(index)}
          color={
            selectedCategoryIndex === index
              ? theme.colors.text.default
              : theme.colors.text.subStrong
          }
        >
          {name}
        </Typography>
      ))}
    </div>
  );
};

export default WorkbookCategory;
