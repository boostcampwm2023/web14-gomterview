import { css } from '@emotion/react';

type VideoPlayerProps = {
  url: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  return (
    <video
      src={url}
      autoPlay
      controls
      muted
      css={css`
        height: 60vh;
        align-self: center;
      `}
    />
  );
};

export default VideoPlayer;
