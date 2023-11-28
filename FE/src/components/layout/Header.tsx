import { Logo } from '@common/index';
import { PATH } from '@constants/path';
import { css } from '@emotion/react';
import { Typography } from '@foundation/index';
import { theme } from '@styles/theme';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem;
      `}
    >
      <Logo />
      <div
        css={css`
          display: flex;
          gap: 1rem;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: flex-start;
            align-items: center;
            cursor: pointer;
            padding: 0.5rem;
            :hover {
              background-color: ${theme.colors.surface.weak};
            }
          `}
        >
          <Link
            to={PATH.ROOT} // 아직 면접 세트 페이지가 개발되지 않아, 임시적으로 설정합니다
            css={css`
              text-decoration: none;
            `}
          >
            <Typography variant="body1" color={theme.colors.text.sub}>
              면접 Set 보러가기
            </Typography>
          </Link>
        </div>
        <Link
          to={PATH.INTERVIEW_SETTING}
          css={css`
            display: flex;
            justify-content: flex-start;
            align-items: center;
            column-gap: 1rem;
            text-decoration: none;
            cursor: pointer;
          `}
        >
          <Typography variant="body1" color={theme.colors.text.sub}>
            면접 문제 풀러가기
          </Typography>
        </Link>
        <Link
          to={PATH.MYPAGE}
          css={css`
            display: flex;
            justify-content: flex-start;
            align-items: center;
            column-gap: 1rem;
            text-decoration: none;
            cursor: pointer;
          `}
        >
          <Typography variant="body1" color={theme.colors.text.sub}>
            마이페이지
          </Typography>
        </Link>
      </div>
    </div>
  );
};

export default Header;
