import Modal from '@foundation/Modal';
import React from 'react';
import Typography from '@foundation/Typography/Typography';
import Button from '@foundation/Button/Button';
import LightButton from '@common/LightButton/LightButton';
import { css } from '@emotion/react';

type DeleteCheckModalProps = {
  isOpen: boolean;
  content: string;
  closeModal: () => void;
  confirmModal: () => void;
};
const DeleteCheckModal: React.FC<DeleteCheckModalProps> = ({
  isOpen,
  content,
  closeModal,
  confirmModal,
}) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
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
          <LightButton onClick={closeModal}>취소</LightButton>
          <Button onClick={confirmModal}>확인</Button>
        </div>
      </Modal.footer>
    </Modal>
  );
};

export default DeleteCheckModal;
