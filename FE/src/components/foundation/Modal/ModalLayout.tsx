import React from 'react';
import Box from '../Box/Box';
import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import { HTMLElementTypes } from '@/types/utils';

export type ModalLayoutProps = {
  children?: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
} & HTMLElementTypes<HTMLDivElement>;

const ModalLayout: React.FC<ModalLayoutProps> = ({
  children,
  isOpen,
  closeModal,
  ...args
}) => {
  document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  return (
    <div
      css={css`
        position: fixed;
        display: ${isOpen ? 'flex' : 'none'};
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        z-index: ${theme.zIndex.modal.backdrop};
        width: 100%;
        height: 100%;
        background-color: ${theme.colors.shadow.modalShadow};
        ${theme.typography.body1}
      `}
      onClick={() => {
        closeModal();
      }}
      {...args}
    >
      <Box
        css={css`
          z-index: ${theme.zIndex.modal.content};
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
