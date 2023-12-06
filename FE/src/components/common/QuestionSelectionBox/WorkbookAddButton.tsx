import { theme } from '@styles/theme';
import { Button, Icon, Typography } from '@foundation/index';
import WorkbookGeneratorModal from '@common/QuestionSelectionBox/WorkbookGeneratorModal/WorkbookGeneratorModal';
import useModal from '@hooks/useModal';
import { css } from '@emotion/react';

const WorkbookAddButton: React.FC = () => {
  const { openModal, closeModal } = useModal(() => {
    return <WorkbookGeneratorModal closeModal={closeModal} />;
  });

  return (
    <Button
      size="md"
      variants="secondary"
      onClick={openModal}
      css={css`
        display: flex;
        align-items: center;
        column-gap: 0.5rem;
        align-self: center;
        background-color: ${theme.colors.surface.inner};
        border: none;
      `}
    >
      <Icon id="plus" width="1.5rem" height="1.5rem" />
      <Typography variant="body1" color={theme.colors.text.subStrong}>
        새 면접세트 추가
      </Typography>
    </Button>
  );
};

export default WorkbookAddButton;
