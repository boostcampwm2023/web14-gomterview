import LandingPageLayout from '@/components/landingPage/Layout';
import SideBackground from '@/components/landingPage/SideBackground';
import Intro from '@/components/landingPage/Intro';

const RenderingPage: React.FC = () => {
  return (
    <LandingPageLayout>
      <SideBackground />
      <Intro />
    </LandingPageLayout>
  );
};

export default RenderingPage;
