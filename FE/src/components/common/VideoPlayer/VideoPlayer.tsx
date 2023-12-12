import { css } from '@emotion/react';
import { theme } from '@styles/theme';

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
      playsInline
      crossOrigin="use-credentials"
      css={css`
        background-color: ${theme.colors.surface.black100};
        max-height: 60svh;
        width: 100%;
        object-fit: contain;
        align-self: center;
      `}
    />
  );
};

export default VideoPlayer;
