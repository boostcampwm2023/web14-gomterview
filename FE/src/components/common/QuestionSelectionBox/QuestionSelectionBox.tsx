import TabPanelItem from './QuestionTabPanelItem';
import { Box, Tabs } from '@foundation/index';
import useWorkbookTitleListQuery from '@hooks/apis/queries/useWorkbookTitleListQuery';
import QuestionTabList from '@common/QuestionSelectionBox/QuestionTabList';
import WorkbookAddButton from '@common/QuestionSelectionBox/WorkbookAddButton';
import { theme } from '@styles/theme';
import {
  QuestionSelectionBoxSidebarAreaDiv,
  QuestionSelectionBoxTabPanelAreaDiv,
} from '@common/QuestionSelectionBox/QuestionSelectionBox.styles';
import { css } from '@emotion/react';
import { useState } from 'react';
import useBreakpoint from '@hooks/useBreakPoint';
import QuestionTabPanelBlank from '@common/QuestionSelectionBox/QuestionTabPanelBlank';

const QuestionSelectionBox = () => {
  const isDeviceBreakpoint = useBreakpoint();

  const { data: workbookListData } = useWorkbookTitleListQuery();

  const [isSidebarToggleOn, setIsSidebarToggleOn] = useState(true);

  if (!workbookListData) return null;
  return (
    <>
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
            isSidebarToggleOn={isSidebarToggleOn}
            isTabletWidth={isDeviceBreakpoint('tablet')}
          >
            <WorkbookAddButton />
            <QuestionTabList workbookListData={workbookListData} />
          </QuestionSelectionBoxSidebarAreaDiv>
          <QuestionSelectionBoxTabPanelAreaDiv>
            {workbookListData.length ? (
              workbookListData.map((workbook, index) => (
                <TabPanelItem
                  key={workbook.workbookId}
                  tabIndex={index.toString()}
                  workbook={workbook}
                  isSidebarOpen={
                    isSidebarToggleOn && isDeviceBreakpoint('tablet')
                  }
                  onSidebarToggleClick={() =>
                    setIsSidebarToggleOn((prev) => !prev)
                  }
                />
              ))
            ) : (
              <QuestionTabPanelBlank />
            )}
          </QuestionSelectionBoxTabPanelAreaDiv>
        </Tabs>
      </Box>
    </>
  );
};

export default QuestionSelectionBox;
