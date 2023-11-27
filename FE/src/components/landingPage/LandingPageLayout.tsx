import Layout from '@components/layout/Layout';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import LandingPageHeader from './LandingPageHeader';

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
      <LandingPageHeader />
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
  @media (max-width: ${theme.breakpoints.laptop}) {
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
  @media (max-width: ${theme.breakpoints.tablet}) {
    > *:nth-child(3) {
      opacity: 20%;
    }
  }

  @media (max-width: ${theme.breakpoints.mobileL}) {
    justify-items: center;
    gap: 0;

    > *:nth-child(3) {
      align-self: center;
      justify-self: center;
    }
  }
`;

export default LandingPageLayout;
