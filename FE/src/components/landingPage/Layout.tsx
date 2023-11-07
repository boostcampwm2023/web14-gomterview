import Layout from '@/layout/Layout';

type LandingPageLayoutProps = {
  children: React.ReactNode;
};

const LandingPageLayout: React.FC<LandingPageLayoutProps> = ({ children }) => {
  return (
    <Layout full direction="row">
      {children}
    </Layout>
  );
};

export default LandingPageLayout;
