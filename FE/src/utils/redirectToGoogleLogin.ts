import { API, BASE_URL } from '@constants/api';
import { PATH } from '@constants/path';

const redirectToGoogleLogin = async () => {
  if (process.env.NODE_ENV === 'development') {
    const { cookieGenerator } = await import('@/dev/cookieGenerator');
    void (await cookieGenerator());
    window.location.href = `${window.location.origin}${PATH.MYPAGE}`; // dev 모드에서만 사용
    return;
  }

  window.location.href = `${BASE_URL}${API.LOGIN}`;
};

export default redirectToGoogleLogin;
