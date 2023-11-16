import { theme } from '@styles/theme';
import { css } from '@emotion/react';

type ThumbnailProps = {
  image: string;
  videoLength: string;
  videoName: string;
};

const Thumbnail: React.FC<ThumbnailProps> = ({
  videoName,
  videoLength,
  image,
}) => {
  return (
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
  );
};

export default Thumbnail;
