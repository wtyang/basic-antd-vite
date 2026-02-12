import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { startVersionCheck } from '@/utils/versionChecker';

// 启动版本检测轮询
startVersionCheck();

async function enableMocking() {
  const isDev = import.meta.env.MODE === 'development';
  // 允许通过环境变量强制开启 Mock (用于演示)
  const enableMocks = import.meta.env.VITE_ENABLE_MOCKS === 'true';

  if (!isDev && !enableMocks) {
    return;
  }

  const { worker } = await import('./mocks/browser');
  return worker
    .start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        // 兼容 GitHub Pages 等子路径部署
        url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
      },
    })
    .catch((err) => {
      console.error('[MSW] worker start failed:', err);
    });
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
