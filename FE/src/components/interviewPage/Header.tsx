import { css } from '@emotion/react';

const InterViewHeader: React.FC = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 10%;
        border: 1px solid red;
      `}
    >
      면접페이지의 Header 입니다.
    </div>
  );
};
export default InterViewHeader;
