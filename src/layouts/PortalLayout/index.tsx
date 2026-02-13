import { Layout, Dropdown, type MenuProps, Avatar, Badge } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  AppstoreOutlined,
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
  CaretDownOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { useUserStore } from '@/store';
import styles from './index.module.css';

const { Header, Content } = Layout;

export default function PortalLayout() {
  const navigate = useNavigate();
  const { userInfo, logout } = useUserStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenu: MenuProps['items'] = [
    {
      key: 'settings',
      label: '个人设置',
      icon: <SettingOutlined />,
      onClick: () => navigate('/account/settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.logo} onClick={() => navigate('/portal')}>
          <AppstoreOutlined
            style={{ fontSize: 28, marginRight: 12, color: '#1890ff' }}
          />
          <span>统一应用门户</span>
        </div>
        <div className={styles.headerRight}>
          <div
            className={styles.actionItem}
            onClick={() => navigate('/dashboard')}
          >
            <HomeOutlined className={styles.icon} />
            <span>进入工作台</span>
          </div>
          <div
            className={styles.actionItem}
            onClick={() => navigate('/account/center')}
          >
            <UserOutlined className={styles.icon} />
            <span>用户中心</span>
          </div>
          <div className={styles.actionItem}>
            <Badge count={5} size="small" offset={[2, -2]}>
              <BellOutlined
                className={styles.icon}
                style={{ fontSize: 18, color: 'rgba(255,255,255,0.85)' }}
              />
            </Badge>
          </div>
          <Dropdown menu={{ items: userMenu }} placement="bottomRight">
            <div className={styles.userDropdown}>
              <Avatar
                size="small"
                className={styles.avatar}
                icon={<UserOutlined />}
                src={userInfo?.avatar}
              />
              <span className={styles.userName}>
                {userInfo?.username || '用户'}
              </span>
              <CaretDownOutlined
                style={{
                  fontSize: 10,
                  marginLeft: 6,
                  color: 'rgba(255,255,255,0.65)',
                }}
              />
            </div>
          </Dropdown>
        </div>
      </Header>
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  );
}
