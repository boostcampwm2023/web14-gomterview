import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import { Box, Button, Icon, Typography } from '@foundation/index';

type WorkbookEditModeDialogProps = {
  count: number;
  onCancelClick: () => void;
  onDeleteClick: () => void;
};
const WorkbookEditModeDialog: React.FC<WorkbookEditModeDialogProps> = ({
  count,
  onCancelClick,
  onDeleteClick,
}) => {
  return (
    <Box
      css={css`
        position: absolute;
        bottom: 4rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        gap: 0.5rem;
        align-self: center;
        padding: 0.5rem 1rem;
        margin: 0 0.5rem;
        width: auto;
        height: auto;
        border-radius: 1rem;
        background-color: ${theme.colors.surface.default};
        z-index: ${theme.zIndex.contentOverlay.overlay5};
      `}
    >
      <Button
        size="sm"
        variants="secondary"
        onClick={onCancelClick}
        css={css`
          flex-grow: 1;
          border: none;
          padding-bottom: 0.25rem;
        `}
      >
        <Icon id="close-black" width="12" height="12" />
      </Button>
      <Typography
        variant="body1"
        css={css`
          @media (max-width: ${theme.breakpoints.mobile}) {
            width: 100%;
            text-align: center;
            order: -1;
          }
        `}
      >
        {count}개 체크함
      </Typography>
      <Button
        size="sm"
        variants="secondary"
        onClick={onDeleteClick}
        css={css`
          flex-grow: 1;
          border: none;
          padding-bottom: 0.125rem;
        `}
      >
        <Icon id="trash" width="16" height="16" />
      </Button>
    </Box>
  );
};

export default WorkbookEditModeDialog;
