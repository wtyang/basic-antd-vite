// 动态路由渲染器 — 在主布局内匹配动态路由

import { Suspense } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useMenuStore } from '@/store';
import { pageComponentMap } from '@/config/pageComponentMap';
import { flattenMenus } from '@/utils/menuHelper';
import Loading from '@/components/Loading';
import Page404 from '@/pages/exception/404';

/**
 * 动态路由渲染器
 * 根据当前路径在菜单数据中查找 component 并渲染对应页面
 */
export default function DynamicRouteRenderer() {
  const location = useLocation();
  const menus = useMenuStore((s) => s.menus);
  const menuLoaded = useMenuStore((s) => s.menuLoaded);

  // 菜单未加载时显示 Loading
  if (!menuLoaded) {
    return <Loading />;
  }

  // 扁平化菜单，查找当前路径对应的菜单项
  const flatMenus = flattenMenus(menus);

  // 精确匹配
  let matched = flatMenus.find((m) => m.path === location.pathname);

  // 路径参数匹配（如 /demo/product/detail/:id）
  if (!matched) {
    matched = flatMenus.find((m) => {
      if (!m.path) return false;
      const pathParts = m.path.split('/');
      const locationParts = location.pathname.split('/');
      if (pathParts.length !== locationParts.length) return false;
      return pathParts.every(
        (part, i) => part.startsWith(':') || part === locationParts[i],
      );
    });
  }

  if (matched?.component && pageComponentMap[matched.component]) {
    const LazyComponent = pageComponentMap[matched.component];
    return (
      <Suspense fallback={<Loading />}>
        <LazyComponent />
      </Suspense>
    );
  }

  // 处理一些直接在 pageComponentMap 中注册但不在菜单中的路径
  // 例如详情页、编辑页等子路由
  for (const [componentKey, LazyComponent] of Object.entries(
    pageComponentMap,
  )) {
    // 简单路径匹配：去掉开头的斜杠的组件路径
    const componentPath = `/${componentKey.replace(/\./g, '/')}`;
    if (location.pathname.startsWith(componentPath.split('/:')[0])) {
      const pathPattern = componentPath.split('/');
      const actualPath = location.pathname.split('/');
      if (pathPattern.length <= actualPath.length) {
        return (
          <Suspense fallback={<Loading />}>
            <LazyComponent />
          </Suspense>
        );
      }
    }
  }

  // 没有找到匹配的路由 → 404
  // 如果是根路径，跳转到仪表盘
  if (location.pathname === '/') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Page404 />;
}
