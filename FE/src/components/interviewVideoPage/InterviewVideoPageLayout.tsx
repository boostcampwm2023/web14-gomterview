import Layout from '@/components/layout/Layout';
import Logo from '@common/Logo/Logo';
import { css } from '@emotion/react';

type InterviewVideoPageLayoutProps = {
  children: React.ReactNode;
};

const InterviewVideoPageLayout: React.FC<InterviewVideoPageLayoutProps> = ({
  children,
}) => {
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
          min-height: auto;
        `}
      >
        {children}
      </Layout>
    </div>
  );
};

export default InterviewVideoPageLayout;
