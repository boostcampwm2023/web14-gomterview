import { css } from '@emotion/react';
import Modal from '@foundation/Modal';
import { Typography, Button } from '@foundation/index';

type DeleteCheckModalProps = {
  content: string;
  closeModal: () => void;
  confirmModal: () => void;
};
const DeleteCheckModal: React.FC<DeleteCheckModalProps> = ({
  content,
  closeModal,
  confirmModal,
}) => {
  return (
    <Modal isOpen={true} closeModal={closeModal}>
      <Modal.content>
        <Typography variant="title4">{content}</Typography>
      </Modal.content>
      <Modal.footer>
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            column-gap: 0.5rem;
          `}
        >
          <Button variants="secondary" onClick={closeModal}>
            취소
          </Button>
          <Button onClick={confirmModal}>확인</Button>
        </div>
      </Modal.footer>
    </Modal>
  );
};

export default DeleteCheckModal;
