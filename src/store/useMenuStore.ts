// Zustand Store — 动态菜单、路由数据

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MenuItem } from '@/types/api';

interface MenuState {
  // 状态
  menus: MenuItem[];
  menuLoaded: boolean;

  // 操作
  setMenus: (menus: MenuItem[]) => void;
  clearMenus: () => void;
}

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      menus: [],
      menuLoaded: false,

      setMenus: (menus: MenuItem[]) => {
        set({ menus, menuLoaded: true });
      },

      clearMenus: () => {
        set({ menus: [], menuLoaded: false });
      },
    }),
    {
      name: 'admin_menu_store',
      partialize: (state) => ({
        menus: state.menus,
      }),
    },
  ),
);
