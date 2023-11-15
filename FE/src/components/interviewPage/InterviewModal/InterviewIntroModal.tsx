import Modal from '@foundation/Modal';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import Typography from '@foundation/Typography/Typography';
import Button from '@foundation/Button/Button';

type InterviewIntroModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const InterviewIntroModal: React.FC<InterviewIntroModalProps> = ({
  isOpen,
  closeModal,
}) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Modal.content>
        <div
          css={css`
            width: 15rem;
          `}
        >
          <Typography
            paragraph
            variant="body1"
            color={theme.colors.text.default}
          >
            모의 면접을 시작합니다.
          </Typography>
          <Typography variant="body1" color={theme.colors.text.default}>
            하단의 녹화시작 버튼을 통해서 면접을 시작합니다.
          </Typography>
          <div
            css={css`
              display: flex;
              justify-content: end;
              margin-top: 1.25rem;
            `}
          >
            <Button onClick={closeModal}>확인</Button>
          </div>
        </div>
      </Modal.content>
    </Modal>
  );
};

export default InterviewIntroModal;
