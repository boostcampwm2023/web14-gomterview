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
      `}
    >
      {children}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1rem;
          height: 100%;
          cursor: pointer;
        `}
      >
        <Typography
          variant="title3"
          css={css`
            line-height: 1.25rem;

            &:hover {
              text-decoration: underline;
              text-decoration-color: ${theme.colors.text.subStrong};
            }
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
            {dayjs(Number(createdAt)).format('YYYY-MM-DD')}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerFrame;
