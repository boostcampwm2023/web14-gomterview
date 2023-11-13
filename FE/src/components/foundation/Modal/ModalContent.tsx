import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';

const ModalContent: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      css={css`
        padding: 1rem;
      `}
    >
      {children}
    </div>
  );
};

export default ModalContent;
