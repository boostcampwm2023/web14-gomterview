import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { PATH, SETTING_PATH } from '@/constants/path';
import {
  questionSetting,
  recordSetting,
  serviceTerms,
  videoSetting,
} from '@/atoms/interviewSetting';
import { useRecoilState, useRecoilValue } from 'recoil';
import QuestionSettingPage from './QuestionSettingPage';
import { css } from '@emotion/react';
import RecordSettingPage from './RecordSettingPage';
import VideoSettingPage from './VideoSettingPage';
import { ProgressStepBar } from '@common/index';
import StepPage from '@foundation/StepPages';
import { InterviewSettingPageLayout } from '@components/interviewSettingPage';
import ServiceTermsPage from './ServiceTermsPage';
import { toast } from '@foundation/Toast/toast';

const FIRST_PAGE_INDEX = 0;
const PREV_PAGE_INDEX = -1;

const InterviewSettingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [questionSettingState] = useRecoilState(questionSetting);

  const currentPage = searchParams.get('page');

  const pageInfo = [
    {
      name: '약관 동의',
      path: SETTING_PATH.TERMS,
      page: (
        <ServiceTermsPage
          onPrevClick={() => navigate('/')}
          onNextClick={() => changeSearchParams(SETTING_PATH.QUESTION)}
        />
      ),
      state: useRecoilValue(serviceTerms),
    },
    {
      name: '문제 선택',
      path: SETTING_PATH.QUESTION,
      page: (
        <QuestionSettingPage
          onPrevClick={() => changeSearchParams(SETTING_PATH.TERMS)}
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
          onPrevClick={() => {
            if (questionSettingState.from !== 'workbook')
              changeSearchParams(SETTING_PATH.QUESTION);
            else {
              navigate(PATH.ROOT);
              toast.info('랜딩 페이지로 이동합니다.');
            }
          }}
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
          width: 100%;
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
