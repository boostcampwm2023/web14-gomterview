import InterviewSettingPageLayout from '@/components/interviewSettingPage/InterviewSettingPageLayout';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { SETTING_PATH } from '@/constants/path';
import StepPage from '@/components/foundation/StepPages';
import ProgressStepBar from '@/components/common/ProgressStepBar/ProgressStepBar';
import {
  questionSetting,
  recordSetting,
  videoSetting,
} from '@/atoms/interviewSetting';
import { useRecoilValue } from 'recoil';
import QuestionSettingPage from './QuestionSettingPage';
import { css } from '@emotion/react';
import RecordSettingPage from './RecordSettingPage';
import VideoSettingPage from './VideoSettingPage';

const FIRST_PAGE_INDEX = 0;
const PREV_PAGE_INDEX = -1;

const InterviewSettingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get('page');

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
        <VideoSettingPage
          isCurrentPage={currentPage === SETTING_PATH.CONNECTION}
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
        <RecordSettingPage
          onPrevClick={() => changeSearchParams(SETTING_PATH.CONNECTION)}
          onNextClick={() => navigate('/interview')}
        />
      ),
      state: useRecoilValue(recordSetting),
    },
  ];

  const currentIndex = pageInfo.findIndex((item) => item.path === currentPage);

  const changeSearchParams = (newPage: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage);
    setSearchParams(newSearchParams, { replace: true });
  };
  // TODO: 로직이 더 길어지면 hook으로 분리해도 나쁘지 않을듯

  const isValidatePath = currentIndex !== -1;
  if (!isValidatePath) {
    return <Navigate to={`?page=${SETTING_PATH.QUESTION}`} replace />;
  }

  const prevPageInfo =
    currentIndex === FIRST_PAGE_INDEX
      ? pageInfo[FIRST_PAGE_INDEX]
      : pageInfo[currentIndex + PREV_PAGE_INDEX];

  const isValidatePrevPageStatus =
    currentIndex !== FIRST_PAGE_INDEX && !prevPageInfo.state.isSuccess;

  if (isValidatePrevPageStatus) {
    return <Navigate to={`?page=${prevPageInfo.path}`} replace />;
  }

  return (
    <InterviewSettingPageLayout>
      <div
        css={css`
          position: sticky;
          top: 0;
          padding: 1rem 0;
          width: 46.875rem;
          background-color: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(10px); /* 10px 블러 효과 */

          z-index: 10;
        `}
      >
        <ProgressStepBar>
          {pageInfo.map((item) => (
            <ProgressStepBar.Item
              key={item.name}
              name={item.name}
              isCompleted={item.state.isSuccess || currentPage === item.path}
            ></ProgressStepBar.Item>
          ))}
        </ProgressStepBar>
      </div>
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
