import { questionSetting } from '@atoms/interviewSetting';
import { theme } from '@styles/theme';
import { css } from '@emotion/react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import useQuestionWorkbookQuery from '@hooks/apis/queries/useQuestionWorkbookQuery';
import { Typography, Toggle, Tabs, Button } from '@foundation/index';
import { WorkbookTitleListResDto } from '@/types/workbook';
import { ExcludeArray } from '@/types/utils';
import QuestionSelectionBoxAccordion from './QuestionSelectionBoxAccordion';
import QuestionAddForm from '@common/QuestionSelectionBox/QuestionAddForm';
import useUserInfo from '@hooks/useUserInfo';

type TabPanelItemProps = {
  selectedTabIndex: string;
  tabIndex: string;
  workbook: ExcludeArray<WorkbookTitleListResDto>;
  onEditButtonClick: (workbookId: number) => void;
};

const TabPanelItem: React.FC<TabPanelItemProps> = ({
  selectedTabIndex,
  workbook,
  tabIndex,
  onEditButtonClick,
}) => {
  const userInfo = useUserInfo();
  const settingPage = useRecoilValue(questionSetting);
  const selectedQuestions = settingPage.selectedData.filter(
    (question) => question.workbookId === workbook.workbookId
  );

  const [onlySelectedOption, setOnlySelectedOption] = useState(false);

  const toggleShowSelectionOption = () => {
    setOnlySelectedOption((prev) => !prev);
  };

  const { data: questionAPIData } = useQuestionWorkbookQuery({
    workbookId: workbook.workbookId,
    enabled: selectedTabIndex === tabIndex,
  });

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
        css={css`
          display: flex;
          flex-direction: column;
          height: 100%;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 0.5rem;
            padding: 1rem;
          `}
        >
          <Typography variant="title4">{workbook.title}</Typography>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <Button
              variants="secondary"
              size="sm"
              onClick={() => onEditButtonClick(workbook.workbookId)}
              css={css`
                display: flex;
                align-items: center;
                column-gap: 0.5rem;
              `}
            >
              면접 세트 수정
            </Button>
            <Typography
              component="p"
              variant="body3"
              color={theme.colors.text.subStrong}
            >
              {questionData.length}개의 질문
            </Typography>
          </div>
        </div>

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
            height: 100%;
            overflow-y: auto;
            flex: 1;
            padding: 1rem;
          `}
        >
          {questionData.map((question) => (
            <QuestionSelectionBoxAccordion
              key={question.questionId}
              question={question}
              workbookId={workbook.workbookId}
            />
          ))}
        </div>
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
