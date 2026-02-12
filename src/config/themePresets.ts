// 主题预设配色方案

export interface ThemePreset {
  name: string;
  colorPrimary: string;
  colorSuccess?: string;
  colorWarning?: string;
  colorError?: string;
  colorInfo?: string;
}

export const themePresets: ThemePreset[] = [
  {
    name: '科技蓝',
    colorPrimary: '#1677ff',
  },
  {
    name: '极光绿',
    colorPrimary: '#13c2c2',
  },
  {
    name: '活力橙',
    colorPrimary: '#fa8c16',
  },
  {
    name: '典雅紫',
    colorPrimary: '#722ed1',
  },
  {
    name: '商务灰',
    colorPrimary: '#595959',
  },
  {
    name: '中国红',
    colorPrimary: '#f5222d',
  },
];
