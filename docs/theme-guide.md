# 主题配置指南

本项目基于 Ant Design v6 的 **Design Token** 体系，提供了高度可定制的主题方案。

## 🎨 运行时切换

用户可以通过顶部的 `ThemePicker` 组件实时切换：

- **品牌色**：内置了多种预设方案，也支持自定义取色。
- **亮/暗模式**：一键切换昼明/黑暗风格。
- **紧凑/松散模式**：调整界面的信息密度。

## 🛠 开发者配置

### 预设方案

在 `src/config/themePresets.ts` 中可以修改或添加全局品牌色方案：

```typescript
export const themePresets = {
  techBlue: { colorPrimary: '#1677ff', ... },
  auroraGreen: { colorPrimary: '#13c2c2', ... },
  // 添加你自己的配色
};
```

### 全局 Token

在 `src/App.tsx` 中也可以对 `ConfigProvider` 的全局配置进行统一调整。

## 💅 样式变量使用

在 CSS Modules 中，你可以直接使用 CSS 变量来访问 antd 的全局 Token（需在 ConfigProvider 开启 `cssVar: true`）。

示例：

```css
.myHeader {
  color: var(--ant-color-primary);
  background: var(--ant-color-bg-container);
}
```
