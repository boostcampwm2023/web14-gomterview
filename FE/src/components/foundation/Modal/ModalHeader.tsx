import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import CloseIcon from '@assets/svg/close.svg';

export type ModalHeaderProps = {
  children?: React.ReactNode;
  closeButtonVisible?: boolean;
  closeModal?: () => void;
};

const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  closeButtonVisible = true,
  closeModal,
}) => {
  return (
    <div
      css={css`
        display: flex;
        position: relative;
        padding: 1rem;
        gap: 0.5rem;
        color: ${theme.colors.text.white};
        background-color: ${theme.colors.point.secondary.default};
        border-radius: 1rem 1rem 0rem 0rem;
        margin: -0.0625rem;
      `}
    >
      <div
        css={css`
          flex: 1;
        `}
      >
        {children}
      </div>
      {closeButtonVisible && (
        <CloseIcon
          width="0.75rem"
          height="auto"
          css={css`
            cursor: pointer;
          `}
          onClick={() => {
            closeModal && closeModal();
          }}
        />
      )}
    </div>
  );
};

export default ModalHeader;
