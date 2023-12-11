import { StartButton } from '@common/index';
import {
  GoogleLoginButton,
  LandingImage,
  LandingPageLayout,
  WelcomeBlurb,
} from '@components/landingPage';
import { css } from '@emotion/react';
import useMedia from '@hooks/useMedia';
import { useEffect } from 'react';

const LandingPage: React.FC = () => {
  const { media, stopMedia } = useMedia();

  useEffect(() => {
    if (media) stopMedia();
  }, [media, stopMedia]);

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
