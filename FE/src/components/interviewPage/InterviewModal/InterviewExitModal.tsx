import Modal from '@foundation/Modal';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import Typography from '@foundation/Typography/Typography';
import Button from '@foundation/Button/Button';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@constants/path';

type InterviewExitModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const InterviewExitModal: React.FC<InterviewExitModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Modal.content>
        <div
          css={css`
            width: 12.5rem;
          `}
        >
          <Typography variant="title4" color={theme.colors.text.default}>
            면접을 종료하시겠습니까?
          </Typography>
          <div
            css={css`
              display: flex;
              justify-content: end;
              margin-top: 1.25rem;
            `}
          >
            <Button onClick={() => navigate(PATH.ROOT)}>종료</Button>
          </div>
        </div>
      </Modal.content>
    </Modal>
  );
};

export default InterviewExitModal;
