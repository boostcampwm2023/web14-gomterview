import { css, keyframes } from '@emotion/react';
import { theme } from '@styles/theme';
import React from 'react';
import { Typography } from '..';
import { positionStyles } from './Tooltip.styles';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

type TooltipProps = {
  children: React.ReactNode;
  title: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
};

const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  position = 'top',
}) => {
  return (
    <div
      css={[
        css`
          position: relative;

          &:hover > :first-child {
            position: absolute;
            padding: 0.3rem 0.5rem;
            background-color: ${theme.colors.surface.tooltip};

            color: ${theme.colors.text.white};
            border-radius: 0.5rem;
            display: block;
          }
        `,
        positionStyles[position],
      ]}
    >
      <Typography
        variant="body3"
        noWrap
        css={css`
          display: none;
          animation: ${fadeIn} 0.2s linear;
        `}
      >
        {title}
      </Typography>
      {children}
    </div>
  );
};

export default Tooltip;
