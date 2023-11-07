import React from 'react';
import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import { HTMLElementTypes } from '@/types/utils';
import { buttonSize } from '@components/Button/Button.styles';

type ButtonProps = {
  size?: 'sm' | 'md' | 'lg';
} & HTMLElementTypes<HTMLButtonElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, size = 'md', ...args }) => {
  return (
    <button
      css={[
        css`
          color: ${theme.colors.text.white};
          background-color: ${theme.colors.point.primary.default};
          outline: none;
          border: none;

          transition: background-color 0.15s ease-in-out;
          cursor: pointer;

          &:disabled {
            background-color: ${theme.colors.surface.weak};
            cursor: not-allowed;
          }

          &:not(:disabled):hover {
            background-color: ${theme.colors.point.primary.hover};
          }
        `,
        buttonSize[size],
      ]}
      {...args}
    >
      {children}
    </button>
  );
};

// css in js 로 변경

export default Button;
