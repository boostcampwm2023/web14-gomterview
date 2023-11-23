import { questionSetting } from '@/atoms/interviewSetting';
import Button from '@/components/foundation/Button/Button';
import Description from '@/components/interviewSettingPage/Description';
import QuestionSelectionBox from '@common/QuestionSelectionBox/QuestionSelectionBox';
import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';

type QuestionSettingPageProps = {
  onNextClick?: () => void;
  onPrevClick?: () => void;
};

const QuestionSettingPage: React.FC<QuestionSettingPageProps> = ({
  onNextClick,
  onPrevClick,
}) => {
  const setting = useRecoilValue(questionSetting);

  return (
    <>
      <Description title="문제 선택">
        - 주어진 카테고리 중에서 관련 있는 문제를 선택해 주세요.
        <br />
        - 자신의 경험과 능력을 가장 잘 보여줄 수 있는 문제를 골라주세요.
        <br />
        - 문제 선택이 완료되면, 제출 버튼을 눌러 주세요.
        <br />
        - 선택한 문제에 대해 충분히 준비해 오시길 바랍니다.
        <br />
        🍀 행운을 빕니다! 여러분과의 면접을 기대하겠습니다!
      </Description>
      <div
        css={css`
          margin-top: 2rem;
        `}
      >
        <QuestionSelectionBox />
      </div>
      <div
        css={css`
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
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
          disabled={!setting.isSuccess}
        >
          다음
        </Button>
      </div>
    </>
  );
};

export default QuestionSettingPage;
