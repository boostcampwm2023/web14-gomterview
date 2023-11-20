/* eslint-disable @typescript-eslint/no-unsafe-call */
import LandingPage from '@/page/LandingPage';
import InterviewSettingPage from '@page/interviewSettingPage';
import InterviewPage from '@page/interviewPage';
import MyPage from './page/myPage';
import InterviewVideoPage from './page/interviewVideoPage';
import { PATH } from '@constants/path';
import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import myPageLoader from '@routes/myPageLoader';
import invalidPathLoader from '@routes/invalidPathLoader';
import rootLoader from '@routes/rootLoader';

const routes = ({ queryClient }: { queryClient: QueryClient }) => {
  return createBrowserRouter([
    {
      path: PATH.ROOT,
      element: <Outlet />,
      loader: () => rootLoader({ queryClient: queryClient }),
      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        {
          path: PATH.INTERVIEW,
          element: <InterviewPage />,
        },
        {
          path: PATH.INTERVIEW_SETTING,
          element: <InterviewSettingPage />,
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
      ],
    },
  ]);
};

const AppRouter = ({ queryClient }: { queryClient: QueryClient }) => {
  return <RouterProvider router={routes({ queryClient: queryClient })} />;
};

export default AppRouter;
