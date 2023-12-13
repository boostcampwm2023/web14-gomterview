import Box from '../Box/Box';
import { css, keyframes } from '@emotion/react';
import { theme } from '@/styles/theme';
import { HTMLElementTypes } from '@/types/utils';

export type ModalLayoutProps = {
  children?: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
} & HTMLElementTypes<HTMLDivElement>;

const ModalAnimation = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const ModalLayout: React.FC<ModalLayoutProps> = ({
  children,
  isOpen,
  closeModal,
  ...args
}) => {
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
    >
      <Box
        css={css`
          z-index: ${theme.zIndex.modal.content};
          background-color: ${theme.colors.text.white};
          height: auto;
          width: auto;
          animation: 0.2s ease-in-out ${ModalAnimation};
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
