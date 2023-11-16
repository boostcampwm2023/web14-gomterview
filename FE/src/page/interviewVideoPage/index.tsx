import { useParams } from 'react-router-dom';
import InterviewVideoPageLayout from '@components/interviewVideoPage/InterviewVideoPageLayout';
import VideoItem from '@common/VideoItem/VideoItem';
import Thumbnail from '@components/myPage/Thumbnail';

const InterviewVideoPage: React.FC = () => {
  // Use the `useParams` hook to access the `videoId` parameter
  const params = useParams();
  const videoId = params.videoId; // This is the video ID from the URL

  return (
    <InterviewVideoPageLayout>
      <p>Showing video for ID: {videoId}</p>
      <VideoItem
        videoName="배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요"
        date="2001.07.17"
      >
        <Thumbnail
          image="https://avatars.githubusercontent.com/u/66554167?v=4"
          videoName="배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요"
          videoLength="03:20"
        />
      </VideoItem>
    </InterviewVideoPageLayout>
  );
};

export default InterviewVideoPage;
