import { theme } from '@styles/theme';
import { HTMLElementTypes } from '@/types/utils';
import { css } from '@emotion/react';
import React from 'react';

type BoxProps = HTMLElementTypes<HTMLDivElement>;

const Box: React.FC<BoxProps> = ({ children, ...args }) => {
  return (
    <div
      css={css`
        border-radius: 1rem;
        box-shadow: ${theme.shadow.boxShadow};
        width: 100%;
        height: 100%;
      `}
      {...args}
    >
      {children}
    </div>
  );
};

export default Box;
