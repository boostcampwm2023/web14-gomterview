import { css } from '@emotion/react';
import { HTMLElementTypes } from '@/types/utils';
import { theme } from '@styles/theme';

type CardCoverProps = {
  children: React.ReactNode;
  borderRadius: string;
} & HTMLElementTypes<HTMLDivElement>;

const CardCover: React.FC<CardCoverProps> = ({
  children,
  borderRadius,
  ...args
}) => {
  return (
    <div
      css={css`
        position: relative;
        display: inline-block;

        &:hover::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: ${borderRadius};
          z-index: ${theme.zIndex.contentOverlay.overlay1};
        }
      `}
      {...args}
    >
      {children}
    </div>
  );
};

export default CardCover;
