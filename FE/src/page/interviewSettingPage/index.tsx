import InterviewSettingPageLayout from '@/components/interviewSettingPage/InterviewSettingPageLayout';
import { css } from '@emotion/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SettingProgressBar from '@/components/interviewSettingPage/SettingProgressBar';
import Description from '@/components/interviewSettingPage/Description';
import Button from '@/components/foundation/Button/Button';
import { PATH } from '@constants/path';

const InterviewSettingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
