import { Logo } from '@common/index';
import { css } from '@emotion/react';
import Menu from './Header/Menu';

const Header: React.FC = () => {
  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.5rem;
        z-index: 999;
        background-color: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(10px); /* 10px 블러 효과 */
      `}
    >
      <Logo />
      <Menu />
    </div>
  );
};

export default Header;
