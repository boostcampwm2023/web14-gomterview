import InterviewVideoPageLayout from '@components/interviewVideoPage/InterviewVideoPageLayout';
import PrivateVideoPlayer from '@components/interviewVideoPage/PrivateVideoPlayer';
import { useParams } from 'react-router-dom';
import useVideoItemQuery from '@hooks/queries/video/useVideoItemQuery';
import LoadingBounce from '@common/Loading/LoadingBounce';
import CenterLayout from '@components/layout/CenterLayout';
import StartButton from '@common/StartButton/StartButton';

const InterviewVideoPage: React.FC = () => {
  const { videoId } = useParams();
  const { data, isFetching } = useVideoItemQuery(Number(videoId));

  //TODO 현재 api에는 유저이름이 없어서 추가 논의해야함
  return (
    <InterviewVideoPageLayout>
      {isFetching ? (
        //TODO 로딩화면 일단 임시로 처리
        <CenterLayout>
          <LoadingBounce />
        </CenterLayout>
      ) : (
        <PrivateVideoPlayer {...data!} />
      )}
      <StartButton />
    </InterviewVideoPageLayout>
  );
};

export default InterviewVideoPage;
