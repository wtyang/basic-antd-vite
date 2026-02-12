import type { RouteObject } from 'react-router-dom'

// 路由元信息
export interface RouteMeta {
  title: string
  icon?: string
  hidden?: boolean
  access?: string | string[]
}

// 扩展路由类型
export type AppRouteObject = RouteObject & {
  meta?: RouteMeta
  children?: AppRouteObject[]
}
