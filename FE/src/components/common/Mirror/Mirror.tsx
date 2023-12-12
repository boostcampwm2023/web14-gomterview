import { css } from '@emotion/react';
import { Icon } from '@foundation/index';
import { Tooltip } from '@foundation/index';
import { theme } from '@styles/theme';
import React, { RefObject } from 'react';
import { ConnectStatus } from '@atoms/media';

type MirrorProps = {
  mirrorVideoRef: RefObject<HTMLVideoElement>;
  connectStatus: ConnectStatus;
  reloadMedia: () => void;
  isSetting?: boolean;
};

const Mirror: React.FC<MirrorProps> = ({
  mirrorVideoRef,
  connectStatus,
  reloadMedia,
  isSetting,
}) => {
  return (
    <>
      <video
        ref={mirrorVideoRef}
        autoPlay
        muted
        playsInline
        css={css`
          display: ${connectStatus === 'fail' ? 'none' : 'block'};
          height: 100%;
          width: ${isSetting && '100%'};
          transform: scaleX(-1);
          border-radius: 1rem;
        `}
      />
      {connectStatus === 'fail' && (
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            min-height: 300px;
            width: 100%;
            border-radius: 0.5rem;
            background-color: ${theme.colors.surface.inner};
          `}
        >
          <Tooltip title="카메라를 다시 연결합니다." position="bottom">
            <div
              onClick={reloadMedia}
              css={css`
                cursor: pointer;
                width: 6.25rem;
                height: 6.25rem;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: all 0.5s ease;

                &:hover {
                  transform: scale(1.1);
                }
              `}
            >
              <Icon id="reload" width="80px" height="80px" />
            </div>
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default Mirror;
