import { css } from '@emotion/react';
import { MenuItem, Typography } from '@foundation/index';
import { theme } from '@styles/theme';
import { PATH } from '@constants/path';
import useUserInfo from '@hooks/useUserInfo';
import redirectToGoogleLogin from '@/utils/redirectToGoogleLogin';
import { Link } from 'react-router-dom';

const Navigations: React.FC = () => {
  const isLogin = useUserInfo();

  const navigationList = [
    { path: PATH.WORKBOOK, text: '면접 세트 보러가기', visibility: true },
    {
      path: PATH.INTERVIEW_SETTING,
      text: '면접 문제 풀러가기',
      visibility: true,
    },
    { path: PATH.MYPAGE, text: '마이페이지', visibility: isLogin },
  ];

  return (
    <>
      {navigationList.map(
        (item) =>
          item.visibility && (
            <MenuItem key={item.path}>
              <Link
                to={item.path}
                css={css`
                  text-decoration: none;
                `}
              >
                <Typography variant="body1" color={theme.colors.text.subStrong}>
                  {item.text}
                </Typography>
              </Link>
            </MenuItem>
          )
      )}
      {!isLogin && (
        <MenuItem onClick={() => void redirectToGoogleLogin()}>
          <Typography variant="body1" color={theme.colors.text.subStrong}>
            로그인
          </Typography>
        </MenuItem>
      )}
    </>
  );
};

export default Navigations;
