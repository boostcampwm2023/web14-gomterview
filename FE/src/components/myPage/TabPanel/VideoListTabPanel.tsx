import { PATH } from '@constants/path';
import { css } from '@emotion/react';
import { Box } from '@foundation/index';
import useDeleteVideoMutation from '@hooks/apis/mutations/useDeleteVideoMutation';
import useVideoListQuery from '@hooks/apis/queries/useVideoListQuery';
import { theme } from '@styles/theme';
import dayjs from 'dayjs';
import { useState } from 'react';
import DeleteCheckModal from '../DeleteCheckModal';
import Thumbnail from '../Thumbnail';
import { VideoItem } from '../VideoItem';
import useModal from '@hooks/useModal';

const VideoListTabPanel: React.FC = () => {
  const { data } = useVideoListQuery();
  const { mutate } = useDeleteVideoMutation();

  const [selectedVideoId, setSelectVideoId] = useState<number | null>(null);

  const { openModal: openDeleteCheckModal, closeModal: closeDeleteCheckModal } =
    useModal(() => {
      return (
        <DeleteCheckModal
          content="영상을 삭제 하시겠습니까?"
          closeModal={closeDeleteCheckModal}
          confirmModal={handleConfirmModal}
        />
      );
    });

  const handleDeleteIconClick = (videoId: number) => {
    openDeleteCheckModal();
    setSelectVideoId(videoId);
  };

  const handleConfirmModal = () => {
    selectedVideoId && mutate(selectedVideoId);
    closeDeleteCheckModal();
  };

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
          <Thumbnail
            image={video.thumbnail ?? ''}
            videoName={video.videoName}
            videoLength={video.videoLength}
            onDeleteIconClick={() => handleDeleteIconClick(video.id)}
          />
        </VideoItem>
      ))}
    </Box>
  );
};

export default VideoListTabPanel;
