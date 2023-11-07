import { Interpolation, Theme } from '@emotion/react';

export type HTMLElementTypes<T> = React.ClassAttributes<T> &
  React.HTMLAttributes<T> & {
    css?: Interpolation<Theme>;
  };
