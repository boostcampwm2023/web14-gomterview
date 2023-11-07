import { theme } from '@/styles/theme';
import { css } from '@emotion/react';

export const buttonSize = {
  sm: css`
    padding: 0.3rem 0.8rem;
    border-radius: 0.625rem;

    ${theme.typography.body3}
  `,
  md: css`
    padding: 0.5rem 1rem;
    border-radius: 0.8rem 1rem;

    ${theme.typography.body1}
  `,
  lg: css`
    padding: 0.7rem 1.2rem;
    border-radius: 1rem;
    ${theme.typography.title2}
  `,
};
