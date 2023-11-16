import VideoItem from '@common/VideoItem/VideoItem';
import { css } from '@emotion/react';

type VideoPlayerProps = {
  videoName: string;
  date: string;
  url: string;
};
const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoName, date, url }) => {
  return (
    <VideoItem
      videoName={videoName}
      date={date}
      css={css`
        width: 70vw;
      `}
    >
      <video
        src={url}
        autoPlay
        controls
        css={css`
          width: 70vw;
          align-self: center;
        `}
      />
    </VideoItem>
  );
};

export default VideoPlayer;
