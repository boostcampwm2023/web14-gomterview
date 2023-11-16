import { css } from '@emotion/react';

type CardCoverProps = {
  children: React.ReactNode;
  borderRadius: string;
};

const CardCover: React.FC<CardCoverProps> = ({ children, borderRadius }) => {
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
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: ${borderRadius};
          z-index: 1;
        }
      `}
    >
      {children}
    </div>
  );
};

export default CardCover;
