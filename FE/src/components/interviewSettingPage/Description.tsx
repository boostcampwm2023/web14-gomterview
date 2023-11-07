import { css } from '@emotion/react';

const Description: React.FC = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 35%;
        border: 1px solid red;
      `}
    >
      설명
    </div>
  );
};
export default Description;
