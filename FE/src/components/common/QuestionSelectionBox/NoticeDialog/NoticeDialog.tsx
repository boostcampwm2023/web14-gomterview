import { Box, Button, Icon, Typography } from '@foundation/index';
import { css, keyframes } from '@emotion/react';
import { theme } from '@styles/theme';
import { PATH } from '@constants/path';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ShowDialog = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const NoticeDialog = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;
  return (
    <Box
      css={css`
        position: fixed;
        left: 1rem;
        bottom: 1rem;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        row-gap: 0.5rem;
        margin-right: 30rem;
        padding: 1rem;
        width: 15rem;
        height: auto;
        background-color: ${theme.colors.surface.default};
        z-index: ${theme.zIndex.contentOverlay.overlay3};
        animation: 1s cubic-bezier(0.5, 1.5, 0.5, 1) 0s 1 ${ShowDialog};
      `}
    >
      <Button
        variants="secondary"
        size="sm"
        onClick={() => setVisible(false)}
        css={css`
          position: absolute;
          top: 0.75rem;
          right: 0.5rem;
          display: flex;
          border: none;
          z-index: ${theme.zIndex.contentOverlay.overlay5};
        `}
      >
        <Icon id="close-black" />
      </Button>
      <Typography variant="body1">
        원하는 질문이 없나요?
        <br />
        다른 사람이 만든 면접 세트를 가져오거나
        <br />새 면접 세트를 만들어보세요
      </Typography>
      <Link to={PATH.WORKBOOK}>
        <Button size="sm">면접 세트 보러가기</Button>
      </Link>
    </Box>
  );
};

export default NoticeDialog;
