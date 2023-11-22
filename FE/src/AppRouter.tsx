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
import InterviewVideoPublicPage from '@page/interviewVideoPublicPage';
import InterviewVideoPublicLoader from '@routes/interviewVideoPublicLoader';
import rootLoader from '@routes/rootLoader';

const AppRouter = ({ queryClient }: { queryClient: QueryClient }) => {
  const routes = createBrowserRouter([
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
          path: PATH.INTERVIEW_VIDEO,
          element: <InterviewVideoPage />,
        },
        {
          path: PATH.INTERVIEW_VIDEO_PUBLIC,
          element: <InterviewVideoPublicPage />,
          loader: ({ params }) =>
            InterviewVideoPublicLoader({
              params: params,
              queryClient: queryClient,
            }),
        },
        {
          path: '*',
          loader: () => invalidPathLoader(),
          element: <LandingPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default AppRouter;
