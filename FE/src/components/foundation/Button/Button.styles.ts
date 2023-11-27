import { theme } from '@styles/theme';
import { css } from '@emotion/react';

export const buttonSize = {
  sm: css`
    padding: 0.3rem 0.8rem;
    border-radius: 0.625rem;

    ${theme.typography.body3}
  `,
  md: css`
    padding: 0.5rem 1rem;
    border-radius: 0.8rem;

    ${theme.typography.body1}
  `,
  lg: css`
    padding: 0.7rem 1.2rem;
    border-radius: 1rem;
    ${theme.typography.title3}
  `,
};

export const buttonVariants = {
  primary: css`
    color: ${theme.colors.text.white};
    background-color: ${theme.colors.point.primary.default};
    outline: none;
    border: none;
    &:disabled {
      background-color: ${theme.colors.surface.weak};
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background-color: ${theme.colors.point.primary.hover};
    }
  `,
  secondary: css`
    color: ${theme.colors.text.default};
    background-color: ${theme.colors.surface.default};
    border: 1px solid ${theme.colors.border.default};

    &:disabled {
      background-color: ${theme.colors.surface.weakHover};
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background-color: ${theme.colors.surface.weak};
    }
  `,
};
