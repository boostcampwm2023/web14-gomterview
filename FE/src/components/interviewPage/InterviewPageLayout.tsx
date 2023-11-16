import Layout from '@/components/layout/Layout';
import { css } from '@emotion/react';

type InterviewPageLayoutProps = {
  children: React.ReactNode;
};

const InterviewPageLayout: React.FC<InterviewPageLayoutProps> = ({
  children,
}) => {
  return (
    <Layout full direction="column">
      <div
        css={css`
          width: 100vw;
          height: 100vh;
          position: fixed;
          z-index: -100;
          background-color: black;
        `}
      />
      {children}
    </Layout>
  );
};

export default InterviewPageLayout;
