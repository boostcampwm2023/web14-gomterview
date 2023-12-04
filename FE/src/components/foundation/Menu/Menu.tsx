import { css } from '@emotion/react';
import React, { useEffect } from 'react';
import { theme } from '@styles/theme';

type MenuProps = {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
};
const Menu: React.FC<MenuProps> = ({ open, onClose, children }) => {
  useEffect(() => {
    onClose?.();
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div
      css={css`
        position: absolute;
        top: 100%;
        display: flex;
        flex-direction: column;
        padding: 0.25rem 0;
        background-color: ${theme.colors.surface.default};
        border-radius: 0.5rem;
        z-index: 99;
      `}
    >
      {children}
    </div>
  );
};

export default Menu;
