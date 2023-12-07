import { css } from '@emotion/react';
import WorkbookEditForm from '@common/QuestionSelectionBox/WorkbookGeneratorModal/WorkbookEditForm';
import WorkbookAddForm from '@common/QuestionSelectionBox/WorkbookGeneratorModal/WorkbookAddForm';
import ModalHeader from '@foundation/Modal/ModalHeader';
import { Modal } from '@foundation/index';
import { theme } from '@styles/theme';

type WorkbookGeneratorModalProps = {
  closeModal: () => void;
  workbookId?: number;
};
const WorkbookGeneratorModal: React.FC<WorkbookGeneratorModalProps> = ({
  closeModal,
  workbookId,
}) => {
  return (
    <Modal
      isOpen
      closeModal={closeModal}
      css={css`
        width: 30rem;
        @media (max-width: ${theme.breakpoints.tablet}) {
          width: 25rem;
        }
        @media (max-width: ${theme.breakpoints.mobileL}) {
          width: 100%;
          margin: 0 0.5rem;
        }
      `}
    >
      <ModalHeader closeModal={closeModal}>
        {workbookId !== undefined ? '면접 세트 수정' : '새 면접 세트'}
      </ModalHeader>
      <div
        css={css`
          max-height: 80vh;
          padding: 1.5rem;
        `}
      >
        {workbookId !== undefined ? (
          <WorkbookEditForm workbookId={workbookId} closeModal={closeModal} />
        ) : (
          <WorkbookAddForm closeModal={closeModal} />
        )}
      </div>
    </Modal>
  );
};

export default WorkbookGeneratorModal;
