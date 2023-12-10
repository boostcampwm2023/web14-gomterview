import React from 'react';
import { css } from '@emotion/react';
import { HTMLElementTypes } from '@/types/utils';
import { buttonSize, buttonVariants } from '@foundation/Button/Button.styles';

type ButtonProps = {
  size?: keyof typeof buttonSize;
  variants?: keyof typeof buttonVariants;
  visible?: boolean;
} & HTMLElementTypes<HTMLButtonElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  size = 'md',
  variants = 'primary',
  visible = true,
  ...args
}) => {
  if (!visible) return null;
  return (
    <button
      css={[
        css`
          transition: background-color 0.15s ease-in-out;
          cursor: pointer;
        `,
        buttonSize[size],
        buttonVariants[variants],
      ]}
      {...args}
    >
      {children}
    </button>
  );
};

// css in js 로 변경

export default Button;
