import React, { useEffect, useState } from 'react';
import Box from '../Box/Box';
import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import { HTMLElementTypes } from '@/types/utils';

export type ModalLayoutProps = {
  children?: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
} & HTMLElementTypes<HTMLDivElement>;

export const ModalLayout: React.FC<ModalLayoutProps> = ({
  children,
  isOpen,
  closeModal,
  ...args
}) => {
  const [isDisplayed, setIsDisplayed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsDisplayed(true);
    } else {
      setIsDisplayed(false);
    }
  }, [isOpen]);

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
        opacity: ${isDisplayed ? '1' : '0'};
        transition: opacity 0.2s ease-out;
      `}
      onClick={() => {
        closeModal();
      }}
    >
      <Box
        css={css`
          z-index: ${theme.zIndex.modal.content};
          background-color: ${theme.colors.text.white};
          height: auto;
          width: auto;
          transform: ${isDisplayed ? 'scale(1)' : 'scale(0.5)'};
          transition: transform 0.2s ease-out;
        `}
        onClick={(e) => e.stopPropagation()}
        {...args}
      >
        {children}
      </Box>
    </div>
  );
};

export default ModalLayout;
