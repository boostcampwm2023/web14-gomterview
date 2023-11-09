import LandingPageLayout from '@/components/landingPage/Layout';
import SideBackground from '@/components/landingPage/SideBackground';
import Intro from '@/components/landingPage/Intro';
import Header from '@components/landingPage/Header';

const RenderingPage: React.FC = () => {
  return (
    <LandingPageLayout>
      <Header />
      <SideBackground />
      <Intro />
    </LandingPageLayout>
  );
};

export default RenderingPage;
