import { css } from '@emotion/react';

const SideBackground: React.FC = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30rem;
      `}
    >
      랜딩 일러스트 들어갈 영역
    </div>
  );
};
export default SideBackground;
