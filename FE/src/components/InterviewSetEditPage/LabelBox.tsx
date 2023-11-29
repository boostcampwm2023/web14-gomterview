import React from 'react';
import { css } from '@emotion/react';
import { Typography } from '@foundation/index';
import { theme } from '@styles/theme';

type LabelBoxProps = {
  children: React.ReactNode;
  labelName: string;
};

const LabelBox: React.FC<LabelBoxProps> = ({ children, labelName }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 0.25rem;
      `}
    >
      <Typography
        component="label"
        variant="captionWeak"
        color={theme.colors.text.subStrong}
        css={css`
          padding-left: 0.25rem;
        `}
      >
        {labelName}
      </Typography>
      {children}
    </div>
  );
};

export default LabelBox;
