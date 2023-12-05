import { Modal } from '@foundation/index';
import { css } from '@emotion/react';
import WorkbookEditForm from '@common/QuestionSelectionBox/WorkbookGeneratorModal/WorkbookEditForm';
import WorkbookAddForm from '@common/QuestionSelectionBox/WorkbookGeneratorModal/WorkbookAddForm';

type InterviewSetGeneratorModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  workbookId?: number;
};
const WorkbookGeneratorModal: React.FC<InterviewSetGeneratorModalProps> = ({
  isOpen,
  closeModal,
  workbookId,
}) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Modal.header>새 면접 세트</Modal.header>
      <div
        css={css`
          min-width: 40vw;
          max-width: 40rem;
          width: 100%;
          max-height: 80vh;
          padding: 1.5rem;
        `}
      >
        {workbookId ? (
          <WorkbookEditForm workbookId={workbookId} closeModal={closeModal} />
        ) : (
          <WorkbookAddForm closeModal={closeModal} />
        )}
      </div>
    </Modal>
  );
};

export default WorkbookGeneratorModal;
