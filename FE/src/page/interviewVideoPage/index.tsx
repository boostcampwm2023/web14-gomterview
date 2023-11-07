import { useParams } from 'react-router-dom';
import InterviewVideoPageLayout from '@/components/interviewVideoPage/Layout';

const InterviewVideoPage: React.FC = () => {
  // Use the `useParams` hook to access the `videoId` parameter
  const params = useParams();
  const videoId = params.videoId; // This is the video ID from the URL

  return (
    <InterviewVideoPageLayout>
      <h1>Interview Video Page</h1>
      <p>Showing video for ID: {videoId}</p>
      {/* You can use the videoId to fetch and display the appropriate video */}
    </InterviewVideoPageLayout>
  );
};

export default InterviewVideoPage;
