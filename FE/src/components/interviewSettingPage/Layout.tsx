import Layout from '@/components/layout/Layout';

type InterviewSettingPageLayoutProps = {
  children: React.ReactNode;
};

const InterviewSettingPageLayout: React.FC<InterviewSettingPageLayoutProps> = ({
  children,
}) => {
  return <Layout direction="column">{children}</Layout>;
};

export default InterviewSettingPageLayout;
