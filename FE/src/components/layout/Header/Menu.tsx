import { PATH } from '@constants/path';
import { css } from '@emotion/react';
import MenuItem from './MenuItem';
const Menu = () => {
  return (
    <div
      css={css`
        display: flex;
        gap: 1rem;
      `}
    >
      <MenuItem path={PATH.ROOT} text="면접 Set 보러가기" />
      <MenuItem path={PATH.INTERVIEW_SETTING} text="면접 문제 풀러가기" />
      <MenuItem path={PATH.MYPAGE} text="마이페이지" />
    </div>
  );
};

export default Menu;
