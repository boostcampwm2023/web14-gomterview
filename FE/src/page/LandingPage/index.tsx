import LandingPageLayout from '@/components/landingPage/LandingPageLayout';
import StartButton from '@components/landingPage/StartButton';
import WelcomeBlurb from '@components/landingPage/WelcomeBlurb';
import LandingImage from '@components/landingPage/LandingImage';
import GoogleLoginButton from '@components/landingPage/GoogleLoginButton';
import { css } from '@emotion/react';
import { API } from '@constants/api';

//TODO 로그인을 제외한 모든 api는 아직 MSW를 이용하고 있기 때문에 이곳에 임시로 정의했습니다.
const BASE_URL =
  'http://ec2-3-39-187-198.ap-northeast-2.compute.amazonaws.com:8080/api';

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
