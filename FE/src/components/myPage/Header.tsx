import { css } from '@emotion/react';

const MyPageHeader: React.FC = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 20%;
        border: 1px solid red;
      `}
    >
      My Header 입니다.
    </div>
  );
};
export default MyPageHeader;
