// Zustand Store — 用户信息、Token、权限

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserInfo } from '@/types/api';
import {
  getToken,
  setToken,
  // @ts-ignore
  removeToken,
  setRefreshToken,
  clearAuth,
} from '@/utils/auth';

interface UserState {
  // 状态
  token: string | undefined;
  userInfo: UserInfo | null;
  permissions: string[];

  // 操作
  setTokenAction: (token: string, refreshToken?: string) => void;
  setUserInfo: (info: UserInfo) => void;
  setPermissions: (permissions: string[]) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: getToken(),
      userInfo: null,
      permissions: [],

      setTokenAction: (token: string, refreshTokenVal?: string) => {
        setToken(token);
        if (refreshTokenVal) setRefreshToken(refreshTokenVal);
        set({ token });
      },

      setUserInfo: (info: UserInfo) => {
        set({ userInfo: info });
      },

      setPermissions: (permissions: string[]) => {
        set({ permissions });
      },

      logout: () => {
        clearAuth();
        set({ token: undefined, userInfo: null, permissions: [] });
      },
    }),
    {
      name: 'admin_user_store',
      partialize: (state) => ({
        token: state.token,
        userInfo: state.userInfo,
        permissions: state.permissions,
      }),
    },
  ),
);
