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
          column-gap: 15rem;
          margin: auto;

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
