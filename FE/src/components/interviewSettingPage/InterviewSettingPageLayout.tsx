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
        padding-bottom: 1rem;
      `}
    >
      {children}
    </Layout>
  );
};

export default InterviewSettingPageLayout;
