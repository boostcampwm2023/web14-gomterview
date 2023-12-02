import { questionSetting } from '@/atoms/interviewSetting';
import { QuestionSelectionBox } from '@common/index';
import { InterviewSettingFooter } from '@components/interviewSettingPage';
import { css } from '@emotion/react';
import { Button } from '@foundation/index';
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
      <div
        css={css`
          margin-top: 2rem;
        `}
      >
        <QuestionSelectionBox />
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
          disabled={!setting.isSuccess}
        >
          다음
        </Button>
      </InterviewSettingFooter>
    </>
  );
};

export default QuestionSettingPage;
