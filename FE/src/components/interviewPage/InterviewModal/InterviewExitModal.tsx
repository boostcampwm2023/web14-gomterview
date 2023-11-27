import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import { Typography, Modal, Button } from '@foundation/index';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@constants/path';
import useInterviewSettings from '@/hooks/atoms/useInterviewSettings';

type InterviewExitModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const InterviewExitModal: React.FC<InterviewExitModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const navigate = useNavigate();
  const { resetAllSettings } = useInterviewSettings();

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
            <Button
              onClick={() => {
                resetAllSettings();
                navigate(PATH.ROOT);
              }}
            >
              종료
            </Button>
          </div>
        </div>
      </Modal.content>
    </Modal>
  );
};

export default InterviewExitModal;
