import { Logo } from '@common/index';
import { css } from '@emotion/react';
import NavigationMenu from '@components/layout/Header/NavigationMenu';
import { theme } from '@styles/theme';
import Navigations from '@components/layout/Header/Navigations';

const Header: React.FC = () => {
  return (
    <div
      css={css`
        position: sticky;
        top: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.5rem;
        z-index: ${theme.zIndex.header.content};
        background-color: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(10px); /* 10px 블러 효과 */
      `}
    >
      <Logo />
      <div
        css={css`
          display: none;
          @media (max-width: ${theme.breakpoints.tablet}) {
            display: block;
          }
        `}
      >
        <NavigationMenu>
          <Navigations />
        </NavigationMenu>
      </div>
      <div
        css={css`
          display: none;
          @media (min-width: ${theme.breakpoints.tablet}) {
            display: block;
          }
        `}
      >
        <Navigations />
      </div>
    </div>
  );
};

export default Header;
