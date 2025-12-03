import './app/styles/index.css';

import { App } from './app';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/features/theme';

const queryClient = new QueryClient();

const rootElement = document.getElementById('root');

async function enableMocking() {
  // MSW 비활성화
  return;
}

enableMocking().then(() => {
  if (rootElement) {
    createRoot(rootElement).render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>,
    );
  }
});
