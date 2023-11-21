import { VideoItemResDto } from '@/types/video';
import VideoPlayerFrame from '@common/VideoPlayer/VideoPlayerFrame';
import VideoPlayer from '@common/VideoPlayer/VideoPlayer';
import IconButton from '@common/VideoPlayer/IconButton';
import { useState } from 'react';
import VideoShareModal from '@components/interviewVideoPage/Modal/VideoShareModal';

type PrivateVideoPlayerProps = Omit<VideoItemResDto, 'hash'>;
const PrivateVideoPlayer: React.FC<PrivateVideoPlayerProps> = ({
  id,
  url,
  videoName,
  createdAt,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <VideoPlayerFrame key={id} videoName={videoName} createdAt={createdAt}>
      <IconButton
        text="영상 공유하기"
        iconName="send"
        onClick={() => setIsOpen(!isOpen)}
      />
      <VideoPlayer url={url} />
      <VideoShareModal
        videoId={Number(id)}
        videoName={videoName}
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      />
    </VideoPlayerFrame>
  );
};

export default PrivateVideoPlayer;
