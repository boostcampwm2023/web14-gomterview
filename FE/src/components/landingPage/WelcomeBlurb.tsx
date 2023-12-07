import { css, keyframes } from '@emotion/react';
import { Typography } from '@foundation/index';

const WelcomeBlurb: React.FC = () => {
  return (
    <Typography
      paragraph
      component="h3"
      variant={'title3'}
      css={css`
        font-size: 3rem;
        line-height: 4rem;
        animation: ${fadeInUp} 1.5s ease forwards;
      `}
    >
      로그인 없는
      <br />
      간편한 면접 서비스
      <br />
      곰터뷰
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
