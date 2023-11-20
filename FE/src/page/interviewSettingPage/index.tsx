import InterviewSettingPageLayout from '@/components/interviewSettingPage/InterviewSettingPageLayout';
import { useSearchParams } from 'react-router-dom';
import QuestionSelectionBox from '@/components/interviewSettingPage/QustionSelectionBox';
import { PATH } from '@/constants/path';
import VideoSettingBox from '@/components/interviewSettingPage/VideoSettingBox';
import RecordMethodBox from '@/components/interviewSettingPage/RecordMethodBox';
import StepPage from '@/components/foundation/StepPages';

const InterviewSettingPage: React.FC = () => {
  const data = [
    {
      name: '문제 선택',
      path: 'question',
      page: (
        <QuestionSelectionBox
          onNextClick={() => changeSearchParams(PATH.CONNECTION)}
        />
      ),
    },
    {
      name: '화면과 소리설정',
      path: PATH.CONNECTION,
      page: <VideoSettingBox />,
    },
    {
      name: '녹화 설정',
      path: PATH.RECORD,
      page: <RecordMethodBox />,
    },
  ];

  const [searchParams, setSearchParams] = useSearchParams();

  const changeSearchParams = (newPage: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage);
    setSearchParams(newSearchParams);
  };

  const currentPage = searchParams.get('page');

  return (
    <InterviewSettingPageLayout>
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
