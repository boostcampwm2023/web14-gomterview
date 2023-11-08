import { css } from '@emotion/react';

const SideBackground: React.FC = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 100%;
        border: 1px solid red;
      `}
    >
      조금 이쁜 랜딩 입니다
    </div>
  );
};
export default SideBackground;
