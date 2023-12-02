import { Logo } from '@common/index';
import { css } from '@emotion/react';
import Menu from './Header/Menu';
import { theme } from '@styles/theme';

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
        padding: 2rem;
        z-index: 999;
        background-color: ${theme.colors.surface.default};
      `}
    >
      <Logo />
      <Menu />
    </div>
  );
};

export default Header;
