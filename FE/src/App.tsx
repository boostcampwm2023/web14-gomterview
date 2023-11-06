import styled from '@emotion/styled';
import { css } from '@emotion/react';

const EmotionStyledDiv = styled.div`
  color: red;
`;

function App() {
  return (
    <div>
      asdfasdfasdfasdfasdfasdfasdf
      <EmotionStyledDiv>hihi</EmotionStyledDiv>Hello
      Worasdfasasdfasdfdflasdfasdfasdfasdasdfasdfasdfasdfasdfasdf
      <div
        css={css`
          color: blue;
        `}
      >
        Styled with Emotion!
      </div>
    </div>
  );
}
export default App;
