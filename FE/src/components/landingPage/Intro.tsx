import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const Intro: React.FC = () => {
  // 로그인에 따라 로직이 달라집니다.
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        width: 50%;
        height: 100%;
        border: 1px solid red;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 50%;
          border: 1px solid red;
        `}
      >
        당신만을 위한 면접 서비스
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 50%;
          border: 1px solid pink;
        `}
      >
        <button>구글 로그인 버튼</button>
        <Link to="/interview/setting">
          <button>hihi</button>
        </Link>
      </div>
    </div>
  );
};
export default Intro;
