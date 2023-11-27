import { IconButton } from '@common/VideoPlayer';
import { LoadingBounce, StartButton } from '@common/index';
import {
  InterviewVideoPageLayout,
  PrivateVideoPlayer,
} from '@components/interviewVideoPage';
import { VideoShareModal } from '@components/interviewVideoPage/ShareRangeModal';
import { CenterLayout } from '@components/layout';
import { css } from '@emotion/react';
import useVideoItemQuery from '@hooks/apis/queries/useVideoItemQuery';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

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
      {!data ? (
        //TODO 로딩화면 일단 임시로 처리
        <CenterLayout>
          <LoadingBounce />
        </CenterLayout>
      ) : (
        <>
          <PrivateVideoPlayer {...data} />
          <VideoShareModal
            videoId={Number(data.id)}
            videoName={data.videoName}
            hash={data.hash}
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
