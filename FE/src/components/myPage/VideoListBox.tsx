import Box from '@foundation/Box/Box';
import { css } from '@emotion/react';
import VideoItem from '@components/myPage/VideoItem';

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
        image="https://avatars.githubusercontent.com/u/66554167?v=4"
        videoName="배고파요"
        videoLength="03:20"
        date="2001.07.17"
      />
      <VideoItem
        image="https://avatars.githubusercontent.com/u/66554167?v=4"
        videoName="배고파요"
        videoLength="03:20"
        date="2001.07.17"
      />
      <VideoItem
        image="https://avatars.githubusercontent.com/u/66554167?v=4"
        videoName="배고파요"
        videoLength="03:20"
        date="2001.07.17"
      />
    </Box>
  );
};

export default VideoListBox;
