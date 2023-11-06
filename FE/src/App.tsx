import styled from '@emotion/styled';
import { css, Global, ThemeProvider } from '@emotion/react';
import { theme } from '@styles/theme';
import _global from '@styles/_global';

const EmotionStyledDiv = styled.div`
  color: red;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={_global} />
      <div>
        asdfasdfasdfasdfasdfasdfasdf
        <EmotionStyledDiv>hihi</EmotionStyledDiv>Hello
        Worasdfasasdfasdfdflasdfasdfasdfasdasdfasdfasdfasdfasdfasdf
        <div
          css={css`
            color: ${theme.colors.point.primary};
            font-family: 'Pretendard', serif;
            font-weight: 600;
          `}
        >
          Styled with Emotion!
        </div>
      </div>
    </ThemeProvider>
  );
}
export default App;
