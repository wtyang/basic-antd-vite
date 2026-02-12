// 顶部右侧操作区

import { useState } from 'react'
import { Avatar, Dropdown, Space, Badge } from 'antd'
import type { MenuProps } from 'antd'
import {
  UserOutlined,
  LogoutOutlined,
  BgColorsOutlined,
  BellOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store'
import { logout as apiLogout } from '@/api/modules/auth'
import { useMenuStore } from '@/store'
import GlobalSearch from '../GlobalSearch'
import ThemePicker from '../ThemePicker'

import styles from './index.module.css'

export default function HeaderRight() {
  const navigate = useNavigate()
  const { userInfo, logout } = useUserStore()
  const { clearMenus } = useMenuStore()
  const [themeOpen, setThemeOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await apiLogout()
    } catch {
      // 即使退出接口失败，也清理本地状态
    }
    logout()
    clearMenus()
    navigate('/login', { replace: true })
  }

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <SettingOutlined />,
      label: '个人中心',
      onClick: () => navigate('/account'),
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ]

  return (
    <Space size={8} align="center">
      {/* 全局搜索 */}
      <GlobalSearch />

      {/* 主题设置 */}
      <div className={styles.actionItem} onClick={() => setThemeOpen(true)}>
        <BgColorsOutlined className={styles.icon} />
      </div>

      {/* 通知 */}
      <div className={styles.actionItem}>
        <Badge count={5} size="small">
          <BellOutlined className={styles.icon} />
        </Badge>
      </div>

      {/* 用户菜单 */}
      <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
        <div className={styles.avatarItem}>
          <Avatar size="small" icon={<UserOutlined />} src={userInfo?.avatar} />
          <span style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.85)' }}>
            {userInfo?.nickname || userInfo?.username || '用户'}
          </span>
        </div>
      </Dropdown>

      {/* 主题设置抽屉 */}
      <ThemePicker open={themeOpen} onClose={() => setThemeOpen(false)} />
    </Space>
  )
}
