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
          padding: 1.5rem;
        `}
      >
        <Logo />
      </div>
      <Layout direction="column">{children}</Layout>
    </div>
  );
};

export default InterviewVideoPageLayout;
