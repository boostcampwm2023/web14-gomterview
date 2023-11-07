import React, { ElementType, ReactNode } from 'react';
import { css, Theme } from '@emotion/react';
import { theme } from '@styles/theme';

type Props = {
  component?: ElementType;
  variant?: keyof Theme['typography'];
  noWrap?: boolean;
  paragraph?: boolean;
  color?: string;
  children: ReactNode;
};

export const Typography: React.FC<Props> = ({
  component,
  variant = 'body1',
  noWrap,
  paragraph,
  color,
  children,
}) => {
  const Component = component || (paragraph ? 'p' : 'span');

  return (
    <Component
      css={[
        css`
          position: relative;
          text-align: left;
          color: ${color};
          ${noWrap &&
          `
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          `}
        `,
        theme.typography[variant],
      ]}
    >
      {children}
    </Component>
  );
};
