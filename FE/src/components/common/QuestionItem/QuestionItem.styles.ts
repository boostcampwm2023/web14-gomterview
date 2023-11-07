import { css } from '@emotion/react';
import { theme } from '@styles/theme';

export const QuestionItemStyles = {
  default: css`
    background-color: ${theme.colors.surface.default};
    color: ${theme.colors.text.default};
  `,
  expanded: css`
    background-color: ${theme.colors.point.secondary.default};
    color: ${theme.colors.text.white};
  `,
};
