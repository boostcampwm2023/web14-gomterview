import { PATH } from '@constants/path';
import { css } from '@emotion/react';
import { Typography, Button } from '@foundation/index';
import { Link } from 'react-router-dom';

const MyPageHeader: React.FC = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <Typography variant="title1">마이페이지</Typography>
      <Link to={PATH.INTERVIEW_SETTING}>
        <Button size="md">면접 시작하기</Button>
      </Link>
    </div>
  );
};
export default MyPageHeader;
