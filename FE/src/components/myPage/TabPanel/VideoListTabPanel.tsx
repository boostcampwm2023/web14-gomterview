import dayjs from 'dayjs';
import Box from '@foundation/Box/Box';
import { css } from '@emotion/react';
import VideoItem from '@components/myPage/VideoItem/VideoItem';
import Thumbnail from '@components/myPage/Thumbnail';
import CardCover from '@foundation/CardCover/CardCover';
import useVideoListQuery from '@hooks/queries/video/useVideoListQuery';
import { PATH } from '@constants/path';
import { theme } from '@styles/theme';

const VideoListTabPanel: React.FC = () => {
  const { data } = useVideoListQuery();

  if (!data) return <div>로딩중</div>;

  return (
    <Box
      css={css`
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-content: center;
        gap: 1.5rem;
        padding: 1.5rem;
        @media (max-width: ${theme.breakpoints.tablet}) {
          grid-template-columns: 1fr;
          padding: 1rem;
        }
      `}
    >
      {data.map((video) => (
        <VideoItem
          key={video.id}
          videoName={video.videoName}
          date={dayjs(Number(video.createdAt)).format('YYYY-MM-DD')}
          path={`${PATH.INTERVIEW_VIDEO(video.id)}`}
        >
          <CardCover borderRadius="1rem">
            <Thumbnail
              image={video.thumbnail}
              videoName={video.videoName}
              videoLength={video.videoLength}
            />
          </CardCover>
        </VideoItem>
      ))}
    </Box>
  );
};

export default VideoListTabPanel;
