import Typography from '@foundation/Typography/Typography';
import { Link, Navigate, useParams } from 'react-router-dom';
import { PATH } from '@constants/path';
import Button from '@foundation/Button/Button';
import InterviewVideoPublicPageLayout from '@components/interviewVideoPublicPage/InterviewVideoPublicPageLayout';
import PublicVideoPlayer from '@components/interviewVideoPublicPage/PublicVideoPlayer';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/queryKey';
import { VideoItemResDto } from '@/types/video';

const InterviewVideoPublicPage: React.FC = () => {
  const { videoHash = '' } = useParams();
  const data = useQueryClient().getQueryData<VideoItemResDto>(
    QUERY_KEY.VIDEO_HASH(videoHash)
  );

  if (!data) return <Navigate to={PATH.NOT_FOUND} />;

  return (
    <InterviewVideoPublicPageLayout>
      <Typography variant="title3">곰터뷰님의 면접 연습 영상입니다.</Typography>
      <PublicVideoPlayer {...data} />
      <Link to={PATH.INTERVIEW_SETTING}>
        <Button size="lg">면접 시작하기</Button>
      </Link>
    </InterviewVideoPublicPageLayout>
  );
};

export default InterviewVideoPublicPage;
