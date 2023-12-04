import React from 'react';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import { HTMLElementTypes } from '@/types/utils';

type MenuProps = {
  open: boolean;
  closeMenu: () => void;
  children: React.ReactNode;
} & HTMLElementTypes<HTMLDivElement>;
const Menu: React.FC<MenuProps> = ({ open, closeMenu, children, ...args }) => {
  if (!open) return null;

  return (
    <>
      <div
        onClick={closeMenu}
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100svh;
          z-index: 99;
        `}
        {...args}
      />
      <div
        onClick={closeMenu}
        css={css`
          position: absolute;
          top: 100%;
          display: flex;
          flex-direction: column;
          padding: 0.25rem 0;
          background-color: ${theme.colors.surface.default};
          border-radius: 0.5rem;
          z-index: 999;
        `}
      >
        {children}
      </div>
    </>
  );
};

export default Menu;
