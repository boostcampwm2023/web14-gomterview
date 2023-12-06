import { css } from '@emotion/react';
import Typography from '@foundation/Typography/Typography';
import { theme } from '@styles/theme';
import React, { PropsWithChildren } from 'react';
import { VideoItemResDto } from '@/types/video';
import dayjs from 'dayjs';

type VideoItemProps = PropsWithChildren &
  Pick<VideoItemResDto, 'videoName' | 'createdAt'>;

const VideoPlayerFrame: React.FC<VideoItemProps> = ({
  children,
  videoName,
  createdAt,
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        width: 64svw;
      `}
    >
      {children}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0 0.5rem;
          cursor: pointer;
        `}
      >
        <Typography
          variant="title3"
          css={css`
            line-height: 1.7;
          `}
        >
          {videoName}
        </Typography>
        <div
          css={css`
            align-self: flex-end;
          `}
        >
          <Typography variant="body3" color={theme.colors.text.subStrong}>
            {dayjs(Number(createdAt)).format('YYYY.MM.DD')}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerFrame;
