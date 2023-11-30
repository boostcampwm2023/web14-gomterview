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
    <Layout
      direction="column"
      css={css`
        position: relative;
        height: auto;
        padding: 1rem 0;
        row-gap: 1.5rem;
        @media (max-width: ${theme.breakpoints.tablet}) {
          padding: 1rem;
        }
      `}
    >
      {children}
    </Layout>
  );
};

export default WorkbookPageLayout;
