import { Modal } from '@foundation/index';
import { css } from '@emotion/react';
import InterviewSetForm from '@common/QuestionSelectionBox/InterviewSetEditModal/InterviewSetForm';
import InterviewSetQuestionList from '@common/QuestionSelectionBox/InterviewSetEditModal/InterviewSetQuestionList';

type InterviewSetEditModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  workbookId: number;
};
const InterviewSetEditModal: React.FC<InterviewSetEditModalProps> = ({
  isOpen,
  closeModal,
  workbookId,
}) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Modal.header>면접 세트 편집하기</Modal.header>
      <div
        css={css`
          min-width: 40vw;
          max-width: 40rem;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          padding: 1rem;
        `}
      >
        <InterviewSetForm workbookId={workbookId} />
        <InterviewSetQuestionList workbookId={workbookId} />
      </div>
    </Modal>
  );
};

export default InterviewSetEditModal;
