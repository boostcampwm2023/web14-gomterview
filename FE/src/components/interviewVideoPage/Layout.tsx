import Layout from '@/layout/Layout';

type InterviewVideoPageLayoutProps = {
  children: React.ReactNode;
};

const InterviewVideoPageLayout: React.FC<InterviewVideoPageLayoutProps> = ({
  children,
}) => {
  return <Layout direction="column">{children}</Layout>;
};

export default InterviewVideoPageLayout;
