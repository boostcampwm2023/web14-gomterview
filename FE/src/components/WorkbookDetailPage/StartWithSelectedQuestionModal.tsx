import { WorkbookEntity } from '@/types/workbook';
import { css } from '@emotion/react';
import Modal from '@foundation/Modal';
import { Button, CheckBox } from '@foundation/index';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { questionSetting, serviceTerms } from '@atoms/interviewSetting';
import { Question } from '@/types/question';
import { PATH } from '@constants/path';
import { Description } from '@components/interviewSettingPage';
import { toast } from '@foundation/Toast/toast';

const StartWithSelectedQuestionModal = ({
  closeModal,
  questions,
  workbookData,
}: {
  closeModal: () => void;
  questions: Question[];
  workbookData: WorkbookEntity;
}) => {
  const navigate = useNavigate();
  const [, setSelectedQuestions] = useRecoilState(questionSetting);
  const [{ isSuccess }, setServiceTerms] = useRecoilState(serviceTerms);

  const toggleIsChecked = () =>
    setServiceTerms(({ isSuccess }, ...args) => ({
      isSuccess: !isSuccess,
      ...args,
    }));

  const addNewWorkbook = () => {
    setSelectedQuestions({
      isSuccess: questions.length >= 1,
      selectedData: questions.map((question) => ({
        ...question,
        workbookId: workbookData.workbookId,
      })),
      from: 'workbook',
    });
    toast.success('선택한 문제집으로 면접을 시작합니다!');
  };

  const handleStartInterview = () => {
    try {
      addNewWorkbook();
      closeModal();

      navigate(PATH.INTERVIEW_SETTING_CONNECTION);
    } catch (error) {
      console.error('문제집 복사 중 오류 발생', error);
      throw error;
    }
  };

  return (
    <Modal closeModal={closeModal} isOpen={true}>
      <Modal.content>
        <div
          css={css`
            max-width: 600px;
          `}
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
            css={css`
              margin-top: 2rem;
            `}
            id="terms-checkbox"
            checked={isSuccess}
            onInputChange={toggleIsChecked}
          >
            동의 하시겠습니까?
          </CheckBox>
        </div>
      </Modal.content>
      <Modal.footer>
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
          `}
        >
          <Button
            onClick={() => void handleStartInterview()}
            size="lg"
            css={css`
              padding: 0.6rem 2rem;
            `}
            disabled={!isSuccess}
          >
            다음
          </Button>
        </div>
      </Modal.footer>
    </Modal>
  );
};

export default StartWithSelectedQuestionModal;
