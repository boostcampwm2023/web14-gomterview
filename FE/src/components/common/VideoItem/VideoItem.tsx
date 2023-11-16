import Typography from '@foundation/Typography/Typography';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';
import React from 'react';
import { HTMLElementTypes } from '@/types/utils';

type VideoItemProps = {
  children?: React.ReactNode;
  videoName: string;
  date: string;
} & HTMLElementTypes<HTMLDivElement>;

const VideoItem: React.FC<VideoItemProps> = ({
  children,
  videoName,
  date,
  ...args
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
      {...args}
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
          variant="body2"
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
            {date}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
