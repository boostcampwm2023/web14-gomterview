import { StartButton } from '@common/index';
import {
  GoogleLoginButton,
  LandingImage,
  LandingPageLayout,
  WelcomeBlurb,
} from '@components/landingPage';
import { css } from '@emotion/react';

const LandingPage: React.FC = () => {
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

export default LandingPage;
