import { questionSetting } from '@/atoms/interviewSetting';
import { QuestionSelectionBox } from '@common/index';
import { useRecoilValue } from 'recoil';
import InterviewSettingContentLayout from '@components/interviewSettingPage/InterviewSettingContentLayout';

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
    <InterviewSettingContentLayout
      onPrevClick={onPrevClick}
      onNextClick={onNextClick}
      disabledNext={!setting.isSuccess}
    >
      <QuestionSelectionBox />
    </InterviewSettingContentLayout>
  );
};

export default QuestionSettingPage;
