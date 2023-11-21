import InterviewVideoPageLayout from '@components/interviewVideoPage/InterviewVideoPageLayout';
import { useParams } from 'react-router-dom';
import useVideoItemQuery from '@hooks/queries/video/useVideoItemQuery';
import LoadingBounce from '@common/Loading/LoadingBounce';
import CenterLayout from '@components/layout/CenterLayout';
import StartButton from '@common/StartButton/StartButton';
import { useState } from 'react';
import IconButton from '@common/VideoPlayer/IconButton';
import { css } from '@emotion/react';
import PrivateVideoPlayer from '@components/interviewVideoPage/PrivateVideoPlayer';
import VideoShareModal from '@components/interviewVideoPage/Modal/VideoShareModal';

const InterviewVideoPage: React.FC = () => {
  const { videoId } = useParams();
  const { data, isFetching } = useVideoItemQuery(Number(videoId));
  const [isOpen, setIsOpen] = useState(false);

  return (
    <InterviewVideoPageLayout>
      <div
        css={css`
          margin: 0 auto;
        `}
      >
        <IconButton
          text="영상 공유하기"
          iconName="send"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      {isFetching ? (
        //TODO 로딩화면 일단 임시로 처리
        <CenterLayout>
          <LoadingBounce />
        </CenterLayout>
      ) : (
        <>
          <PrivateVideoPlayer {...data!} />
          <VideoShareModal
            videoId={Number(data!.id)}
            videoName={data!.videoName}
            isPublic={!!data?.hash}
            isOpen={isOpen}
            closeModal={() => setIsOpen(false)}
          />
        </>
      )}
      <StartButton />
    </InterviewVideoPageLayout>
  );
};

export default InterviewVideoPage;
