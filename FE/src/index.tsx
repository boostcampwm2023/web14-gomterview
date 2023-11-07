import ReactDOM from 'react-dom/client';
import { worker } from '@/mocks/browser';
import App from '@/App';

async function deferRender() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  return worker.start();
}

deferRender()
  .then(() => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      const root = ReactDOM.createRoot(rootElement);
      root.render(<App />);
    } else {
      console.error('Root element not found');
    }
  })
  .catch((err) => {
    console.error('Failed to start mock service worker', err);
  });
