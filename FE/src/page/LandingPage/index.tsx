import LandingPageLayout from '@/components/landingPage/Layout';
import StartButton from '@components/landingPage/StartButton';
import WelcomeBlurb from '@components/landingPage/WelcomeBlurb';
import LandingImage from '@components/landingPage/LandingImage';

const RenderingPage: React.FC = () => {
  return (
    <LandingPageLayout>
      <WelcomeBlurb />
      <StartButton />
      <LandingImage />
    </LandingPageLayout>
  );
};

export default RenderingPage;
