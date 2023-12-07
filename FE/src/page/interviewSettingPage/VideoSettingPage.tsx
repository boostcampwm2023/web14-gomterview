import { videoSetting } from '@/atoms/interviewSetting';
import useMedia from '@/hooks/useMedia';
import { theme } from '@/styles/theme';
import { Mirror } from '@common/index';
import { RecordStatus } from '@components/interviewPage/InterviewHeader';
import {
  Description,
  InterviewSettingFooter,
} from '@components/interviewSettingPage';
import { css } from '@emotion/react';
import { Button } from '@foundation/index';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

type VideoSettingPageProps = {
  onNextClick?: () => void;
  onPrevClick?: () => void;
  isCurrentPage: boolean;
};

const VideoSettingPage: React.FC<VideoSettingPageProps> = ({
  onNextClick,
  onPrevClick,
  isCurrentPage,
}) => {
  const [videoSettingState, setVideoSettingState] =
    useRecoilState(videoSetting);

  const {
    videoRef: mirrorVideoRef,
    connectStatus,
    media,
    startMedia,
    stopMedia,
  } = useMedia();

  useEffect(() => {
    if (isCurrentPage && !media) {
      void startMedia();
      return;
    }

    return () => {
      if (!isCurrentPage && media) stopMedia();
    };
  }, [isCurrentPage, media, startMedia, stopMedia]);

  useEffect(() => {
    if (connectStatus === 'connect') {
      setVideoSettingState({
        isSuccess: true,
      });
    } else {
      setVideoSettingState({
        isSuccess: false,
      });
    }
  }, [connectStatus, setVideoSettingState]);

  return (
    <>
      <Description title="문제 선택">
        - 면접 시작 전, 사용하시는 장치의 화면 및 소리가 정상적으로 연결되어
        있는지 확인해 주세요.
        <br />
        - 헤드셋이나 이어폰을 사용하시면 더욱 명료한 소리로 면접에 참여하실 수
        있습니다.
        <br />
        - 화면이나 소리에 문제가 있을 경우, 잠시 면접을 중단하시고 문제를 해결한
        뒤 이어나가 주세요.
        <br />- 기타 기술적인 문제나 화면 공유 문제가 있으시면, 채팅창이나
        연락처를 통해 알려주시길 바랍니다.
      </Description>
      <div
        css={css`
          position: relative;
          margin-top: 2rem;
          height: 100%;
        `}
      >
        <div
          css={css`
            position: absolute;
            top: 1rem;
            left: 1rem;
            z-index: ${theme.zIndex.contentOverlay.overlay5};
            padding: 0.5rem;
            border-radius: 0.5rem;
            background-color: ${theme.colors.shadow.modalShadow};
          `}
        >
          <RecordStatus isRecording={connectStatus === 'connect'} />
        </div>
        <Mirror
          mirrorVideoRef={mirrorVideoRef}
          connectStatus={connectStatus}
          reloadMedia={() => void startMedia()}
          isSetting
        />
      </div>

      <InterviewSettingFooter>
        <Button
          onClick={onPrevClick}
          size="lg"
          css={css`
            padding: 0.6rem 2rem;
          `}
        >
          이전
        </Button>
        <Button
          onClick={onNextClick}
          size="lg"
          css={css`
            padding: 0.6rem 2rem;
          `}
          disabled={!videoSettingState.isSuccess}
        >
          다음
        </Button>
      </InterviewSettingFooter>
    </>
  );
};

export default VideoSettingPage;
