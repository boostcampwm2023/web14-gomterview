import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import { Typography, Modal, Button } from '@foundation/index';
import redirectToGoogleLogin from '@/utils/redirectToGoogleLogin';

type RequestLoginModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const RequestLoginModal: React.FC<RequestLoginModalProps> = ({
  isOpen,
  closeModal,
}) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Modal.content>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            width: 17.5rem;
            padding: 0.3125rem;
          `}
        >
          <Typography variant="body1" color={theme.colors.text.default}>
            해당 작업은 로그인이 필요합니다 😂
          </Typography>
          <Typography variant="body1" color={theme.colors.text.default}>
            로그인을 하시면 곰터뷰의 다양한 기능들을 이용하실 수 있습니다 😉
          </Typography>

          <div
            css={css`
              display: flex;
              justify-content: space-between;
              margin-top: 1.25rem;
            `}
          >
            <Button variants="secondary" onClick={closeModal}>
              취소
            </Button>
            <Button
              onClick={() => {
                void redirectToGoogleLogin();
              }}
            >
              구글 로그인
            </Button>
          </div>
        </div>
      </Modal.content>
    </Modal>
  );
};

export default RequestLoginModal;
