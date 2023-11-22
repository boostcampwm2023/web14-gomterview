import Description from '@/components/interviewSettingPage/Description';
import RecordRadio from '@/components/interviewSettingPage/RecordPage/RecordRadio';
import { css } from '@emotion/react';
import Button from '@foundation/Button/Button';

type RecordSettingPageProps = {
  onNextClick?: () => void;
  onPrevClick?: () => void;
};

const RecordSettingPage: React.FC<RecordSettingPageProps> = ({
  onNextClick,
  onPrevClick,
}) => {
  return (
    <div
      css={css`
        padding-top: 3rem;
      `}
    >
      <Description title="녹화 설정">
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
          max-width: 30rem;
          margin: 5rem auto;

          display: flex;
          flex-direction: column;
          gap: 2rem;
        `}
      >
        <RecordRadio group="record" IconId="save-idrive">
          서버에 저장
        </RecordRadio>
        <RecordRadio group="record" IconId="save-local">
          로컬에 저장
        </RecordRadio>
        <RecordRadio group="record" IconId="save-not">
          저장하지 않음
        </RecordRadio>
      </div>
      <div
        css={css`
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
        `}
      >
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
        >
          다음
        </Button>
      </div>
    </div>
  );
};
export default RecordSettingPage;
