import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';
import ProgressStepBarItem from './ProgressStepBarItem';

const ProgressStepBar = ({ children }: PropsWithChildren) => {
  return (
    <div
      css={css`
        display: flex;
        gap: 0.5rem;
      `}
    >
      {children}
    </div>
  );
};

ProgressStepBar.Item = ProgressStepBarItem;

export default ProgressStepBar;
