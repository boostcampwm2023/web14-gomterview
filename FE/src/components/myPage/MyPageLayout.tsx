import Layout from '@components/layout/Layout';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import { Header } from '@components/layout';
import { MyPageHeader } from '@components/myPage/index';

type MyPageLayoutProps = {
  children: React.ReactNode;
};

const MyPageLayout: React.FC<MyPageLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <Layout
        direction="column"
        css={css`
          height: auto;
          padding: 1rem 0;
          row-gap: 1.5rem;

          @media (max-width: ${theme.breakpoints.tablet}) {
            padding: 1rem;
          }
        `}
      >
        <MyPageHeader />
        {children}
      </Layout>
    </div>
  );
};

export default MyPageLayout;
