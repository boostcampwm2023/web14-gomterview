import { theme } from '@/styles/theme';
import { css } from '@emotion/react';

export const selectionBox = css`
  ::before {
    content: '';
    position: absolute;
    background-color: ${theme.colors.point.primary.default};
  }
`;

export const selectionBoxDirection = {
  top: css`
    ::before {
      top: 0;
      left: 0;
      width: 100%;
      height: 0.4rem;
      border-radius: 0 0 0.2rem 0.2rem;
    }
  `,
  left: css`
    ::before {
      top: 0;
      left: 0;
      width: 0.4rem;
      height: 100%;
      border-radius: 0 0.2rem 0.2rem 0;
    }
  `,
  right: css`
    ::before {
      top: 0;
      right: 0;
      width: 0.4rem;
      height: 100%;
      border-radius: 0.2rem 0 0 0.2rem;
    }
  `,
  bottom: css`
    ::before {
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.4rem;
      border-radius: 0.2rem 0.2rem 0 0;
    }
  `,
} as const;
