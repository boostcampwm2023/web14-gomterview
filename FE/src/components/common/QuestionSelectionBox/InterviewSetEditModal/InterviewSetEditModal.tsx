import { Modal } from '@foundation/index';
import { css } from '@emotion/react';
import InterviewSetForm from '@common/QuestionSelectionBox/InterviewSetEditModal/InterviewSetForm';

type InterviewSetEditModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  workbookId?: number;
};
const InterviewSetEditModal: React.FC<InterviewSetEditModalProps> = ({
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
        <InterviewSetForm workbookId={workbookId} closeModal={closeModal} />
      </div>
    </Modal>
  );
};

export default InterviewSetEditModal;
