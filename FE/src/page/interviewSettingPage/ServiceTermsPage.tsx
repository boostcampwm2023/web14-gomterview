import { serviceTerms } from '@atoms/interviewSetting';
import { Description } from '@components/interviewSettingPage';
import { CheckBox } from '@foundation/index';
import { useRecoilState } from 'recoil';
import InterviewSettingContentLayout from '@components/interviewSettingPage/InterviewSettingContentLayout';

type ServiceTermsPageProps = {
  onNextClick?: () => void;
  onPrevClick?: () => void;
};

const ServiceTermsPage: React.FC<ServiceTermsPageProps> = ({
  onNextClick,
  onPrevClick,
}) => {
  const [{ isSuccess }, setServiceTerms] = useRecoilState(serviceTerms);

  const toggleIsChecked = () =>
    setServiceTerms(({ isSuccess }, ...args) => ({
      isSuccess: !isSuccess,
      ...args,
    }));
  return (
    <InterviewSettingContentLayout
      onPrevClick={onPrevClick}
      onNextClick={onNextClick}
      disabledNext={!isSuccess}
    >
      <Description title="서비스 이용약관 동의">
        본 서비스는 사용자의 면접 과정을 녹화해주는 서비스로 해당 과정을
        촬영하기 위해서 카메라 및 음성에 대한 권한이 필요합니다.
        <br />
        사용자는 해당 권한을 통해 촬영된 영상을 직접 다운로드 받거나 서버에
        저장하여 나중에 다시 볼 수 있습니다.
        <br />
        해당 녹화본은 사용자의 개인정보로서 외부에 공개되지 않으며, 사용자가
        직접 공개하기 위해서는 별도의 공개 설정을 통해 공개할 수 있습니다.
        <br />
        참여자는 해당 약관에 대해서 거부할 수 있지만 거부시에 해당 서비스를
        이용하지 못합니다.
      </Description>
      <CheckBox
        id="terms-checkbox"
        checked={isSuccess}
        onInputChange={toggleIsChecked}
      >
        동의 하시겠습니까?
      </CheckBox>
    </InterviewSettingContentLayout>
  );
};

export default ServiceTermsPage;
