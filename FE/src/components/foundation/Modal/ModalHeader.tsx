import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import CloseIcon from '@assets/svg/close.svg';

type ModalHeaderProps = {
  children?: React.ReactNode;
  closeButtonVisible?: boolean;
};

const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  closeButtonVisible = true,
}) => {
  return (
    <div
      css={css`
        display: flex;
        position: relative;
        padding: 1rem;
        color: ${theme.colors.text.white};
        background-color: ${theme.colors.point.secondary.default};
        border-radius: 1rem 1rem 0rem 0rem;
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
          css={css`
            margin-left: 0.5rem;
            cursor: pointer;
          `}
        />
      )}
    </div>
  );
};

export default ModalHeader;
