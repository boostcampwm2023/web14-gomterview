import { FC, ReactNode } from 'react';
import { css } from '@emotion/react';
import { HTMLElementTypes } from '@/types/utils';
import { theme } from '@styles/theme';

type AccordionDetailsProps = {
  children: ReactNode;
  expanded?: boolean;
} & HTMLElementTypes<HTMLDivElement>;

export const AccordionDetails: FC<AccordionDetailsProps> = ({
  children,
  expanded,
  ...args
}) => {
  return (
    expanded && (
      <div
        css={css`
          display: flex;
          align-items: center;
          column-gap: 1rem;
          padding: 0.5rem;
          border-radius: 0 0 0.625rem 0.625rem;
          color: ${theme.colors.text.default};
          background-color: ${theme.colors.surface.default};
        `}
        {...args}
      >
        {children}
      </div>
    )
  );
};
