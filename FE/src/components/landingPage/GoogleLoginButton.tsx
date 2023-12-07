import { HTMLElementTypes } from '@/types/utils';
import redirectToGoogleLogin from '@/utils/redirectToGoogleLogin';
import { css } from '@emotion/react';
import { Icon, Typography } from '@foundation/index';
import useUserInfo from '@hooks/useUserInfo';
import { theme } from '@styles/theme';

type GoogleLoginButtonProps = HTMLElementTypes<HTMLButtonElement>;

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ ...args }) => {
  const userInfo = useUserInfo();

  if (userInfo) return null;

  return (
    <button
      onClick={() => void redirectToGoogleLogin()}
      css={css`
        display: flex;
        align-items: center;
        column-gap: 0.75rem;
        padding: 1.5rem 3rem;
        border-radius: 3.125rem;
        border: 0.0625rem solid ${theme.colors.border.default};
        transition: transform 0.15s ease-in-out;
        background-color: ${theme.colors.surface.default};
        z-index: ${theme.zIndex.contentOverlay.overlay5};

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
  );
};

export default GoogleLoginButton;
