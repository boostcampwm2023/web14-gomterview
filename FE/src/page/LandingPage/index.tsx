import LandingPageLayout from '@/components/landingPage/LandingPageLayout';
import StartButton from '@components/landingPage/StartButton';
import WelcomeBlurb from '@components/landingPage/WelcomeBlurb';
import LandingImage from '@components/landingPage/LandingImage';
import GoogleLoginButton from '@components/landingPage/GoogleLoginButton';
import { css } from '@emotion/react';
import { API, BASE_URL } from '@constants/api';

const LandingPage: React.FC = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${BASE_URL}${API.LOGIN}`;
  };

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
        <GoogleLoginButton onClick={handleGoogleLogin} />
      </div>
      <LandingImage />
    </LandingPageLayout>
  );
};

export default LandingPage;
