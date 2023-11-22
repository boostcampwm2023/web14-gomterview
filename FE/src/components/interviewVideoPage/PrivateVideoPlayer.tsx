import { VideoItemResDto } from '@/types/video';
import VideoPlayerFrame from '@common/VideoPlayer/VideoPlayerFrame';
import VideoPlayer from '@common/VideoPlayer/VideoPlayer';

type PrivateVideoPlayerProps = Omit<VideoItemResDto, 'hash'>;
const PrivateVideoPlayer: React.FC<PrivateVideoPlayerProps> = ({
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

export default PrivateVideoPlayer;
