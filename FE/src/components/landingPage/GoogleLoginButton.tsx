import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import Typography from '@foundation/Typography/Typography';
import Icon from '@foundation/Icon/Icon';
import { HTMLElementTypes } from '@/types/utils';
import useUserInfo from '@hooks/useUserInfo';
import { API, BASE_URL } from '@constants/api';
import cookieGenerator from '@/dev/cookieGenerator';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@constants/path';

type GoogleLoginButtonProps = HTMLElementTypes<HTMLButtonElement>;

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ ...args }) => {
  const userInfo = useUserInfo();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    if (process.env.NODE_ENV === 'development') {
      await cookieGenerator().then((_) => navigate(PATH.MYPAGE));
      return;
    }

    window.location.href = `${BASE_URL}${API.LOGIN}`;
  };

  return (
    !userInfo && (
      <button
        onClick={() => handleGoogleLogin()}
        css={css`
          display: flex;
          align-items: center;
          column-gap: 0.75rem;
          padding: 1.5rem 3rem;
          border-radius: 3.125rem;
          border: 0.0625rem solid ${theme.colors.border.default};
          transition: transform 0.15s ease-in-out;
          background-color: ${theme.colors.surface.default};
          z-index: 1000;

          &:hover {
            transform: translateY(-0.25rem);
          }
        `}
        {...args}
      >
        <Icon id="google-logo" width="1.25rem" height="1.25rem" />
        <Typography variant="title3" color={theme.colors.text.default}>
          Google로 시작하기
        </Typography>
      </button>
    )
  );
};

export default GoogleLoginButton;
