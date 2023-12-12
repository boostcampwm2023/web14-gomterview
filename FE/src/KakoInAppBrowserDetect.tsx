import { PropsWithChildren } from 'react';
import useKakaoInAppBrowserDetect from '@hooks/useKakaoInAppBrowserDetect';
import { useEffect } from 'react';
import { Button, Typography } from '@foundation/index';
import { css } from '@emotion/react';
import LandingBear from '@assets/images/landing-bear.png';

const KakaoInAppBrowserDetect: React.FC<PropsWithChildren> = ({ children }) => {
  const { isKakaoInAppBrowser, moveOtherBrowser } =
    useKakaoInAppBrowserDetect();

  useEffect(() => {
    if (isKakaoInAppBrowser) moveOtherBrowser();
  }, [isKakaoInAppBrowser, moveOtherBrowser]);

  if (isKakaoInAppBrowser)
    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        `}
      >
        <img
          src={LandingBear}
          alt={'노트북을 하는 곰돌이의 뒷모습'}
          css={css`
            max-height: 50vh;
            margin: 5rem 0rem;
          `}
        />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
          `}
        >
          <Typography variant="body3">
            현재 카카카오 인앱 브라우저로 접속하셨어요🥲
          </Typography>
          <Typography variant="body3">
            아쉽지만 곰터뷰는 카카오 브라우저에서 완벽한 서비스를 제공하지
            못하고 있어요😂
          </Typography>
          <Typography
            variant="body3"
            css={css`
              margin-bottom: 5rem;
            `}
          >
            아래의 버튼을 클릭하셔서 다른 브라우저에서 곰터뷰를 이용해주세요!
          </Typography>
        </div>
        <Button size="lg" onClick={moveOtherBrowser}>
          곰터뷰 열기
        </Button>
      </div>
    );
  else return <>{children}</>;
};

export default KakaoInAppBrowserDetect;
