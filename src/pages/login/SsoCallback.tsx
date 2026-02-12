// SSO 回调页面

import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Spin, App } from 'antd';
import { ssoLogin, getUserInfo, getUserMenus } from '@/api/modules/auth';
import { useUserStore, useMenuStore } from '@/store';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { UserInfo, MenuResponse, LoginResult } from '@/types/api';

export default function SsoCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { message } = App.useApp();
  const { setTokenAction, setUserInfo, setPermissions } = useUserStore();
  const { setMenus } = useMenuStore();

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
      message.error('SSO 回调缺少 code 参数');
      navigate('/login', { replace: true });
      return;
    }

    const handleCallback = async () => {
      try {
        // 1. Code 换 Token
        const loginRes = await ssoLogin(code);
        const { accessToken, refreshToken } = loginRes.data;
        setTokenAction(accessToken, refreshToken);

        // 2. 获取用户信息
        const userRes = await getUserInfo();
        setUserInfo(userRes.data);

        // 3. 获取菜单和权限
        const menuRes = await getUserMenus();
        const { menus, permissions } = menuRes.data;
        setMenus(menus);
        setPermissions(permissions);

        message.success('登录成功');
        navigate('/', { replace: true });
      } catch {
        message.error('SSO 认证失败');
        navigate('/login', { replace: true });
      }
    };

    handleCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Spin size="large" tip="正在认证..." />
    </div>
  );
}
