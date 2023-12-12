import { useCallback } from 'react';

const useKakaoInAppBrowserDetect = () => {
  // 현재 사용자 에이전트를 확인하여 카카오톡 인앱 브라우저인지 여부를 반환합니다.
  const userAgent = navigator.userAgent.toLowerCase();
  const isKakaoInAppBrowser = userAgent.includes('kakaotalk');

  // 현재 페이지의 URL을 외부 브라우저를 통해 이동하는 함수입니다.
  const moveOtherBrowser = useCallback(() => {
    const currentUrl = window.location.href;
    if (isKakaoInAppBrowser) {
      // 카카오톡 인앱 브라우저의 경우, 카카오톡 외부 브라우저 스킴을 사용합니다.
      window.location.href =
        'kakaotalk://web/openExternal?url=' + encodeURIComponent(currentUrl);
    }
    // 카카오톡 인앱 브라우저가 아닌 경우는 별도의 처리가 필요 없으므로, 함수에서 아무 작업도 수행하지 않습니다.
  }, [isKakaoInAppBrowser]);

  return { isKakaoInAppBrowser, moveOtherBrowser };
};

export default useKakaoInAppBrowserDetect;
