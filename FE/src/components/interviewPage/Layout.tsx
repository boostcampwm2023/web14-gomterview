import Layout from '@/layout/Layout';

type InterviewPageLayoutProps = {
  children: React.ReactNode;
};

const InterviewPageLayout: React.FC<InterviewPageLayoutProps> = ({
  children,
}) => {
  return (
    <Layout full direction="column">
      {children}
    </Layout>
  );
};

export default InterviewPageLayout;
