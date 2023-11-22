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
        width: 80vw;
        height: 45vw;
        object-fit: contain;
        align-self: center;
      `}
    />
  );
};

export default VideoPlayer;
