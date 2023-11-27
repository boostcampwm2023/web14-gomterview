import { css } from '@emotion/react';
import { theme } from '@styles/theme';

import { useNavigate } from 'react-router-dom';
import { PATH } from '@constants/path';
import Confetti from 'react-confetti';
import useWindowSize from '@/hooks/useWindowSize';
import useUserInfo from '@hooks/useUserInfo';
import { Typography, Modal, Button } from '@foundation/index';

type InterviewFinishModalProps = {
  isOpen: boolean;
};

const InterviewFinishModal: React.FC<InterviewFinishModalProps> = ({
  isOpen,
}) => {
  const navigate = useNavigate();
  const isLogin = useUserInfo();
  const windowSize = useWindowSize();
  //TOOD 인터뷰 끝났을 때 전역 상태 날리는 로직 추가하기

  return (
    <>
      <Modal
        isOpen={isOpen}
        closeModal={() => {
          if (isLogin) navigate(PATH.MYPAGE);
          else navigate(PATH.ROOT);
        }}
      >
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
