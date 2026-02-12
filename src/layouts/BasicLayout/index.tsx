// 主布局 — 基于 ProLayout

import { Suspense, useMemo } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ProLayout } from '@ant-design/pro-components';
import {
  DashboardOutlined,
  ShoppingOutlined,
  OrderedListOutlined,
  UserOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { useAppStore, useMenuStore } from '@/store';
import { filterVisibleMenus } from '@/utils/menuHelper';
import HeaderRight from '../components/HeaderRight';
import SystemNotice from '../components/SystemNotice';
import Loading from '@/components/Loading';
import type { MenuItem } from '@/types/api';

// 图标映射表
const iconMap: Record<string, React.ReactNode> = {
  DashboardOutlined: <DashboardOutlined />,
  ShoppingOutlined: <ShoppingOutlined />,
  OrderedListOutlined: <OrderedListOutlined />,
  UserOutlined: <UserOutlined />,
  AppstoreOutlined: <AppstoreOutlined />,
};

// 将后端菜单转换为 ProLayout menuData 格式
function convertMenuToRoute(menus: MenuItem[]): {
  path?: string;
  name?: string;
  icon?: React.ReactNode;
  children?: ReturnType<typeof convertMenuToRoute>;
}[] {
  return menus.map((item) => ({
    path: item.path,
    name: item.name,
    icon: item.icon ? iconMap[item.icon] || <AppstoreOutlined /> : undefined,
    children: item.children?.length
      ? convertMenuToRoute(item.children)
      : undefined,
  }));
}

export default function BasicLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { collapsed, setCollapsed } = useAppStore();
  const { menus } = useMenuStore();

  // 过滤隐藏菜单并转换格式
  const menuData = useMemo(() => {
    const visible = filterVisibleMenus(menus);
    return convertMenuToRoute(visible);
  }, [menus]);

  return (
    <ProLayout
      title={import.meta.env.VITE_APP_TITLE || '后台管理系统'}
      logo={null}
      layout="mix"
      location={{ pathname: location.pathname }}
      collapsed={collapsed}
      onCollapse={setCollapsed}
      menuDataRender={() => menuData}
      menuItemRender={(item, dom) => (
        <div onClick={() => item.path && navigate(item.path)}>{dom}</div>
      )}
      headerContentRender={() => <SystemNotice />}
      actionsRender={() => [<HeaderRight key="header-right" />]}
      token={{
        sider: {
          colorMenuBackground: 'transparent',
        },
      }}
      style={{ minHeight: '100vh' }}
    >
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </ProLayout>
  );
}
