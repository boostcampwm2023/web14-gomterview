import React, { useState } from 'react';
import { css, keyframes } from '@emotion/react';
import { Button, Icon, Menu } from '@foundation/index';

const dropDown = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

type SideMenuProps = {
  children: React.ReactNode;
};

const SideMenu: React.FC<SideMenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button
        variants="secondary"
        onClick={() => setIsOpen(true)}
        css={css`
          border: none;
          border-radius: 2rem;
        `}
      >
        <Icon id="menu" width="40" height="40" />
      </Button>
      <Menu
        open={isOpen}
        closeMenu={() => setIsOpen(false)}
        css={css`
          right: 0.25rem;
          margin-top: -3rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          animation: ${dropDown} 300ms ease-out;
          z-index: 999;
        `}
      >
        {children}
      </Menu>
    </div>
  );
};

export default SideMenu;
