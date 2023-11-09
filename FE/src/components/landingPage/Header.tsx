import { css } from '@emotion/react';

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
      <div>로고 들어갈 자리</div>
      <button>구글로 시작하기</button>
    </div>
  );
};

export default Header;
