import { Global, ThemeProvider } from '@emotion/react';
import { theme } from '@styles/theme';
import _global from '@styles/_global';
import routes from '@/AppRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import GlobalSVGProvider from '@/GlobalSvgProvider';
import { RouterProvider } from 'react-router-dom';

function App() {
  const queryClient = new QueryClient();
  const router = routes({ queryClient });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <Global styles={_global} />
          <RouterProvider router={router} />
          <GlobalSVGProvider />
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
