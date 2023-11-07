import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import LandingPage from '@/page/LandingPage';
import InterviewSettingPage from '@page/interviewSettingPage';
import InterviewPage from '@page/interviewPage';
import MyPage from './page/myPage';
import InterviewVideoPage from './page/interviewVideoPage';
import QuestionSelectionBox from '@components/interviewSettingPage/QustionSelectionBox';
import VideoSettingBox from './components/interviewSettingPage/VideoSettingBox';
import RecordMethodBox from './components/interviewSettingPage/RecordMethodBox';
import { PATH } from '@constants/path';

const routes: RouteObject[] = [
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
    element: <MyPage />,
  },
  {
    path: PATH.INTERVIEW_VIDEO, // ":videoId" is a URL parameter
    element: <InterviewVideoPage />,
  },
];

const router = createBrowserRouter(routes);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
