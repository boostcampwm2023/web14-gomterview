import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import Typography from '@foundation/Typography/Typography';
import Icon from '@foundation/Icon/Icon';

const GoogleLoginButton: React.FC = () => {
  return (
    <button
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        column-gap: 0.75rem;
        padding: 0.59375rem 0.75rem;
        border-radius: 50rem;
        border: 0.0625rem solid ${theme.colors.border.default};
        transition: transform 0.15s ease-in-out;
        background-color: ${theme.colors.surface.default};

        &:hover {
          transform: translateY(-0.25rem);
        }
      `}
    >
      <Icon id="google-logo" width="1.25rem" height="1.25rem" />
      <Typography variant="body1" color={theme.colors.text.default}>
        Google로 시작하기
      </Typography>
    </button>
  );
};

export default GoogleLoginButton;
