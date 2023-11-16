import { css } from '@emotion/react';
import { RefObject } from 'react';

type MirrorType = {
  mirrorVideoRef: RefObject<HTMLVideoElement>;
};

const Mirror: React.FC<MirrorType> = ({ mirrorVideoRef }) => {
  return (
    <video
      ref={mirrorVideoRef}
      autoPlay
      muted
      css={css`
        height: 100%;
        transform: scaleX(-1);
      `}
    />
  );
};
export default Mirror;
