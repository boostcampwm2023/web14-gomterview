import { css, keyframes } from '@emotion/react';
import logo from '@assets/images/logo.png';

const LoadingBounce = () => {
  const bounce = keyframes`
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-4rem); /* 공이 최대 높이까지 튀어오르는 지점 */
    }
  `;
  return (
    <img
      src={logo}
      alt={'곰돌이 로고'}
      css={css`
        width: 50px;
        height: 50px;
        animation: ${bounce} 1.3s infinite;
        animation-timing-function: ease-in-out;
      `}
    />
  );
};

export default LoadingBounce;
