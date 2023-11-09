import LandingPageLayout from '@/components/landingPage/Layout';
import SideBackground from '@/components/landingPage/SideBackground';
import Intro from '@components/landingPage/StartButton';
import WelcomeBlurb from '@components/landingPage/WelcomeBlurb';

const RenderingPage: React.FC = () => {
  return (
    <LandingPageLayout>
      <WelcomeBlurb />
      <Intro />
      <SideBackground />
    </LandingPageLayout>
  );
};

export default RenderingPage;
