import { Link } from 'react-router-dom';
import { PATH } from '@constants/path';

type StartButton = {
  text?: string;
};

const InterviewStartButton: React.FC<StartButton> = ({
  text = '로그인 없이 시작하기',
}) => {
  // 로그인 여부에 따라 버튼의 문구가 달라집니다.
  return (
    <div>
      <Link to={PATH.INTERVIEW_SETTING}>
        <button>{text}</button>
      </Link>
    </div>
  );
};
export default InterviewStartButton;
