// Zustand Store — 应用全局状态

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark';

interface AppState {
  // 状态
  collapsed: boolean;
  themeMode: ThemeMode;
  colorPrimary: string;
  compact: boolean;

  // 操作
  toggleCollapsed: () => void;
  setCollapsed: (collapsed: boolean) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setColorPrimary: (color: string) => void;
  setCompact: (compact: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      collapsed: false,
      themeMode: 'light',
      colorPrimary: '#1677ff',
      compact: false,

      toggleCollapsed: () => set((s) => ({ collapsed: !s.collapsed })),
      setCollapsed: (collapsed) => set({ collapsed }),
      setThemeMode: (themeMode) => set({ themeMode }),
      setColorPrimary: (colorPrimary) => set({ colorPrimary }),
      setCompact: (compact) => set({ compact }),
    }),
    {
      name: 'admin_app_store',
    },
  ),
);
