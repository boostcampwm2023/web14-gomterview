import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import Icon from '@foundation/Icon/Icon';

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
        border-radius: 1rem 1rem 0 0;
        margin: -0.0625rem 0;
        align-items: baseline;
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
        <Icon
          id="close"
          width="0.75rem"
          height="0.75rem"
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
