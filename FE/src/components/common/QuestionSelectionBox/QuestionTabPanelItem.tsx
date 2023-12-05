import { questionSetting } from '@atoms/interviewSetting';
import { theme } from '@styles/theme';
import { css } from '@emotion/react';
import { useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useQuestionWorkbookQuery from '@hooks/apis/queries/useQuestionWorkbookQuery';
import { Typography, Toggle, Tabs, CheckBox } from '@foundation/index';
import { WorkbookTitleListResDto } from '@/types/workbook';
import { ExcludeArray } from '@/types/utils';
import QuestionSelectionBoxAccordion from './QuestionSelectionBoxAccordion';
import QuestionAddForm from '@common/QuestionSelectionBox/QuestionAddForm';
import useUserInfo from '@hooks/useUserInfo';
import QuestionTabPanelHeader from '@common/QuestionSelectionBox/QuestionTabPanelHeader';
import WorkbookEditModeDialog from '@common/QuestionSelectionBox/WorkbookEditModeDialog';
import useOutsideClick from '@hooks/useOutsideClick';
import useDeleteQuestionMutation from '@hooks/apis/mutations/useDeleteQuestionMutation';
import { QUERY_KEY } from '@constants/queryKey';
import { useQueryClient } from '@tanstack/react-query';

type TabPanelItemProps = {
  selectedTabIndex: string;
  tabIndex: string;
  workbook: ExcludeArray<WorkbookTitleListResDto>;
  onWorkbookDelete: () => void;
};

const TabPanelItem: React.FC<TabPanelItemProps> = ({
  selectedTabIndex,
  workbook,
  tabIndex,
  onWorkbookDelete,
}) => {
  const queryClient = useQueryClient();
  const userInfo = useUserInfo();
  const settingPage = useRecoilValue(questionSetting);
  const selectedQuestions = settingPage.selectedData.filter(
    (question) => question.workbookId === workbook.workbookId
  );
  // 비회원 로직 작성시 훅으로 분리할 것을 염두해서 위의 settingPage 변수와 통합하지 않았습니다.
  const [, setSelectedQuestions] = useRecoilState(questionSetting);

  const [onlySelectedOption, setOnlySelectedOption] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [checkedQuestion, setCheckedQuestion] = useState<number[]>([]);

  const tabContentRef = useRef<HTMLDivElement>(null);

  useOutsideClick(tabContentRef, () => {
    handleCancelEditMode();
  });

  const toggleShowSelectionOption = () => {
    setOnlySelectedOption((prev) => !prev);
  };

  const { data: questionAPIData } = useQuestionWorkbookQuery({
    workbookId: workbook.workbookId,
    enabled: selectedTabIndex === tabIndex,
  });
  const { mutateAsync: deleteQuestionAsync } = useDeleteQuestionMutation();

  const handleQuestionChecked = (questionId: number) => {
    isEditMode &&
      setCheckedQuestion((prev) =>
        prev.includes(questionId)
          ? prev.filter((id) => id !== questionId)
          : [...prev, questionId]
      );
  };

  const handleCancelEditMode = () => {
    setCheckedQuestion([]);
    setIsEditMode(false);
  };

  //TODO 비회원 구현할 때 수정 로직 훅으로 분리하기
  const handleDeleteQuestion = async () => {
    await Promise.all(
      checkedQuestion.map((questionId) => {
        return deleteQuestionAsync(questionId);
      })
    );
    void queryClient.invalidateQueries({
      queryKey: QUERY_KEY.WORKBOOK_ID(workbook.workbookId),
    });

    setSelectedQuestions({
      isSuccess: true,
      selectedData: settingPage.selectedData.filter(
        (question) => !checkedQuestion.includes(question.questionId)
      ),
    });
    handleCancelEditMode();
  };

  const questionData = onlySelectedOption ? selectedQuestions : questionAPIData;
  if (!questionData) return;

  return (
    <Tabs.TabPanel
      key={`workbook.id-${workbook.workbookId}`}
      value={tabIndex}
      css={css`
        height: 100%;
      `}
    >
      <div
        ref={tabContentRef}
        css={css`
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
        `}
      >
        <QuestionTabPanelHeader
          workbook={workbook}
          questionLength={questionData.length}
          onWorkbookDelete={onWorkbookDelete}
          onEditButtonClick={() => setIsEditMode(true)}
        />
        {userInfo && (
          <div
            css={css`
              padding: 0 1rem;
            `}
          >
            <QuestionAddForm workbookId={workbook.workbookId} />
          </div>
        )}
        <div
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 1.2rem;
            height: 100%;
            overflow-y: auto;
            flex: 1;
            padding: 1rem;
          `}
        >
          {questionData.map((question) => (
            <div
              key={question.questionId}
              onClick={() => handleQuestionChecked(question.questionId)}
              css={css`
                display: flex;
                align-items: center;
                column-gap: 0.5rem;
              `}
            >
              {isEditMode && (
                <CheckBox
                  id={`question-${question.questionId}`}
                  checked={
                    !!checkedQuestion.find(
                      (questionId) => question.questionId === questionId
                    )
                  }
                  onInputChange={() =>
                    handleQuestionChecked(question.questionId)
                  }
                />
              )}
              <QuestionSelectionBoxAccordion
                key={question.questionId}
                question={question}
                workbookId={workbook.workbookId}
                isSelectable={!isEditMode}
              />
            </div>
          ))}
        </div>
        {isEditMode && (
          <WorkbookEditModeDialog
            count={checkedQuestion.length}
            onCancelClick={handleCancelEditMode}
            onDeleteClick={() => void handleDeleteQuestion()}
          />
        )}
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            width: 100%;
            padding: 1rem;
            background-color: ${theme.colors.surface.default};
            border-radius: 0 0 1rem 0;
          `}
        >
          <div
            onClick={toggleShowSelectionOption}
            css={css`
              display: flex;
              cursor: pointer;
              align-items: center;
              column-gap: 0.25rem;
            `}
          >
            <Toggle
              css={css`
                margin-left: auto;
              `}
              onClick={toggleShowSelectionOption}
              isToggled={onlySelectedOption}
            />
            <Typography variant="body3">선택된 질문만 보기</Typography>
          </div>
        </div>
      </div>
    </Tabs.TabPanel>
  );
};

export default TabPanelItem;
