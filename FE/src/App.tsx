import { Global, ThemeProvider } from '@emotion/react';
import { theme } from '@styles/theme';
import _global from '@styles/_global';
import AppRouter from '@/AppRouter'; // AppRouter를 임포트합니다.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={_global} />
        <AppRouter />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
