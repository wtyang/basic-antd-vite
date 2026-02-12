// 页面组件映射表 — path 标识 → 懒加载组件

import { lazy } from 'react'

export const pageComponentMap: Record<
  string,
  React.LazyExoticComponent<React.ComponentType<any>>
> = {
  // 仪表盘
  'dashboard/index': lazy(() => import('@/pages/dashboard')),

  // 商品管理（演示）
  'demo/product/ProductList': lazy(
    () => import('@/pages/demo/product/ProductList'),
  ),
  'demo/product/ProductDetail': lazy(
    () => import('@/pages/demo/product/ProductDetail'),
  ),
  'demo/product/ProductForm': lazy(
    () => import('@/pages/demo/product/ProductForm'),
  ),

  // 订单管理（演示）
  'demo/order/OrderList': lazy(() => import('@/pages/demo/order/OrderList')),
  'demo/order/OrderDetail': lazy(
    () => import('@/pages/demo/order/OrderDetail'),
  ),

  // 个人中心
  'account/index': lazy(() => import('@/pages/account')),
}
