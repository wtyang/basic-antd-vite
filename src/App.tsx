// 应用根组件 — 主题 + 路由

import { useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { App as AntdApp, ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { useAppStore } from '@/store';
import ErrorBoundary from '@/components/ErrorBoundary';
import router from '@/router';

export default function App() {
  const { themeMode, colorPrimary, compact } = useAppStore();

  // 根据用户设置构建主题 Token
  const themeConfig = useMemo(
    () => ({
      algorithm: [
        themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        ...(compact ? [theme.compactAlgorithm] : []),
      ],
      token: {
        colorPrimary,
      },
    }),
    [themeMode, colorPrimary, compact],
  );

  return (
    <ConfigProvider theme={themeConfig} locale={zhCN}>
      <AntdApp>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </AntdApp>
    </ConfigProvider>
  );
}
