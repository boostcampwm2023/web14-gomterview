import { css } from '@emotion/react';
import Header from '@components/landingPage/Header';
import Layout from '@components/layout/Layout';

type LandingPageLayoutProps = {
  children: React.ReactNode;
};

const LandingPageLayout: React.FC<LandingPageLayoutProps> = ({ children }) => {
  return (
    <Layout full direction="column">
      <Header />
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 2fr;
          grid-template-rows: 3fr 1fr;
          justify-items: center;
          gap: 1rem;

          > *:nth-child(3) {
            grid-area: 1 / 2 / 3 / 3;
          }
        `}
      >
        {children}
      </div>
    </Layout>
  );
};

export default LandingPageLayout;
