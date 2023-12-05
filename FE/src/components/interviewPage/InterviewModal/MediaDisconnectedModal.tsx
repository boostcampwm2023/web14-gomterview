import { css } from '@emotion/react';
import { theme } from '@styles/theme';

import { Typography, Modal, Button } from '@foundation/index';

type MediaDisconnectedModalProps = {
  closeModal: () => void;
};

const MediaDisconnectedModal: React.FC<MediaDisconnectedModalProps> = ({
  closeModal,
}) => {
  return (
    <Modal isOpen closeModal={closeModal}>
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
            현재 브라우저에 카메라 및 마이크가 연결되지 않았습니다.
          </Typography>
          <Typography
            paragraph
            variant="body1"
            color={theme.colors.text.default}
          >
            카메라 및 마이크의 접근 권한의 재설정 후 서비스를 이용하실 수
            있습니다.
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

export default MediaDisconnectedModal;
