import { css } from '@emotion/react';
import { theme } from '@styles/theme';

import { Typography, Modal, Button } from '@foundation/index';

type InterviewTimeOverModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const InterviewTimeOverModal: React.FC<InterviewTimeOverModalProps> = ({
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
            3분의 시간이 모두 소진되어
          </Typography>
          <Typography
            paragraph
            variant="body1"
            color={theme.colors.text.default}
          >
            면접을 종료합니다.
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

export default InterviewTimeOverModal;
