import React, { ReactNode } from 'react';
import { HTMLElementTypes } from '@/types/utils';
import { css } from '@emotion/react';
import { Button } from '@foundation/index';

type MenuItemProps = {
  children: ReactNode;
} & HTMLElementTypes<HTMLButtonElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const MenuItem: React.FC<MenuItemProps> = ({ children, ...args }) => {
  return (
    <Button
      variants="secondary"
      css={css`
        border: none;
        background-color: transparent;
      `}
      {...args}
    >
      {children}
    </Button>
  );
};

export default MenuItem;
