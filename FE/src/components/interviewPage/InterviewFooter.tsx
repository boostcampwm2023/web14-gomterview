import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const InterviewFooter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 15%;
        border: 1px solid red;
      `}
    >
      <button onClick={() => navigate('/')}>나가기</button>
      면접페이지의 하단 입니다.
      <button onClick={() => navigate('/mypage')}>면접 종료</button>
    </div>
  );
};
export default InterviewFooter;
