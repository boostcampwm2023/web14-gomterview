import Box from '@/components/foundation/Box/Box';
import Button from '@/components/foundation/Button/Button';
import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import Typography from '@/components/foundation/Typography/Typography';

import { useQuery } from '@tanstack/react-query';
import { getCategory } from '@/apis/category';
import QuestionItem from './QuestionListItem';
import Tabs from '@/components/foundation/Tabs';
import { useState } from 'react';
import SelectionBox from '@/components/foundation/SelectionBox/SelectionBox';
import { getQuestion } from '@/apis/question';
import { useRecoilState } from 'recoil';
import { questionSetting } from '@/atoms/interviewSetting';
import { Category } from '@/types/category';

const QuestionSelectionBox = () => {
  const [tabIndex, setTabIndex] = useState('1');
  //TODO: 현재 선택된 값은 임의 값임 Tabs를 변경한다면 가장 먼저 수정해야 할 사안.
  // HOW: 해당 state는 몇번째 Tab을 클릭했는지 저장하는 state이다. 따라서 Index값을 가지고 있고 이를 바탕으로 questionAPI 데이터를 가져와야 한다.

  const [showSelectionOption, setShowSelectionOption] = useState(false);

  const toggleShowSelectionOption = () => {
    setShowSelectionOption((prev) => !prev);
  };

  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategory,
  });

  const [selectedQuestions, setSelectedQuestions] =
    useRecoilState(questionSetting);

  // jsx 부분은 panel부분과 sidebar 부분으로 나누어서 관리하는게 좋을것 같음
  return (
    <Box
      css={css`
        background-color: ${theme.colors.surface.inner};
        width: 100%;
        height: 40rem;
      `}
    >
      <Tabs
        initialValue={tabIndex}
        css={css`
          display: flex;
          width: 100%;
          height: 100%;
          row-gap: 1.5rem;
        `}
      >
        <Tabs.TabList
          name="category"
          css={css`
            background-color: ${theme.colors.surface.default};
            width: 12rem;
            border-radius: 1rem 0 0 1rem;
            padding-top: 6rem;
            display: flex;
            flex-direction: column;
            > * {
              margin-bottom: 1rem;
            }
          `}
          onTabChange={(_, value) => setTabIndex(value)}
        >
          {categoryData?.map((category, index) => (
            <Tabs.Tab value={category.id.toString()} key={category.id}>
              <SelectionBox
                id={`category-${category.id.toString()}`}
                name="category"
                defaultChecked={index === 0}
              >
                <Typography variant="title4">{category.name}</Typography>
              </SelectionBox>
            </Tabs.Tab>
          ))}
        </Tabs.TabList>

        <div
          css={css`
            position: relative;
            padding: 1rem;
            width: 100%;
            max-width: calc(100% - 12rem);
          `}
        >
          {categoryData?.map((category, index) => (
            <TabPanelItem
              tabIndex={tabIndex}
              tabValue={index.toString()}
              category={category}
              key={category.id}
            />
          ))}
          ;
          <div
            css={css`
              display: flex;
              justify-content: flex-end;
              position: absolute;
              bottom: 0;
              right: 0;
              padding: 1rem;
              width: 100%;
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
      </Tabs>
    </Box>
  );
};

export default QuestionSelectionBox;

type TabPanelItemProps = {
  tabIndex: string;
  tabValue: string;
  category: Category;
};

const TabPanelItem: React.FC<TabPanelItemProps> = ({
  tabIndex,
  category,
  tabValue,
}) => {
  const { data: questionData } = useQuery({
    queryKey: ['questions', tabValue],
    queryFn: () => getQuestion(Number(tabValue)),
    enabled: tabIndex === tabValue,
  });

  // option 형태에 따라서 보여지는 데이터가 달라짐 따라서 해당 부분에 대한 변수 하나를 토대로 데이터를 변경하는 로직 필요
  // 대충 갂는데 얼마나 걸릴려나

  return (
    <>
      <Tabs.TabPanel
        key={`category.id-${category.id}`}
        value={tabValue}
        css={css`
          margin-top: 2rem;
          max-height: 90%;
          overflow-y: auto;
        `}
      >
        <Typography
          component="p"
          variant="body3"
          color={theme.colors.text.subStrong}
          css={css`
            position: absolute;
            top: 1rem;
          `}
        >
          {questionData?.length}개의 질문
        </Typography>
        {questionData &&
          questionData.map((question) => (
            <QuestionItem
              question={question}
              key={question.questionId}
              categoryId={category.id}
            />
          ))}
      </Tabs.TabPanel>
    </>
  );
};
