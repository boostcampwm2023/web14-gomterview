import { Navigate, useParams } from 'react-router-dom';
import { PATH } from '@constants/path';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { VideoItemResDto } from '@/types/video';
import StartButton from '@common/StartButton/StartButton';
import {
  InterviewVideoPublicPageLayout,
  PublicVideoPlayer,
} from '@components/interviewVideoPublicPage';

const InterviewVideoPublicPage: React.FC = () => {
  const { videoHash = '' } = useParams();
  const data = useQueryClient().getQueryData<VideoItemResDto>(
    QUERY_KEY.VIDEO_HASH(videoHash)
  );

  if (!data) return <Navigate to={PATH.NOT_FOUND} />;

  return (
    <InterviewVideoPublicPageLayout>
      <PublicVideoPlayer {...data} />
      <StartButton />
    </InterviewVideoPublicPageLayout>
  );
};

export default InterviewVideoPublicPage;
