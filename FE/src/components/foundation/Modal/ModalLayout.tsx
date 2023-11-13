import React, { PropsWithChildren } from 'react';
import Box from '../Box/Box';
import { css } from '@emotion/react';
import { theme } from '@/styles/theme';

const ModalLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        background-color: ${theme.colors.shadow.modalShadow};
      `}
    >
      <Box
        css={css`
          z-index: 101;
          background-color: ${theme.colors.text.white};
          height: auto;
          width: auto;
        `}
      >
        {children}
      </Box>
    </div>
  );
};

export default ModalLayout;
