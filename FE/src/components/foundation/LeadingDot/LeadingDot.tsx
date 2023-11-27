import { FC, ReactNode } from 'react';
import { css } from '@emotion/react';

type LeadingDotProps = {
  children: ReactNode;
  color?: string;
  gap?: string;
  size?: string;
};

const LeadingDot: FC<LeadingDotProps> = ({
  children,
  color = '#76d773',
  gap = '0.5rem',
  size = '0.5rem',
}) => {
  return (
    <div
      css={css`
        display: flex;
        position: relative;
        padding-left: calc(${size} + ${gap});
        overflow: hidden;

        &:before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: ${size};
          height: ${size};
          background-color: ${color};
          border-radius: 50%;
        }
      `}
    >
      {children}
    </div>
  );
};

export default LeadingDot;
