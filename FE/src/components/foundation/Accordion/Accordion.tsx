import React, { ReactNode, SyntheticEvent } from 'react';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import { HTMLElementTypes } from '@/types/utils';
import enhanceChildElement from '@/utils/enhanceChildElement';

type AccordionProps = {
  children: ReactNode[];
  expanded?: boolean;
  onChange: (event: SyntheticEvent, expanded: boolean) => void;
} & HTMLElementTypes<HTMLDivElement>;

export const Accordion: React.FC<AccordionProps> = ({
  children,
  expanded,
  onChange,
  ...args
}) => {
  return (
    <div
      onClick={(e) => onChange(e, !!expanded)}
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-self: stretch;
        border-radius: 0.625rem;
        box-shadow: ${expanded && theme.shadow.boxShadow};
        cursor: pointer;
        user-select: none;

        &:hover {
          box-shadow: ${theme.shadow.boxShadow};
        }
      `}
      {...args}
    >
      {enhanceChildElement({ children, newProps: { expanded: expanded } })}
    </div>
  );
};
