// 登录页面

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Form,
  Input,
  Button,
  message,
  Checkbox,
  ConfigProvider,
} from 'antd'
import {
  UserOutlined,
  LockOutlined,
  GlobalOutlined,
} from '@ant-design/icons'
import { login, getUserInfo, getUserMenus } from '@/api/modules/auth'
import { useUserStore, useMenuStore } from '@/store'
import type { LoginParams } from '@/types/api'
import styles from './index.module.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const { setTokenAction, setUserInfo, setPermissions } = useUserStore()
  const { setMenus } = useMenuStore()
  const [loading, setLoading] = useState(false)

  // JWT 普通登录
  const handleLogin = async (values: LoginParams) => {
    setLoading(true)
    try {
      const loginRes = await login(values)
      const { accessToken, refreshToken } = loginRes.data
      setTokenAction(accessToken, refreshToken)

      const userRes = await getUserInfo()
      setUserInfo(userRes.data)

      const menuRes = await getUserMenus()
      const { menus, permissions } = menuRes.data
      setMenus(menus)
      setPermissions(permissions)

      message.success('登录成功')
      navigate('/', { replace: true })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // 密码登录表单
  const PasswordForm = () => (
    <Form
      name="password_login"
      size="large"
      onFinish={handleLogin}
      autoComplete="off"
      style={{ marginTop: '24px' }}
    >
      <div style={{ fontSize: '20px', fontWeight: '500', marginBottom: '24px', color: '#333' }}>
        账号登录
      </div>

      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入手机号/邮箱/会员名' }]}
      >
        <Input
          prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
          placeholder="请输入手机号/邮箱/会员名"
          className={styles.formInput}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password
          prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
          placeholder="请输入登录密码"
          className={styles.formInput}
        />
      </Form.Item>

      <Form.Item>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#D4C5B9', // 统一使用暖米灰
            },
          }}
        >
          <Checkbox>我已阅读并同意《服务条款》和《隐私声明》</Checkbox>
        </ConfigProvider>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          className={styles.submitBtn}
        >
          登 录
        </Button>
      </Form.Item>

      <div style={{ textAlign: 'right', marginTop: '-10px' }}>
        <a style={{ color: '#666' }}>忘记密码？</a>
      </div>
    </Form>
  )

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#A8B8C4', // 冷灰蓝
          fontFamily: "'PingFang SC', 'Source Han Sans CN', sans-serif",
          borderRadius: 8,
        },
      }}
    >
      <div className={styles.container}>
        <div className={styles.overlay} />

        <div className={styles.content}>
          {/* 左侧品牌区 */}
          <div className={styles.leftPanel}>
            <div className={styles.brand}>
              <GlobalOutlined className={styles.logoIcon} />
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Ant Design Admin</div>
                <div style={{ fontSize: '14px', letterSpacing: '4px' }}>开箱即用的后台管理系统</div>
              </div>
              <div className={styles.logoText}>旗舰版</div>
            </div>

            <div style={{ fontSize: '48px', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '24px' }}>
              让开发<br />更简单
            </div>

            <div className={styles.sloganList}>
              <div className={styles.sloganItem}>开箱即用</div>
              <div className={styles.sloganItem}>最佳实践</div>
              <div className={styles.sloganItem}>极致体验</div>
              <div className={styles.sloganItem}>响应式布局</div>
            </div>
          </div>

          {/* 右侧登录区 */}
          <div className={styles.rightPanel} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%' }}>
              <PasswordForm />
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}
