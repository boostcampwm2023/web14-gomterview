import Modal from '@foundation/Modal';
import Typography from '@foundation/Typography/Typography';
import { truncateText } from '@/utils/textUtils';
import { css } from '@emotion/react';
import ShareRangeSetting from '@components/interviewVideoPage/Modal/ShareRangeSetting';
import { useState } from 'react';
import VideoShareModalFooter from '@components/interviewVideoPage/Modal/VideoShareModalFooter';

type VideoShareModalProps = {
  videoId: number;
  videoName: string;
  isOpen: boolean;
  closeModal: () => void;
};
const VideoShareModal: React.FC<VideoShareModalProps> = ({
  videoId,
  videoName,
  isOpen,
  closeModal,
}) => {
  const [isPublic, setIsPublic] = useState(false);

  const handleVideoShareToggleClick = () => {
    setIsPublic(!isPublic);
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          row-gap: 1.5rem;
          padding: 1.5rem;
        `}
      >
        <Typography variant="title3">
          {`"${truncateText(videoName, 15)}" 공유`}
        </Typography>
        <ShareRangeSetting
          isPublic={isPublic}
          onClick={handleVideoShareToggleClick}
        />
        <VideoShareModalFooter closeModal={closeModal} />
      </div>
    </Modal>
  );
};

export default VideoShareModal;
