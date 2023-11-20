import InterviewSettingPageLayout from '@/components/interviewSettingPage/InterviewSettingPageLayout';
import { css } from '@emotion/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SettingProgressBar from '@/components/interviewSettingPage/SettingProgressBar';
import Description from '@/components/interviewSettingPage/Description';
import Button from '@/components/foundation/Button/Button';
import { PATH } from '@constants/path';
import { useRecoilState } from 'recoil';
import { questionSetting } from '@atoms/interviewSetting';
import { useEffect } from 'react';

const InterviewSettingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [question, setQuestion] = useRecoilState(questionSetting);

  useEffect(() => {
    // 더 많은 초기 질문 데이터
    const initialQuestions = [
      {
        categoryId: 1,
        questionId: 1,
        questionContent: '첫 번째 질문',
        answerId: 1,
        answerContent: '첫 번째 답변',
      },
      {
        categoryId: 2,
        questionId: 2,
        questionContent: '두 번째 질문',
        answerId: 2,
        answerContent: '두 번째 답변',
      },
      {
        categoryId: 3,
        questionId: 3,
        questionContent: '세 번째 질문',
        answerId: 3,
        answerContent: '세 번째 답변',
      },
    ];

    setQuestion({ isSuccess: true, selectedData: initialQuestions });
  }, [setQuestion]);

  function navigateNext() {
    switch (location.pathname) {
      case PATH.INTERVIEW_SETTING:
        navigate(PATH.INTERVIEW_SETTING_CONNECTION);
        break;
      case PATH.INTERVIEW_SETTING_CONNECTION:
        navigate(PATH.INTERVIEW_SETTING_RECORD);
        break;
      case PATH.INTERVIEW_SETTING_RECORD:
        navigate(PATH.INTERVIEW);
        break;
      default:
        navigate(PATH.ROOT);
        break;
    }
  }

  function navigatePrev() {
    switch (location.pathname) {
      case PATH.INTERVIEW_SETTING:
        navigate(PATH.ROOT);
        break;
      case PATH.INTERVIEW_SETTING_CONNECTION:
        navigate(PATH.INTERVIEW_SETTING);
        break;
      case PATH.INTERVIEW_SETTING_RECORD:
        navigate(PATH.INTERVIEW_SETTING_CONNECTION);
        break;
      default:
        navigate(PATH.ROOT);
        break;
    }
  }

  return (
    <InterviewSettingPageLayout>
      <SettingProgressBar />
      <Description />
      <Outlet />
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid red;
          gap: 1.25rem;
        `}
      >
        <Button onClick={navigatePrev}>이전</Button>
        <Button onClick={navigateNext}>다음</Button>
      </div>
    </InterviewSettingPageLayout>
  );
};

export default InterviewSettingPage;
