// 路由守卫组件

import { useLocation, Navigate } from 'react-router-dom'
import { useUserStore, useMenuStore } from '@/store'
import { getUserMenus } from '@/api/modules/auth'
import { useEffect } from 'react'

// 无需鉴权的白名单路由
const WHITE_LIST = ['/login', '/sso/callback']

interface AuthGuardProps {
  children: React.ReactNode
}

/**
 * 路由守卫 — 检查登录状态
 * - 未登录 → 跳转登录页
 * - 已登录访问登录页 → 跳转首页
 */
export default function AuthGuard({ children }: AuthGuardProps) {
  const location = useLocation()
  const token = useUserStore((s) => s.token)
  const menuLoaded = useMenuStore((s) => s.menuLoaded)

  // 菜单未加载时自动获取
  useEffect(() => {
    if (token && !menuLoaded) {
      getUserMenus()
        .then((res) => {
          const { menus, permissions } = res.data
          useMenuStore.getState().setMenus(menus)
          useUserStore.getState().setPermissions(permissions)
        })
        .catch(() => {
          // 获取失败（如 Token 过期），通常由拦截器处理
        })
    }
  }, [token, menuLoaded])

  const isWhiteListed = WHITE_LIST.some((path) =>
    location.pathname.startsWith(path),
  )

  // 白名单路由直接放行
  if (isWhiteListed) {
    // 已登录用户访问登录页，跳转首页
    if (token && location.pathname === '/login') {
      return <Navigate to="/" replace />
    }
    return <>{children}</>
  }

  // 未登录跳转到登录页
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  // 菜单未加载时显示 Loading/放行
  if (!menuLoaded) {
    // 如果正在加载（上面副作用已触发），显示 Loading
    // 或者 BasicLayout 会处理 Loading，但这里 Loading 更早
    // 为避免闪烁，可以渲染个全局 Loading
    // return <Loading />
    // 但因为 DynamicRouteRenderer 会处理 Loading，这里放行即可，让子路由去渲染 Loading
    return <>{children}</>
  }

  return <>{children}</>
}
