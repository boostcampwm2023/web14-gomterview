import Modal from '@foundation/Modal';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import Typography from '@foundation/Typography/Typography';
import Button from '@foundation/Button/Button';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@constants/path';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';

type InterviewFinishModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const InterviewFinishModal: React.FC<InterviewFinishModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const navigate = useNavigate();

  const isLogin = useQueryClient().getQueryState(QUERY_KEY.MEMBER);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    let timeoutId: number | undefined;

    const handleResize = () => {
      window.clearTimeout(timeoutId);

      timeoutId = window.setTimeout(() => {
        console.log({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        {isOpen && (
          <Confetti width={windowSize.width} height={windowSize.height} />
        )}
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
              모든 면접이 종료되었습니다.
            </Typography>
            <Typography
              paragraph
              variant="body1"
              color={theme.colors.text.default}
            >
              정말 수고하셨습니다😊
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
                  if (isLogin) navigate(PATH.MYPAGE);
                  else navigate(PATH.ROOT);
                }}
              >
                확인
              </Button>
            </div>
          </div>
        </Modal.content>
      </Modal>
    </>
  );
};

export default InterviewFinishModal;
