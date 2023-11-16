import InterviewVideoPageLayout from '@components/interviewVideoPage/InterviewVideoPageLayout';
import VideoPlayer from '@components/interviewVideoPage/VideoPlayer';
import Typography from '@foundation/Typography/Typography';

const InterviewVideoPage: React.FC = () => {
  const dummyData = {
    videoName: '비디오 이름',
    date: '2001.07.17',
    url: 'https://u2e0.c18.e2-4.dev/videos/%EB%A3%A8%EC%9D%B4%EB%B7%94%ED%86%B5%ED%86%B5%ED%8A%80%EA%B8%B0%EB%84%A4_test_07ab3e8a-1a0a-453f-8d60-afacb57b0075.webm',
  };

  return (
    <InterviewVideoPageLayout>
      <Typography variant="title3">{dummyData.videoName}</Typography>
      <VideoPlayer {...dummyData} />
    </InterviewVideoPageLayout>
  );
};

export default InterviewVideoPage;
