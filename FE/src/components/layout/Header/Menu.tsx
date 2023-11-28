import { css } from '@emotion/react';
import MenuList from './MenuList';
import useBreakpoint from '@hooks/useBreakPoint';
import SideMenu from './SideMenu';

const Menu = () => {
  const isDeviceBreakpoint = useBreakpoint();

  return (
    <div
      css={css`
        display: flex;
        gap: 1rem;
      `}
    >
      {isDeviceBreakpoint('tablet') ? (
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
