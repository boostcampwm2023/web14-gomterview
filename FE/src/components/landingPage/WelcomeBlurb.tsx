import Typography from '@foundation/Typography/Typography';
import { css, keyframes } from '@emotion/react';

const WelcomeBlurb: React.FC = () => {
  return (
    <Typography
      paragraph
      variant={'title3'}
      css={css`
        font-size: 3rem;
        line-height: 4rem;
        animation: ${fadeInUp} 1.5s ease forwards;
      `}
    >
      {`로그인 없는 
간편한 면접 서비스
곰터뷰`}
    </Typography>
  );
};

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(1.25rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default WelcomeBlurb;
