import Layout from '@/components/layout/Layout';
import { Logo } from '@common/index';
import { css } from '@emotion/react';

type InterviewVideoPublicPageLayoutProps = {
  children: React.ReactNode;
};

const InterviewVideoPublicPageLayout: React.FC<
  InterviewVideoPublicPageLayoutProps
> = ({ children }) => {
  return (
    <div>
      <div
        css={css`
          display: flex;
          padding: 2rem;
        `}
      >
        <Logo />
      </div>
      <Layout
        direction="column"
        full
        css={css`
          align-items: center;
          row-gap: 1rem;
          padding: 1rem;
          min-height: auto;
        `}
      >
        {children}
      </Layout>
    </div>
  );
};

export default InterviewVideoPublicPageLayout;
