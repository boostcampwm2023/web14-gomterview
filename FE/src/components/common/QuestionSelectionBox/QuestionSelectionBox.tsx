import { theme } from '@styles/theme';
import { css } from '@emotion/react';
import { useState } from 'react';
import TabPanelItem from './QuestionTabPanelItem';
import { useRecoilState } from 'recoil';
import { QuestionAnswerSelectionModal } from '@atoms/modal';
import AnswerSelectionModal from './AnswerSelectionModal/AnswerSelectionModal';
import { Box, SelectionBox, Tabs, Typography } from '@foundation/index';
import useWorkbookTitleListQuery from '@hooks/apis/queries/useWorkbookTitleListQuery';

const QuestionSelectionBox = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState('0');

  const { data: workbookListData } = useWorkbookTitleListQuery();

  const [{ isOpen, workbookId, question }, setModalState] = useRecoilState(
    QuestionAnswerSelectionModal
  );

  if (!workbookListData) return;
  return (
    <>
      {workbookId && question && (
        <AnswerSelectionModal
          isOpen={isOpen}
          workbookId={workbookId}
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
              display: block;
              width: 12rem;
              padding-top: 1rem;
              border-radius: 1rem 0 0 1rem;
              background-color: ${theme.colors.surface.default};
              overflow-y: auto;
              > * {
                margin-bottom: 1rem;
              }
            `}
            onTabChange={(_, value) => setSelectedTabIndex(value)}
          >
            {workbookListData.map((workbook, index) => (
              <Tabs.Tab value={index.toString()} key={workbook.workbookId}>
                <SelectionBox
                  id={`workbook-${workbook.workbookId.toString()}`}
                  name="workbook"
                  defaultChecked={index === 0}
                >
                  <Typography variant="title4">{workbook.title}</Typography>
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
            {workbookListData.map((workbook, index) => (
              <TabPanelItem
                selectedTabIndex={selectedTabIndex}
                tabIndex={index.toString()}
                workbook={workbook}
                key={workbook.workbookId}
              />
            ))}
          </div>
        </Tabs>
      </Box>
    </>
  );
};

export default QuestionSelectionBox;
