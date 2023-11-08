import Layout from '@/components/layout/Layout';

type MyPageLayoutProps = {
  children: React.ReactNode;
};

const MyPageLayout: React.FC<MyPageLayoutProps> = ({ children }) => {
  return <Layout direction="column">{children}</Layout>;
};

export default MyPageLayout;
