import InterviewSettingPageLayout from '@/components/interviewSettingPage/InterviewSettingPageLayout';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { SETTING_PATH } from '@/constants/path';
import VideoSettingBox from '@/components/interviewSettingPage/VideoSettingBox';
import StepPage from '@/components/foundation/StepPages';
import ProgressStepBar from '@/components/common/ProgressStepBar/ProgressStepBar';
import {
  questionSetting,
  recordSetting,
  videoSetting,
} from '@/atoms/interviewSetting';
import { useRecoilValue } from 'recoil';
import QuestionSettingPage from './QuestionSettingPage';

const InterviewSettingPage: React.FC = () => {
  const navigate = useNavigate();
  const pageInfo = [
    {
      name: '문제 선택',
      path: SETTING_PATH.QUESTION,
      page: (
        <QuestionSettingPage
          onPrevClick={() => navigate('/')}
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
          onPrevClick={() => changeSearchParams(SETTING_PATH.QUESTION)}
          onNextClick={() => changeSearchParams(SETTING_PATH.RECORD)}
        />
      ),
      state: useRecoilValue(videoSetting),
    },
    {
      name: '녹화 설정',
      path: SETTING_PATH.RECORD,
      page: (
        <QuestionSettingPage
          onPrevClick={() => changeSearchParams(SETTING_PATH.CONNECTION)}
          onNextClick={() => navigate('/interview')}
        />
      ),
      state: useRecoilValue(recordSetting),
    },
  ];
  const validPagePaths = pageInfo.map((item) => item.path);

  const [searchParams, setSearchParams] = useSearchParams();

  const changeSearchParams = (newPage: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage);
    setSearchParams(newSearchParams, { replace: true });
  };
  // TODO: 로직이 더 길어지면 hook으로 분리해도 나쁘지 않을듯

  const currentPage = searchParams.get('page');

  if (!currentPage || !validPagePaths.includes(currentPage)) {
    return <Navigate to={`?page=${SETTING_PATH.QUESTION}`} replace />;
  }

  return (
    <InterviewSettingPageLayout>
      <ProgressStepBar>
        {pageInfo.map((item) => (
          <ProgressStepBar.Item
            key={item.name}
            name={item.name}
            isCompleted={item.state.isSuccess || currentPage === item.path}
          ></ProgressStepBar.Item>
        ))}
      </ProgressStepBar>
      <StepPage page={currentPage}>
        {pageInfo.map((item) => (
          <StepPage.step key={item.path} path={item.path} page={currentPage}>
            {item.page}
          </StepPage.step>
        ))}
      </StepPage>
    </InterviewSettingPageLayout>
  );
};

export default InterviewSettingPage;
