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
    <div>
      <Header />
      <Layout
        direction="column"
        css={css`
          row-gap: 1rem;
          padding: 1rem;
          height: auto;
        `}
      >
        {children}
      </Layout>
    </div>
  );
};

export default InterviewSettingPageLayout;
