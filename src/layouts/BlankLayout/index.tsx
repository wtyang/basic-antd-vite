// 空白布局 — 用于登录、SSO 回调等无导航页面

import { Outlet } from 'react-router-dom'

export default function BlankLayout() {
  return <Outlet />
}
