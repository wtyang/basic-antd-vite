// 主题配色选择器组件

import { Drawer, ColorPicker, Switch, Space, Typography, Divider } from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';
import { useAppStore } from '@/store';
import { themePresets } from '@/config/themePresets';

const { Text } = Typography;

interface ThemePickerProps {
  open: boolean;
  onClose: () => void;
}

export default function ThemePicker({ open, onClose }: ThemePickerProps) {
  const {
    themeMode,
    colorPrimary,
    compact,
    setThemeMode,
    setColorPrimary,
    setCompact,
  } = useAppStore();

  return (
    <Drawer title="主题设置" open={open} onClose={onClose} width={300}>
      {/* 亮暗模式 */}
      <div style={{ marginBottom: 24 }}>
        <Text strong>暗色模式</Text>
        <Switch
          style={{ marginLeft: 12 }}
          checked={themeMode === 'dark'}
          onChange={(checked) => setThemeMode(checked ? 'dark' : 'light')}
        />
      </div>

      {/* 紧凑模式 */}
      <div style={{ marginBottom: 24 }}>
        <Text strong>紧凑模式</Text>
        <Switch
          style={{ marginLeft: 12 }}
          checked={compact}
          onChange={setCompact}
        />
      </div>

      <Divider>预设配色</Divider>

      {/* 预设颜色方案 */}
      <Space wrap size={12}>
        {themePresets.map((preset) => (
          <div
            key={preset.colorPrimary}
            onClick={() => setColorPrimary(preset.colorPrimary)}
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              backgroundColor: preset.colorPrimary,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border:
                colorPrimary === preset.colorPrimary
                  ? '3px solid #000'
                  : '2px solid transparent',
              transition: 'all 0.2s',
            }}
            title={preset.name}
          >
            {colorPrimary === preset.colorPrimary && (
              <BgColorsOutlined style={{ color: '#fff', fontSize: 18 }} />
            )}
          </div>
        ))}
      </Space>

      <Divider>自定义颜色</Divider>

      {/* 自定义颜色选择器 */}
      <ColorPicker
        value={colorPrimary}
        onChange={(_, hex) => setColorPrimary(hex)}
        showText
        size="large"
      />
    </Drawer>
  );
}
