import Typography from '@/components/foundation/Typography/Typography';
import { theme } from '@/styles/theme';
import { HTMLElementTypes } from '@/types/utils';
import { css } from '@emotion/react';

type ProgressStepBarItemProps = {
  name?: string;
  isCompleted?: boolean;
} & HTMLElementTypes<HTMLDivElement>;

const ProgressStepBarItem: React.FC<ProgressStepBarItemProps> = ({
  name,
  isCompleted,
}) => {
  return (
    <div
      css={css`
        width: 100%;
        text-align: center;
      `}
    >
      <div
        css={css`
          height: 0.625rem;
          border-radius: 1.25rem;
          background-color: ${isCompleted
            ? theme.colors.point.primary.default
            : theme.colors.surface.weak};
          margin-bottom: 1rem;
        `}
      ></div>
      <Typography>{name}</Typography>
    </div>
  );
};

export default ProgressStepBarItem;
