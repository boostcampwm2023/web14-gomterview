import { Header } from '@components/layout';
import Layout from '@components/layout/Layout';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';

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
          padding: 5rem 0;
          row-gap: 1.5rem;
          @media (max-width: ${theme.breakpoints.tablet}) {
            padding: 1rem;
          }
        `}
      >
        {children}
      </Layout>
    </>
  );
};

export default WorkbookPageLayout;
