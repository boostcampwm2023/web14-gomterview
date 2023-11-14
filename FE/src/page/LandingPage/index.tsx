import LandingPageLayout from '@/components/landingPage/LandingPageLayout';
import StartButton from '@components/landingPage/StartButton';
import WelcomeBlurb from '@components/landingPage/WelcomeBlurb';
import LandingImage from '@components/landingPage/LandingImage';
import GoogleLoginButton from '@components/landingPage/GoogleLoginButton';
import { css } from '@emotion/react';

const RenderingPage: React.FC = () => {
  return (
    <LandingPageLayout>
      <WelcomeBlurb />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          row-gap: 2rem;
        `}
      >
        <StartButton />
        <GoogleLoginButton />
      </div>
      <LandingImage />
    </LandingPageLayout>
  );
};

export default RenderingPage;
