import { useParams } from 'react-router-dom';
import InterviewVideoPageLayout from '@components/interviewVideoPage/InterviewVideoPageLayout';
import VideoPlayer from '@components/interviewVideoPage/VideoPlayer';
import Typography from '@foundation/Typography/Typography';

const InterviewVideoPage: React.FC = () => {
  const params = useParams();
  const videoId = params.videoId;

  const dummyData = {
    videoName: '비디오 이름',
    date: '2001.07.17',
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  };

  return (
    <InterviewVideoPageLayout>
      {/*<p>Showing video for ID: {videoId}</p>*/}
      <Typography variant="title3">{dummyData.videoName}</Typography>
      <VideoPlayer {...dummyData} />
    </InterviewVideoPageLayout>
  );
};

export default InterviewVideoPage;
