import Layout from '@components/layout/Layout';
import { css } from '@emotion/react';
import { Header } from '@components/layout';

type InterviewVideoPageLayoutProps = {
  children: React.ReactNode;
};

const InterviewVideoPageLayout: React.FC<InterviewVideoPageLayoutProps> = ({
  children,
}) => {
  return (
    <Layout
      direction="column"
      full
      css={css`
        align-items: center;
        row-gap: 1rem;
        min-height: auto;
        height: auto;
      `}
    >
      <Header />
      {children}
    </Layout>
  );
};

export default InterviewVideoPageLayout;
