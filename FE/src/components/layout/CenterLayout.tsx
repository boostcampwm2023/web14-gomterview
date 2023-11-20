import { PropsWithChildren } from 'react';
import { css } from '@emotion/react';

const CenterLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(60vh + 4.25rem);
        margin: auto;
      `}
    >
      {children}
    </div>
  );
};

export default CenterLayout;
