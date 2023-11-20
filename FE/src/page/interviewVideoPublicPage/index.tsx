import InterviewVideoPageLayout from '@components/interviewVideoPage/InterviewVideoPageLayout';
import Typography from '@foundation/Typography/Typography';
import { useNavigate, useParams } from 'react-router-dom';

const InterviewVideoPublicPage: React.FC = () => {
  const navigate = useNavigate();
  const { videoId: videoParam } = useParams();

  const dummyData = {
    videoName: '비디오 이름',
    date: '2001.07.17',
    url: 'https://u2e0.c18.e2-4.dev/videos/%EB%A3%A8%EC%9D%B4%EB%B7%94%ED%86%B5%ED%86%B5%ED%8A%80%EA%B8%B0%EB%84%A4_test_07ab3e8a-1a0a-453f-8d60-afacb57b0075.webm',
  };

  return (
    <InterviewVideoPageLayout>
      <Typography variant="title3">{dummyData.videoName}</Typography>
      {/*<VideoPlayer {...dummyData} />*/}
      {/*<Link to={PATH.INTERVIEW_SETTING}>*/}
      {/*  <Button size="lg">면접 시작하기</Button>*/}
      {/*</Link>*/}
    </InterviewVideoPageLayout>
  );
};

export default InterviewVideoPublicPage;
