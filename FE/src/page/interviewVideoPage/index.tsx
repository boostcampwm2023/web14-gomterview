import InterviewVideoPageLayout from '@components/interviewVideoPage/InterviewVideoPageLayout';
import VideoPlayer from '@components/interviewVideoPage/VideoPlayer';
import Typography from '@foundation/Typography/Typography';

const InterviewVideoPage: React.FC = () => {
  const dummyData = {
    videoName: '비디오 이름',
    date: '2001.07.17',
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  };

  return (
    <InterviewVideoPageLayout>
      <Typography variant="title3">{dummyData.videoName}</Typography>
      <VideoPlayer {...dummyData} />
    </InterviewVideoPageLayout>
  );
};

export default InterviewVideoPage;
