// 路由配置入口

import { createBrowserRouter, Navigate } from 'react-router-dom'
import BasicLayout from '@/layouts/BasicLayout'
import BlankLayout from '@/layouts/BlankLayout'
import AuthGuard from './AuthGuard'
import LoginPage from '@/pages/login'
import SsoCallback from '@/pages/login/SsoCallback'
import Page403 from '@/pages/exception/403'
import Page404 from '@/pages/exception/404'
import DynamicRouteRenderer from './DynamicRouteRenderer'

const router = createBrowserRouter([
  // 无布局路由 — 登录、SSO 回调
  {
    element: <BlankLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/sso/callback', element: <SsoCallback /> },
    ],
  },
  // 主布局路由 — 需要鉴权
  {
    element: (
      <AuthGuard>
        <BasicLayout />
      </AuthGuard>
    ),
    children: [
      // 默认跳转仪表盘
      { index: true, element: <Navigate to="/dashboard" replace /> },
      // 异常页面
      { path: '/403', element: <Page403 /> },
      // 动态路由渲染器
      { path: '*', element: <DynamicRouteRenderer /> },
    ],
  },
  // 全局 404
  { path: '*', element: <Page404 /> },
])

export default router
