import { questionSetting } from '@/atoms/interviewSetting';
import Button from '@/components/foundation/Button/Button';
import Tabs from '@/components/foundation/Tabs';
import Typography from '@/components/foundation/Typography/Typography';
import { theme } from '@/styles/theme';
import { Category } from '@/types/category';
import { css } from '@emotion/react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import QuestionAccordion from './QuestionAccordion';
import useQuestionCategoryQuery from '@/hooks/queries/useQuestionCategoryQuery';

type TabPanelItemProps = {
  selectedTabIndex: string;
  tabIndex: string;
  category: Category;
};

const TabPanelItem: React.FC<TabPanelItemProps> = ({
  selectedTabIndex,
  category,
  tabIndex,
}) => {
  const [onlySelectedOption, setOnlySelectedOption] = useState(false);

  const toggleShowSelectionOption = () => {
    setOnlySelectedOption((prev) => !prev);
  };

  const { data: questionAPIData } = useQuestionCategoryQuery({
    categoryId: category.id,
    enabled: selectedTabIndex === tabIndex,
  });

  const settingPage = useRecoilValue(questionSetting);
  const selectedQuestions = settingPage.selectedData.filter(
    (question) => question.categoryId === category.id
  );

  const questionData = onlySelectedOption ? selectedQuestions : questionAPIData;
  if (!questionData) return;

  return (
    <Tabs.TabPanel
      key={`category.id-${category.id}`}
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
              categoryId={category.id}
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
          `}
        >
          <Button
            css={css`
              margin-left: auto;
            `}
            size="sm"
            onClick={toggleShowSelectionOption}
          >
            선택된 질문만 보기
          </Button>
        </div>
      </div>
    </Tabs.TabPanel>
  );
};

export default TabPanelItem;
