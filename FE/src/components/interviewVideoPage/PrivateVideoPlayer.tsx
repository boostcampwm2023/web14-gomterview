import { VideoItemResDto } from '@/types/video';
import { VideoPlayer, VideoPlayerFrame } from '@common/VideoPlayer';

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
