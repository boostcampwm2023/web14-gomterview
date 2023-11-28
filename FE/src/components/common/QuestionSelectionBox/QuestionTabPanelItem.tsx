import { questionSetting } from '@atoms/interviewSetting';
import { theme } from '@styles/theme';
import { css } from '@emotion/react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import QuestionAccordion from './QuestionAccordion';
import useQuestionCategoryQuery from '@/hooks/apis/queries/useQuestionCategoryQuery';
import { Typography, Toggle, Tabs } from '@foundation/index';
import { WorkbookTitleListResDto } from '@/types/workbook';
import { ExcludeArray } from '@/types/utils';

type TabPanelItemProps = {
  selectedTabIndex: string;
  tabIndex: string;
  workbook: ExcludeArray<WorkbookTitleListResDto>;
};

const TabPanelItem: React.FC<TabPanelItemProps> = ({
  selectedTabIndex,
  workbook,
  tabIndex,
}) => {
  const settingPage = useRecoilValue(questionSetting);
  const selectedQuestions = settingPage.selectedData.filter(
    (question) => question.workbookId === workbook.workbookId
  );

  const [onlySelectedOption, setOnlySelectedOption] = useState(false);

  const toggleShowSelectionOption = () => {
    setOnlySelectedOption((prev) => !prev);
  };

  const { data: questionAPIData } = useQuestionCategoryQuery({
    categoryId: workbook.workbookId,
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
        <Typography
          component="p"
          variant="body3"
          color={theme.colors.text.subStrong}
          css={css`
            padding: 1rem;
          `}
        >
          {questionData.length}개의 질문
        </Typography>
        <div
          css={css`
            height: 100%;
            overflow-y: auto;
            flex: 1;
            padding: 1rem;
          `}
        >
          {questionData.map((question) => (
            <QuestionAccordion
              question={question}
              key={question.questionId}
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
