import LandingPage from '@/page/LandingPage';
import InterviewSettingPage from '@page/interviewSettingPage';
import InterviewPage from '@page/interviewPage';
import MyPage from './page/myPage';
import InterviewVideoPage from './page/interviewVideoPage';
import QuestionSelectionBox from '@components/interviewSettingPage/QustionSelectionBox';
import VideoSettingBox from './components/interviewSettingPage/VideoSettingBox';
import RecordMethodBox from './components/interviewSettingPage/RecordMethodBox';
import { PATH } from '@constants/path';
import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';
import myPageLoader from '@routes/myPageLoader';
import invalidPathLoader from '@routes/invalidPathLoader';

const routes = ({ queryClient }: { queryClient: QueryClient }) => {
  return createBrowserRouter([
    {
      path: PATH.ROOT,
      element: <LandingPage />,
    },
    {
      path: PATH.INTERVIEW,
      element: <InterviewPage />,
    },
    {
      path: PATH.INTERVIEW_SETTING,
      element: <InterviewSettingPage />,
      children: [
        {
          index: true,
          element: <QuestionSelectionBox />,
        },
        {
          path: PATH.CONNECTION,
          element: <VideoSettingBox />,
        },
        {
          path: PATH.RECORD,
          element: <RecordMethodBox />,
        },
      ],
    },
    {
      path: PATH.MYPAGE,
      loader: () => myPageLoader({ queryClient: queryClient }),
      element: <MyPage />,
    },
    {
      path: PATH.INTERVIEW_VIDEO, // ":videoId" is a URL parameter
      element: <InterviewVideoPage />,
    },
    {
      path: '*',
      loader: () => invalidPathLoader(),
      element: <LandingPage />, //TODO url은 변경되지 않는 문제 해결해야함
    },
  ]);
};

export default routes;
