import Layout from '@/components/layout/Layout';
import { css } from '@emotion/react';

type MyPageLayoutProps = {
  children: React.ReactNode;
};

const MyPageLayout: React.FC<MyPageLayoutProps> = ({ children }) => {
  return (
    <Layout
      direction="column"
      css={css`
        padding: 1rem 0;
        row-gap: 1.5rem;
      `}
    >
      {children}
    </Layout>
  );
};

export default MyPageLayout;
