import TabPanelItem from './QuestionTabPanelItem';
import { useRecoilState } from 'recoil';
import { QuestionAnswerSelectionModal } from '@atoms/modal';
import AnswerSelectionModal from './AnswerSelectionModal/AnswerSelectionModal';
import useWorkbookTitleListQuery from '@hooks/apis/queries/useWorkbookTitleListQuery';
import QuestionTabList from '@common/QuestionSelectionBox/QuestionTabList';
import WorkbookAddButton from '@common/QuestionSelectionBox/WorkbookAddButton';
import { Box, Tabs } from '@foundation/index';
import { theme } from '@styles/theme';
import {
  QuestionSelectionBoxSidebarAreaDiv,
  QuestionSelectionBoxTabPanelAreaDiv,
} from '@common/QuestionSelectionBox/QuestionSelectionBox.styles';
import { css } from '@emotion/react';
import { useState } from 'react';
import useBreakpoint from '@hooks/useBreakPoint';

const QuestionSelectionBox = () => {
  const isDeviceBreakpoint = useBreakpoint();

  const { data: workbookListData } = useWorkbookTitleListQuery();
  const [
    { isOpen: isQuestionAnswerSelectionModalOpen, workbookId, question },
    setModalState,
  ] = useRecoilState(QuestionAnswerSelectionModal);

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  if (!workbookListData) return;
  return (
    <>
      {workbookId && question && (
        <AnswerSelectionModal
          isOpen={isQuestionAnswerSelectionModalOpen}
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
          height: 40rem;
        `}
      >
        <Tabs
          css={css`
            display: flex;
            width: 100%;
            height: 100%;
            row-gap: 1.5rem;
          `}
        >
          <QuestionSelectionBoxSidebarAreaDiv
            isSidebarOpen={isSideBarOpen}
            isTabletWidth={isDeviceBreakpoint('tablet')}
          >
            <WorkbookAddButton />
            <QuestionTabList workbookListData={workbookListData} />
          </QuestionSelectionBoxSidebarAreaDiv>
          <QuestionSelectionBoxTabPanelAreaDiv>
            {workbookListData.map((workbook, index) => (
              <TabPanelItem
                key={workbook.workbookId}
                tabIndex={index.toString()}
                workbook={workbook}
                isSidebarOpen={isSideBarOpen}
                onSidebarToggleClick={() => setIsSideBarOpen((prev) => !prev)}
              />
            ))}
          </QuestionSelectionBoxTabPanelAreaDiv>
        </Tabs>
      </Box>
    </>
  );
};

export default QuestionSelectionBox;
