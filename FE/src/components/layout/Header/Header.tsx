import { Logo } from '@common/index';
import { css } from '@emotion/react';
import SideMenu from '@components/layout/Header/SideMenu';
import Navigations from '@components/layout/Header/Navigations';
import useBreakpoint from '@hooks/useBreakPoint';

const Header: React.FC = () => {
  const isDeviceBreakpoint = useBreakpoint();

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
        z-index: 999;
        background-color: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(10px); /* 10px 블러 효과 */
      `}
    >
      <Logo />
      {isDeviceBreakpoint('tablet') ? (
        <SideMenu>
          <Navigations />
        </SideMenu>
      ) : (
        <div>
          <Navigations />
        </div>
      )}
    </div>
  );
};

export default Header;
