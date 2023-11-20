import { VideoItemResDto } from '@/types/video';
import VideoPlayerFrame from '@common/VideoPlayer/VideoPlayerFrame';
import VideoPlayer from '@common/VideoPlayer/VideoPlayer';

type PublicVideoPlayerProps = Omit<VideoItemResDto, 'hash'>;
const PublicVideoPlayer: React.FC<PublicVideoPlayerProps> = ({
  id,
  url,
  videoName,
  createdAt,
}) => {
  return (
    <VideoPlayerFrame key={id} videoName={videoName} createdAt={createdAt}>
      <VideoPlayer url={url} />
    </VideoPlayerFrame>
  );
};

export default PublicVideoPlayer;
