import Box from '@foundation/Box/Box';
import { css } from '@emotion/react';
import VideoItem from '@components/myPage/VideoItem';
import Thumbnail from '@components/myPage/Thumbnail';
import CardCover from '@foundation/CardCover/CardCover';

const VideoListBox: React.FC = () => {
  return (
    <Box
      css={css`
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-content: center;
        gap: 1.5rem;
        padding: 1.5rem;
      `}
    >
      <VideoItem
        videoName="배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요"
        date="2001.07.17"
      >
        <CardCover borderRadius="1rem">
          <Thumbnail
            image="https://avatars.githubusercontent.com/u/66554167?v=4"
            videoName="배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요"
            videoLength="03:20"
          />
        </CardCover>
      </VideoItem>
      <VideoItem videoName="배고파" date="2001.07.17">
        <CardCover borderRadius="1rem">
          <Thumbnail
            image="https://avatars.githubusercontent.com/u/66554167?v=4"
            videoName="배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요"
            videoLength="03:20"
          />
        </CardCover>
      </VideoItem>
      <VideoItem
        videoName="배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요"
        date="2001.07.17"
      >
        <CardCover borderRadius="1rem">
          <Thumbnail
            image="https://avatars.githubusercontent.com/u/66554167?v=4"
            videoName="배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요배고파요"
            videoLength="03:20"
          />
        </CardCover>
      </VideoItem>
    </Box>
  );
};

export default VideoListBox;
