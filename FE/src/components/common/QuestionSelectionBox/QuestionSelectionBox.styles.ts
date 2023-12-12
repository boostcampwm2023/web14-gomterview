import { css, keyframes } from '@emotion/react';
import { theme } from '@styles/theme';
import styled from '@emotion/styled';

export const hideSidebar = keyframes`
  from {
    flex: 0 0 15rem;
  }
  to {
    flex: 0 0 0;
  }
`;

export const showSidebar = keyframes`
  from {
    flex: 0 0 0;
  }
  to {
    flex: 0 0 15rem;
  }
`;

export const QuestionSelectionBoxSidebarAreaDiv = styled.div<{
  isSidebarToggleOn: boolean;
  isTabletWidth: boolean;
}>`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  padding: 1.5rem 0;
  border-radius: 1rem 0 0 1rem;
  background-color: ${theme.colors.surface.default};
  overflow-y: auto;
  flex: 1 1 15rem;
  animation: ${(props) =>
    props.isSidebarToggleOn && props.isTabletWidth
      ? css`
          ${hideSidebar} 0.3s ease-in-out forwards
        `
      : css`
          ${showSidebar} 0.3s ease-in-out forwards
        `}}
`;

export const QuestionSelectionBoxTabPanelAreaDiv = styled.div`
  flex: 1 1 calc(100% - 15rem);
  overflow-x: hidden;
`;
