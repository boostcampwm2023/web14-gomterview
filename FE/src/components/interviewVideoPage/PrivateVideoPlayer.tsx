import { VideoItemResDto } from '@/types/video';
import VideoPlayerFrame from '@common/VideoPlayer/VideoPlayerFrame';
import VideoPlayer from '@common/VideoPlayer/VideoPlayer';
import IconButton from '@common/VideoPlayer/IconButton';

type PrivateVideoPlayerProps = Omit<VideoItemResDto, 'hash'>;
const PrivateVideoPlayer: React.FC<PrivateVideoPlayerProps> = ({
  id,
  url,
  videoName,
  createdAt,
}) => {
  return (
    <VideoPlayerFrame key={id} videoName={videoName} createdAt={createdAt}>
      <IconButton text="영상 공유하기" iconName="send" />
      <VideoPlayer url={url} />
    </VideoPlayerFrame>
  );
};

export default PrivateVideoPlayer;
