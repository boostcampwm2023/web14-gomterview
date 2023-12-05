import { css } from '@emotion/react';
import WorkbookEditForm from '@common/QuestionSelectionBox/WorkbookGeneratorModal/WorkbookEditForm';
import WorkbookAddForm from '@common/QuestionSelectionBox/WorkbookGeneratorModal/WorkbookAddForm';
import ModalHeader from '@foundation/Modal/ModalHeader';
import { Modal } from '@foundation/index';

type InterviewSetGeneratorModalProps = {
  closeModal: () => void;
  workbookId?: number;
};
const WorkbookGeneratorModal: React.FC<InterviewSetGeneratorModalProps> = ({
  closeModal,
  workbookId,
}) => {
  return (
    <Modal isOpen closeModal={closeModal}>
      <ModalHeader closeModal={closeModal}>새 면접 세트</ModalHeader>
      <div
        css={css`
          min-width: 40vw;
          max-width: 40rem;
          width: 100%;
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
