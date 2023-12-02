import { Modal } from '@foundation/index';
import { css } from '@emotion/react';
import InterviewSetEditForm from '@common/QuestionSelectionBox/InterviewSetGeneratorModal/InterviewSetEditForm';
import InterviewSetAddForm from '@common/QuestionSelectionBox/InterviewSetGeneratorModal/InterviewSetAddForm';

type InterviewSetGeneratorModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  workbookId?: number;
};
const InterviewSetGeneratorModal: React.FC<InterviewSetGeneratorModalProps> = ({
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
          <InterviewSetEditForm
            workbookId={workbookId}
            closeModal={closeModal}
          />
        ) : (
          <InterviewSetAddForm closeModal={closeModal} />
        )}
      </div>
    </Modal>
  );
};

export default InterviewSetGeneratorModal;
