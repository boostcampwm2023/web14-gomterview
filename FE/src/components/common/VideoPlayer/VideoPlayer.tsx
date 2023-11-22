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
        //16:9 비율로 설정
        width: 96vh;
        height: 54vh;
        object-fit: contain;
        align-self: center;
      `}
    />
  );
};

export default VideoPlayer;
