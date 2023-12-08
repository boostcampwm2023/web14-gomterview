import { keyframes } from '@emotion/react';

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
