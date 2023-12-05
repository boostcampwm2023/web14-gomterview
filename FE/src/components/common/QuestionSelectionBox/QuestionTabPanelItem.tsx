import { questionSetting } from '@atoms/interviewSetting';
import { theme } from '@styles/theme';
import { css } from '@emotion/react';
import { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import useQuestionWorkbookQuery from '@hooks/apis/queries/useQuestionWorkbookQuery';
import { Typography, Toggle, Tabs, CheckBox } from '@foundation/index';
import { WorkbookTitleListResDto } from '@/types/workbook';
import { ExcludeArray } from '@/types/utils';
import QuestionSelectionBoxAccordion from './QuestionSelectionBoxAccordion';
import QuestionAddForm from '@common/QuestionSelectionBox/QuestionAddForm';
import QuestionTabPanelHeader from '@common/QuestionSelectionBox/QuestionTabPanelHeader';
import WorkbookEditModeDialog from '@common/QuestionSelectionBox/WorkbookEditModeDialog';
import useOutsideClick from '@hooks/useOutsideClick';
import useWorkbookQuestionDelete from '@hooks/useWorkbookQuestionDelete';

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
  const settingPage = useRecoilValue(questionSetting);
  const selectedQuestions = settingPage.selectedData.filter(
    (question) => question.workbookId === workbook.workbookId
  );

  const [onlySelectedOption, setOnlySelectedOption] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

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
  const {
    addCheckedQuestion,
    resetCheckedQuestion,
    deleteCheckedQuestion,
    isCheckedQuestion,
    checkQuestionCount,
  } = useWorkbookQuestionDelete(workbook.workbookId);

  const handleQuestionChecked = (questionId: number) => {
    isEditMode && addCheckedQuestion(questionId);
  };

  const handleCancelEditMode = () => {
    resetCheckedQuestion();
    setIsEditMode(false);
  };

  const handleDeleteQuestion = async () => {
    await deleteCheckedQuestion();
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
        <div
          css={css`
            padding: 0 1rem;
          `}
        >
          <QuestionAddForm workbookId={workbook.workbookId} />
        </div>
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
                  checked={isCheckedQuestion(question.questionId)}
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
            count={checkQuestionCount()}
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
