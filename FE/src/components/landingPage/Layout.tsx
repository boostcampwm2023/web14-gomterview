import { css } from '@emotion/react';
import Header from '@components/landingPage/Header';
import Layout from '@components/layout/Layout';
import { theme } from '@styles/theme';

type LandingPageLayoutProps = {
  children: React.ReactNode;
};

const LandingPageLayout: React.FC<LandingPageLayoutProps> = ({ children }) => {
  return (
    <Layout
      full
      direction="column"
      css={css`
        padding: 1rem;
        row-gap: 10rem;
        background: ${theme.gradient.linear.skyblue};
      `}
    >
      <Header />
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 2fr;
          grid-template-rows: 3fr 1fr;
          justify-items: center;
          align-items: center;
          gap: 1rem;
          margin: 0 auto;
          max-width: 70rem;

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
