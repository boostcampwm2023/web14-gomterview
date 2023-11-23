import Layout from '@/components/layout/Layout';
import { css } from '@emotion/react';

type InterviewSettingPageLayoutProps = {
  children: React.ReactNode;
};

const InterviewSettingPageLayout: React.FC<InterviewSettingPageLayoutProps> = ({
  children,
}) => {
  return (
    <Layout
      direction="column"
      css={css`
        padding: 0 1rem 1rem 1rem;
        height: auto;
      `}
    >
      {children}
    </Layout>
  );
};

export default InterviewSettingPageLayout;
