import Layout from '@/components/layout/Layout';
import { css } from '@emotion/react';
import { Header } from '@components/layout';

type InterviewSettingPageLayoutProps = {
  children: React.ReactNode;
};

const InterviewSettingPageLayout: React.FC<InterviewSettingPageLayoutProps> = ({
  children,
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100svh;
      `}
    >
      <Header />
      <Layout
        direction="column"
        css={css`
          flex-grow: 1;
          row-gap: 1.5rem;
          padding: 1rem 1rem 0 1rem;
          width: 100%;
          height: auto;
        `}
      >
        {children}
      </Layout>
    </div>
  );
};

export default InterviewSettingPageLayout;
