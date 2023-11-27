import { css } from '@emotion/react';
import { Typography } from '@foundation/index';
import { theme } from '@styles/theme';
import { Link } from 'react-router-dom';

type VideoItemProps = {
  children?: React.ReactNode;
  videoName: string;
  date: string;
  path: string;
};

const VideoItem: React.FC<VideoItemProps> = ({
  children,
  videoName,
  date,
  path,
}) => {
  return (
    <Link
      to={path}
      css={css`
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: ${theme.colors.text.default};
      `}
    >
      {children}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          row-gap: 0.5rem;
          padding: 1rem 0.5rem;
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
    </Link>
  );
};

export default VideoItem;
