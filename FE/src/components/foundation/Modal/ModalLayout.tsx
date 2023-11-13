import React from 'react';
import Box from '../Box/Box';
import { css } from '@emotion/react';
import { theme } from '@/styles/theme';

export type ModalLayoutProps = {
  children?: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
};

const ModalLayout: React.FC<ModalLayoutProps> = ({
  children,
  isOpen,
  closeModal,
}) => {
  return (
    <div
      css={css`
        display: ${isOpen ? 'flex' : 'none'};
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        background-color: ${theme.colors.shadow.modalShadow};
        ${theme.typography.body1}
      `}
      onClick={() => {
        closeModal();
      }}
    >
      <Box
        css={css`
          z-index: 101;
          background-color: ${theme.colors.text.white};
          height: auto;
          width: auto;
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </Box>
    </div>
  );
};

export default ModalLayout;
