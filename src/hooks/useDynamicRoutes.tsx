// 动态路由生成 Hook

import { useMemo, Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'
import { useMenuStore } from '@/store'
import { pageComponentMap } from '@/config/pageComponentMap'
import type { MenuItem } from '@/types/api'
import Loading from '@/components/Loading'
import Page404 from '@/pages/exception/404'

/**
 * 将后端菜单树转换为 React Router 路由配置
 */
function menuToRoutes(menus: MenuItem[]): RouteObject[] {
  const routes: RouteObject[] = []

  const traverse = (items: MenuItem[]) => {
    items.forEach((item) => {
      if (item.component && pageComponentMap[item.component]) {
        const LazyComponent = pageComponentMap[item.component]
        routes.push({
          path: item.path,
          element: (
            <Suspense fallback={<Loading />}>
              <LazyComponent />
            </Suspense>
          ),
        })
      }
      if (item.children?.length) {
        traverse(item.children)
      }
    })
  }

  traverse(menus)

  // 添加通配路由（404）
  routes.push({ path: '*', element: <Page404 /> })

  return routes
}

/**
 * 动态路由 Hook — 根据菜单数据生成路由配置
 */
export function useDynamicRoutes(): RouteObject[] {
  const menus = useMenuStore((s) => s.menus)
  return useMemo(() => menuToRoutes(menus), [menus])
}
