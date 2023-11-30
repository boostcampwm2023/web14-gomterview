import { theme } from '@styles/theme';
import { css } from '@emotion/react';
import TabPanelItem from './QuestionTabPanelItem';
import { useRecoilState } from 'recoil';
import { QuestionAnswerSelectionModal } from '@atoms/modal';
import AnswerSelectionModal from './AnswerSelectionModal/AnswerSelectionModal';
import { Box, Tabs } from '@foundation/index';
import useWorkbookTitleListQuery from '@hooks/apis/queries/useWorkbookTitleListQuery';
import { useState } from 'react';
import QuestionTabList from '@common/QuestionSelectionBox/QuestionTabList';

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
          <QuestionTabList
            workbookListData={workbookListData}
            onTabChange={(_, value) => setSelectedTabIndex(value)}
          />
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
