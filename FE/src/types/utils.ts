import { Interpolation, Theme } from '@emotion/react';

export type HTMLElementTypes<T> = React.ClassAttributes<T> &
  React.HTMLAttributes<T> & {
    css?: Interpolation<Theme>;
  };

export type ExcludeArray<T> = T extends Array<infer U> ? U : T;
