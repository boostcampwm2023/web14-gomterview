import React, { useState } from 'react';
import { css, keyframes } from '@emotion/react';
import { theme } from '@styles/theme';
import { Icon } from '@foundation/index';

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

  const toggleMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div
        onClick={toggleMenu}
        css={css`
          display: flex;
          justify-content: flex-start;
          align-items: center;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 2rem;
          :hover {
            background-color: ${theme.colors.surface.weak};
          }
        `}
      >
        {!isOpen && <Icon id="menu" width="40px" height="40px" />}
      </div>
      {isOpen && (
        <>
          <div
            css={css`
              position: absolute;
              top: 40px;
              right: 0;
              background-color: ${theme.colors.surface.default};
              border: 1px solid #ddd;
              border-radius: 4px;
              padding: 8px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
              animation: ${dropDown} 300ms ease-out;
              z-index: 999;
            `}
          >
            {children}
          </div>
          <div
            onClick={closeMenu}
            css={css`
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.5);
              z-index: 990;
            `}
          />
        </>
      )}
    </div>
  );
};

export default SideMenu;
