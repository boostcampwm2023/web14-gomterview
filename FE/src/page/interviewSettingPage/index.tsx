import InterviewSettingPageLayout from '@/components/interviewSettingPage/InterviewSettingPageLayout';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import QuestionSelectionBox from '@/components/interviewSettingPage/QustionSelectionBox';
import { SETTING_PATH } from '@/constants/path';
import VideoSettingBox from '@/components/interviewSettingPage/VideoSettingBox';
import RecordMethodBox from '@/components/interviewSettingPage/RecordMethodBox';
import StepPage from '@/components/foundation/StepPages';
import ProgressStepBar from '@/components/common/ProgressStepBar/ProgressStepBar';
import {
  questionSetting,
  recordSetting,
  videoSetting,
} from '@/atoms/interviewSetting';
import { useRecoilValue } from 'recoil';

const InterviewSettingPage: React.FC = () => {
  const navigate = useNavigate();
  const data = [
    {
      name: '문제 선택',
      path: SETTING_PATH.QUESTION,
      page: (
        <QuestionSelectionBox
          onNextClick={() => changeSearchParams(SETTING_PATH.CONNECTION)}
        />
      ),
      state: useRecoilValue(questionSetting),
    },
    {
      name: '화면과 소리설정',
      path: SETTING_PATH.CONNECTION,
      page: (
        <VideoSettingBox
          onNextClick={() => changeSearchParams(SETTING_PATH.RECORD)}
        />
      ),
      state: useRecoilValue(videoSetting),
    },
    {
      name: '녹화 설정',
      path: SETTING_PATH.RECORD,
      page: <RecordMethodBox onNextClick={() => navigate('/interview')} />,
      state: useRecoilValue(recordSetting),
    },
  ];
  const validPagePaths = data.map((item) => item.path);

  const [searchParams, setSearchParams] = useSearchParams();

  const changeSearchParams = (newPage: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage);
    setSearchParams(newSearchParams);
  };
  // TODO: 로직이 더 길어지면 hook으로 분리해도 나쁘지 않을듯

  const currentPage = searchParams.get('page');

  if (!currentPage || !validPagePaths.includes(currentPage)) {
    return <Navigate to={`?page=${SETTING_PATH.QUESTION}`} replace />;
  }

  return (
    <InterviewSettingPageLayout>
      <ProgressStepBar>
        {data.map((item) => (
          <ProgressStepBar.Item
            key={item.name}
            name={item.name}
            isCompleted={item.state.isSuccess || currentPage === item.path}
          ></ProgressStepBar.Item>
        ))}
      </ProgressStepBar>
      <StepPage page={currentPage}>
        {data.map((item) => (
          <StepPage.step key={item.path} path={item.path} page={currentPage}>
            {item.page}
          </StepPage.step>
        ))}
      </StepPage>
    </InterviewSettingPageLayout>
  );
};

export default InterviewSettingPage;
