import { Link } from 'react-router-dom';
import { PATH } from '@constants/path';
import Button from '@foundation/Button/Button';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';

type StartButton = {
  text?: string;
};

const InterviewStartButton: React.FC<StartButton> = ({
  text = '비회원으로 시작하기',
}) => {
  // 로그인 여부에 따라 버튼의 문구가 달라집니다.
  return (
    <div>
      <Link to={PATH.INTERVIEW_SETTING}>
        <Button
          size="lg"
          css={css`
            position: relative;
            padding: 1.5rem 3rem;
            border-radius: 3.125rem;
            background: ${theme.gradient.linear.blue};
            box-shadow: ${theme.shadow.buttonLargeShadow(10)};
            z-index: 2;

            &:hover {
              transform: translateY(4px);
              box-shadow: ${theme.shadow.buttonLargeShadow(6)};
            }
          `}
        >
          {text}
        </Button>
      </Link>
    </div>
  );
};
export default InterviewStartButton;
