import Layout from '../layout/Layout';
import { PropsWithChildren } from 'react';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';

const ErrorPageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Layout
      full
      direction="column"
      css={css`
        justify-content: center;
        align-items: center;
        row-gap: 1rem;
        background: ${theme.gradient.linear.skyblue};
      `}
    >
      {children}
    </Layout>
  );
};

export default ErrorPageLayout;
