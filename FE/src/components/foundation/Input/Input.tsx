import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import { HTMLElementTypes } from '@/types/utils';
import React from 'react';

type InputProps = HTMLElementTypes<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ ...args }) => {
  return (
    <input
      type="text"
      css={css`
        padding: 1rem;
        border: 0.0625rem solid ${theme.colors.border.default};
        border-radius: 1rem;
        width: 100%;
      `}
      {...args}
    />
  );
};

export default Input;
