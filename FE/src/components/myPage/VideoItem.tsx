import Typography from '@foundation/Typography/Typography';
import { css } from '@emotion/react';
import { theme } from '@styles/theme';

type VideoItemProps = {
  image: string;
  videoLength: string;
  videoName: string;
  date: string;
};

const VideoItem: React.FC<VideoItemProps> = ({
  image,
  videoName,
  videoLength,
  date,
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          position: relative;
          display: inline-block;

          &::after {
            content: '${videoLength}';
            position: absolute;
            right: 0.75rem;
            bottom: 0.75rem;
            //TODO 이 부분 색상은 성인님 작업 부분과 겹칠 것 같아 일단 하드코딩했습니다.
            background: rgba(0, 0, 0, 0.7);
            font-size: 0.875rem;
            color: ${theme.colors.text.white};
            padding: 0.25rem;
            border-radius: 0.25rem;
          }
        `}
      >
        <img
          src={image}
          alt={videoName}
          css={css`
            aspect-ratio: 3 / 2;
            width: 100%;
            height: auto;
            object-fit: cover;
            border-radius: 1rem;
          `}
        />
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          padding: 1rem;
        `}
      >
        <Typography variant="body2">{videoName}</Typography>
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
