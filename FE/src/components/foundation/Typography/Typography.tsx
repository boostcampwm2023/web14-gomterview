import React, { ElementType, ReactNode } from 'react';
import { css, Theme } from '@emotion/react';
import { theme } from '@styles/theme';
import { HTMLElementTypes } from '@/types/utils';

type Props = {
  component?: ElementType;
  variant?: keyof Theme['typography'];
  noWrap?: boolean;
  paragraph?: boolean;
  color?: string;
  children: ReactNode;
} & HTMLElementTypes<HTMLDivElement>;

const Typography: React.FC<Props> = ({
  component,
  variant = 'body1',
  noWrap,
  paragraph,
  color,
  children,
  ...args
}) => {
  const Component = component || (paragraph ? 'pre' : 'span');

  return (
    <Component
      css={[
        css`
          position: relative;
          text-align: left;
          color: ${color};
          line-height: 1.6;
          white-space: pre-wrap;
          ${noWrap &&
          `
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          `}
        `,
        theme.typography[variant],
      ]}
      {...args}
    >
      {children}
    </Component>
  );
};

export default Typography;
