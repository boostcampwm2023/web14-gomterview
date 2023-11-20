import InterviewVideoPageLayout from '@components/interviewVideoPage/InterviewVideoPageLayout';
import PrivateVideoPlayer from '@components/interviewVideoPage/PrivateVideoPlayer';
import Typography from '@foundation/Typography/Typography';
import Button from '@foundation/Button/Button';
import { Link, useParams } from 'react-router-dom';
import { PATH } from '@constants/path';
import useVideoItemQuery from '@hooks/queries/video/useVideoItemQuery';
import LoadingBounce from '@common/Loading/LoadingBounce';
import CenterLayout from '@components/layout/CenterLayout';

const InterviewVideoPage: React.FC = () => {
  const { videoId } = useParams();
  const { data, isFetching } = useVideoItemQuery(Number(videoId));

  //TODO 현재 api에는 유저이름이 없어서 추가 논의해야함
  return (
    <InterviewVideoPageLayout>
      <Typography variant="title3">곰터뷰님의 면접 연습 영상입니다.</Typography>
      {isFetching ? (
        //TODO 로딩화면 일단 임시로 처리
        <CenterLayout>
          <LoadingBounce />
        </CenterLayout>
      ) : (
        <PrivateVideoPlayer {...data!} />
      )}
      <Link to={PATH.INTERVIEW_SETTING}>
        <Button size="lg">면접 시작하기</Button>
      </Link>
    </InterviewVideoPageLayout>
  );
};

export default InterviewVideoPage;
