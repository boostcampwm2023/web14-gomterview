import { Global, ThemeProvider } from '@emotion/react';
import { theme } from '@styles/theme';
import _global from '@styles/_global';
import AppRouter from '@/AppRouter'; // AppRouter를 임포트합니다.

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={_global} />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
