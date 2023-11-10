import { css } from '@emotion/react';

const InterviewCamera: React.FC = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 75%;
        border: 0.0625rem solid red;
      `}
    >
      면접페이지의 카메라 입니다.
    </div>
  );
};
export default InterviewCamera;
