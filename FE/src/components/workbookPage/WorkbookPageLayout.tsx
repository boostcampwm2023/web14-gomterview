import { Header } from '@components/layout';
import Layout from '@components/layout/Layout';
import { css } from '@emotion/react';

type WorkbookPageLayoutProps = {
  children: React.ReactNode;
};

const WorkbookPageLayout: React.FC<WorkbookPageLayoutProps> = ({
  children,
}) => {
  return (
    <>
      <Header />
      <Layout
        direction="column"
        css={css`
          position: relative;
          height: auto;
          padding: 1rem;
          row-gap: 1.5rem;
        `}
      >
        {children}
      </Layout>
    </>
  );
};

export default WorkbookPageLayout;
