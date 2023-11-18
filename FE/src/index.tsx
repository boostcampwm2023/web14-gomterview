import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga4';
import { worker } from '@/mocks/browser';
import App from '@/App';

async function deferRender() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  return worker.start();
}

//GA 추적 태그 설정
if (process.env.REACT_APP_GTAG_ID) {
  ReactGA.initialize(process.env.REACT_APP_GTAG_ID);
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
