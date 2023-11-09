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
        css={[
          css`
            display: grid;
            grid-template-columns: auto auto;
            grid-template-rows: 3fr 1fr;
            justify-content: space-evenly;
            justify-items: center;
            align-items: center;
            gap: 2rem;
            padding: 2rem;
            margin: auto 0;

            > *:nth-child(3) {
              grid-area: 1 / 2 / 3 / 3;
            }
          `,
          LandingPageResponsiveStyles,
        ]}
      >
        {children}
      </div>
    </Layout>
  );
};

const LandingPageResponsiveStyles = css`
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    justify-items: start;

    > *:nth-child(1) {
      grid-area: 1 / 1 / 1 / 2;
    }

    > *:nth-child(2) {
      grid-area: 2 / 1 / 2 / 2;
    }

    > *:nth-child(3) {
      grid-area: 1 / 1 / 3 / 3;
    }
  }

  @media (max-width: 576px) {
    justify-items: center;
    > *:nth-child(3) {
      display: none;
    }
  }
`;

export default LandingPageLayout;
