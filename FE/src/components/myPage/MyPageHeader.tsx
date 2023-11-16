import { css } from '@emotion/react';
import Typography from '@foundation/Typography/Typography';
import Button from '@foundation/Button/Button';

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
      <Button size="md">면접 시작하기</Button>
    </div>
  );
};
export default MyPageHeader;
