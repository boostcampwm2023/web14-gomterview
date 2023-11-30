import { css } from '@emotion/react';
import { Typography } from '@foundation/index';
import { theme } from '@styles/theme';
import MenuItem from './MenuItem';
import { PATH } from '@constants/path';
import useUserInfo from '@hooks/useUserInfo';
import redirectToGoogleLogin from '@/utils/redirectToGoogleLogin';

const MenuList: React.FC = () => {
  const isLogin = useUserInfo();

  return (
    <>
      <MenuItem path={PATH.WORKBOOK} text="면접 Set 보러가기" />
      <MenuItem path={PATH.INTERVIEW_SETTING} text="면접 문제 풀러가기" />
      {isLogin ? (
        <MenuItem path={PATH.MYPAGE} text="마이페이지" />
      ) : (
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
          onClick={() => void redirectToGoogleLogin()}
        >
          <Typography variant="body1" color={theme.colors.text.subStrong}>
            로그인
          </Typography>
        </div>
      )}
    </>
  );
};

export default MenuList;
