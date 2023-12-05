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
    <div>
      <Header />
      <Layout
        direction="column"
        full
        css={css`
          align-items: center;
          row-gap: 1rem;
          margin-top: 5rem;
          min-height: auto;
        `}
      >
        {children}
      </Layout>
    </div>
  );
};

export default InterviewVideoPageLayout;
