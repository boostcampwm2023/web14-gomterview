import { Interpolation, Theme } from '@emotion/react';

export type HTMLElementTypes<T> = React.ClassAttributes<T> &
  React.HTMLAttributes<T> & {
    css?: Interpolation<Theme>;
  };

export type FunctionParamsType<T> = T extends (...args: infer P) => unknown
  ? P
  : never;
