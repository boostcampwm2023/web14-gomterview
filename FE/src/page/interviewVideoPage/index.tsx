import { LoadingBounce, StartButton } from '@common/index';
import {
  InterviewVideoPageLayout,
  PrivateVideoPlayer,
} from '@components/interviewVideoPage';
import { Suspense } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { CenterLayout } from '@components/layout';
import { PATH } from '@constants/path';

const InterviewVideoPage: React.FC = () => {
  const { videoId } = useParams();

  if (!videoId) return <Navigate to={PATH.ROOT} />;

  return (
    <InterviewVideoPageLayout>
      <Suspense
        fallback={
          <CenterLayout>
            <LoadingBounce />
          </CenterLayout>
        }
      >
        <PrivateVideoPlayer videoId={videoId} />
      </Suspense>
      <StartButton />
    </InterviewVideoPageLayout>
  );
};

export default InterviewVideoPage;
