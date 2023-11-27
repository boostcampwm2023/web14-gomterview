import Box from '@foundation/Box/Box';
import { theme } from '@styles/theme';
import { css } from '@emotion/react';
import Typography from '@foundation/Typography/Typography';

import Tabs from '@foundation/Tabs';
import { useState } from 'react';
import SelectionBox from '@foundation/SelectionBox/SelectionBox';
import TabPanelItem from './QuestionTabPanelItem';
import useCategoryQuery from '@/hooks/apis/queries/useCategoryQuery';
import AnswerSelectionModal from '@common/QuestionSelectionBox/AnswerSelectionModal/AnswerSelectionModal';
import { useRecoilState } from 'recoil';
import { QuestionAnswerSelectionModal } from '@atoms/modal';

const QuestionSelectionBox = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState('0');

  const { data: categoriesAPIData } = useCategoryQuery();

  const [{ isOpen, categoryId, question }, setModalState] = useRecoilState(
    QuestionAnswerSelectionModal
  );

  if (!categoriesAPIData) return;

  const myQuestionID = categoriesAPIData.customCategory.id;
  const categoryData = [
    ...categoriesAPIData.categories,
    categoriesAPIData.customCategory,
  ];

  return (
    <>
      {categoryId && question && (
        <AnswerSelectionModal
          isOpen={isOpen}
          categoryId={categoryId}
          question={question}
          closeModal={() =>
            setModalState((pre) => ({
              ...pre,
              isOpen: false,
            }))
          }
        />
      )}
      <Box
        css={css`
          background-color: ${theme.colors.surface.inner};
          width: 100%;
          height: 30rem;
        `}
      >
        <Tabs
          initialValue={selectedTabIndex}
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
            onTabChange={(_, value) => setSelectedTabIndex(value)}
          >
            {categoryData.map((category, index) => (
              <Tabs.Tab value={index.toString()} key={category.id}>
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
              width: 100%;
              max-width: calc(100% - 12rem);
            `}
          >
            {categoryData.map((category, index) => (
              <TabPanelItem
                selectedTabIndex={selectedTabIndex}
                tabIndex={index.toString()}
                category={category}
                type={category.id === myQuestionID ? 'custom' : 'default'}
                key={category.id}
              />
            ))}
          </div>
        </Tabs>
      </Box>
    </>
  );
};

export default QuestionSelectionBox;
