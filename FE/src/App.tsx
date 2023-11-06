import styled from '@emotion/styled';
import { css, Global, ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import resetCss from './styles/resetCss';

const EmotionStyledDiv = styled.div`
  color: red;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={resetCss} />
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
