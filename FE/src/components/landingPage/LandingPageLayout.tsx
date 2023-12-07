import { Header } from '@components/layout';
import Layout from '@components/layout/Layout';
import { css } from '@emotion/react';
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
        background: ${theme.gradient.linear.skyblue};
      `}
    >
      <Header />
      <div
        css={[
          css`
            display: grid;
            grid-template-columns: auto auto;
            grid-template-rows: 2fr 1fr;
            justify-content: space-evenly;
            justify-items: start;
            align-items: center;
            gap: 2rem;
            padding: 2rem;
            margin: auto 0;
            div:nth-of-type(2) {
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
  @media (max-width: ${theme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
    justify-items: start;

    h3:nth-of-type(1) {
      grid-area: 1 / 1 / 1 / 2;
    }

    div:nth-of-type(1) {
      grid-area: 2 / 1 / 2 / 2;
    }

    div:nth-of-type(2) {
      grid-area: 1 / 1 / 3 / 3;
    }
  }
  @media (max-width: ${theme.breakpoints.tablet}) {
    div:nth-of-type(2) {
      opacity: 20%;
    }
  }

  @media (max-width: ${theme.breakpoints.mobileL}) {
    justify-items: center;
    gap: 0;

    div:nth-of-type(2) {
      align-self: center;
      justify-self: center;
    }
  }
`;

export default LandingPageLayout;
