import { Link } from 'react-router-dom';
import { PATH } from '@constants/path';
import Button from '@foundation/Button/Button';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';

const InterviewStartButton: React.FC = () => {
  const data = useQueryClient().getQueryState(QUERY_KEY.MEMBER);

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
            box-shadow: ${theme.shadow.buttonLargeDefaultShadow};
            width: 100%;
            z-index: 2;

            &:hover {
              transform: translateY(0.25rem);
              box-shadow: ${theme.shadow.buttonLargeHoverShadow};
            }
          `}
        >
          {data ? '면접 연습 시작하기' : '비회원으로 시작하기'}
        </Button>
      </Link>
    </div>
  );
};
export default InterviewStartButton;
