import { css } from '@emotion/react';
import Logo from '@common/Logo/Logo';

const Header: React.FC = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
      `}
    >
      <Logo />
      <button>구글로 시작하기</button>
    </div>
  );
};

export default Header;
