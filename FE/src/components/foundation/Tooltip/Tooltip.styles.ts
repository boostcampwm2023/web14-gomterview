import { css } from '@emotion/react';

export const positionStyles = {
  top: css`
    &:hover > :first-child {
      top: 0;
      left: 50%;
      transform: translate(-50%, -100%);
      margin-top: -0.5rem;
    }
  `,
  bottom: css`
    &:hover > :first-child {
      top: 100%;
      left: 50%;
      transform: translate(-50%, 0);
      margin-top: 0.5rem;
    }
  `,
  left: css`
    &:hover > :first-child {
      top: 50%;
      left: 0;
      transform: translate(-100%, -50%);
      margin-left: -0.5rem;
    }
  `,
  right: css`
    &:hover > :first-child {
      top: 50%;
      left: 100%;
      transform: translate(0, -50%);
      margin-left: 0.5rem;
    }
  `,
} as const;
