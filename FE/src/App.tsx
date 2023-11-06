import styled from '@emotion/styled';
import { css, ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';

const EmotionStyledDiv = styled.div`
  color: red;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        asdfasdfasdfasdfasdfasdfasdf
        <EmotionStyledDiv>hihi</EmotionStyledDiv>Hello
        Worasdfasasdfasdfdflasdfasdfasdfasdasdfasdfasdfasdfasdfasdf
        <div
          css={css`
            color: ${theme.colors.point.primary};
          `}
        >
          Styled with Emotion!
        </div>
      </div>
    </ThemeProvider>
  );
}
export default App;
