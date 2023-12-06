import { Header, Layout } from '@components/layout';
import { css } from '@emotion/react';
import React, { PropsWithChildren } from 'react';

const InterviewWorkbookDetailPageLayout: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <div>
      <Header />
      <Layout
        direction="column"
        css={css`
          padding: 1rem;
        `}
      >
        {children}
      </Layout>
    </div>
  );
};

export default InterviewWorkbookDetailPageLayout;
