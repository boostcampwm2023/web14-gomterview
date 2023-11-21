import { HTMLElementTypes } from '@/types/utils';
import React from 'react';
import Button from '@foundation/Button/Button';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';

type LightButtonProps = {
  size?: 'sm' | 'md' | 'lg';
} & HTMLElementTypes<HTMLButtonElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;
const LightButton: React.FC<LightButtonProps> = ({
  children,
  size = 'md',
  ...args
}) => {
  return (
    <Button
      size={size}
      {...args}
      css={css`
          color: ${theme.colors.text.default};
          border: 1px solid ${theme.colors.border.default};
          background-color: ${theme.colors.surface.default};
          outline: none;

          transition: background-color 0.15s ease-in-out;
          cursor: pointer;

          &:disabled {
            background-color: ${theme.colors.surface.weakHover};
            cursor: not-allowed;
          }

          &:not(:disabled):hover {
            background-color: ${theme.colors.surface.weak};
          `}
    >
      {children}
    </Button>
  );
};

export default LightButton;
