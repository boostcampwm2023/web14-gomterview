import { Link } from 'react-router-dom';
import { PATH } from '@constants/path';
import Button from '@foundation/Button/Button';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import { Tooltip } from '@foundation/index';
import useUserInfo from '@hooks/useUserInfo';

const InterviewStartButton: React.FC = () => {
  const data = useUserInfo();

  return (
    <div>
      <Link to={PATH.INTERVIEW_SETTING}>
        <Tooltip title="원하는 질문을 선택해 면접을 연습해보세요">
          <Button
            size="lg"
            css={css`
              position: relative;
              padding: 1.5rem 3rem;
              border-radius: 3.125rem;
              background: ${theme.gradient.linear.blue};
              box-shadow: ${theme.shadow.buttonLargeDefaultShadow};
              width: 100%;
              z-index: ${theme.zIndex.contentOverlay.overlay5};

              &:hover {
                transform: translateY(0.25rem);
                box-shadow: ${theme.shadow.buttonLargeHoverShadow};
              }
            `}
          >
            {data ? '면접 연습 시작하기' : '비회원으로 시작하기'}
          </Button>
        </Tooltip>
      </Link>
    </div>
  );
};
export default InterviewStartButton;
