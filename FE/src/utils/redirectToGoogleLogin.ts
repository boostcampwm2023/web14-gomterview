import { API, BASE_URL } from '@constants/api';
import { PATH } from '@constants/path';
import { toast } from '@foundation/Toast/toast';

const redirectToGoogleLogin = async () => {
  if (process.env.NODE_ENV === 'development') {
    const { cookieGenerator } = await import('@/dev/cookieGenerator');
    void (await cookieGenerator());
    toast.success('개발 모드에서 로그인 되었습니다.', {
      position: 'bottomRight',
    });

    window.location.href = `${window.location.origin}${PATH.MYPAGE}`; // dev 모드에서만 사용
    return;
  }

  window.location.href = `${BASE_URL}${API.LOGIN}`;
};

export default redirectToGoogleLogin;
