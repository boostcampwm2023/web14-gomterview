import { css } from '@emotion/react';
import MenuList from './MenuList';
import useBreakpoint from '@hooks/useBreakPoint';
import SideMenu from './SideMenu';

const Menu = () => {
  const breakPoint = useBreakpoint();

  const isSideMenuOpen = () => {
    return (
      breakPoint === 'mobileXS' ||
      breakPoint === 'mobileS' ||
      breakPoint === 'mobileM' ||
      breakPoint === 'mobileL' ||
      breakPoint === 'tablet'
    );
  };
  return (
    <div
      css={css`
        display: flex;
        gap: 1rem;
      `}
    >
      {isSideMenuOpen() ? (
        <SideMenu>
          <MenuList />
        </SideMenu>
      ) : (
        <MenuList />
      )}
    </div>
  );
};

export default Menu;
