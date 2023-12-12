import React, { PropsWithChildren, useState } from 'react';
import { css, keyframes } from '@emotion/react';
import { Button, Icon, Menu } from '@foundation/index';
import { theme } from '@styles/theme';

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

const NavigationMenu: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button
        variants="secondary"
        onClick={() => setIsOpen(true)}
        css={css`
          display: flex;
          align-items: center;
          border: none;
          border-radius: 2rem;
        `}
      >
        <Icon id="menu" width="32" height="32" />
      </Button>
      <Menu
        open={isOpen}
        closeMenu={() => setIsOpen(false)}
        backdropColor={theme.colors.backdrop.default}
        css={css`
          right: 0.25rem;
          margin-top: -3rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          animation: ${dropDown} 300ms ease-out;
        `}
      >
        {children}
      </Menu>
    </div>
  );
};

export default NavigationMenu;
