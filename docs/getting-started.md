# 快速上手指南

欢迎使用 **admin-react-vite** 基础架构。本项目基于 Vite 6 + React 19 + Ant Design v6 构建，旨在提供一套高性能、高标准、开箱即用的后台管理系统底座。

## 🚀 环境准备

- **Node.js**: 推荐 `>= 20.19.0` (本项目使用 `.nvmrc` 指定版本)
- **包管理器**: 推荐使用 `npm` (本项目配置有 `.npmrc` 以确保依赖安装一致性)

## 📦 安装与启动

1. **安装依赖**

   ```bash
   npm install
   ```

2. **启动开发服务器**

   ```bash
   npm run dev
   ```

   > 访问地址：`http://localhost:5173`

3. **构建生产环境**
   ```bash
   npm run build
   ```

## 📂 项目结构

```text
src/
├── api/              # API 接口请求封装
├── components/       # 通用业务组件
├── config/           # 路由、主题、页面组件映射配置
├── hooks/            # 自定义 React Hooks
├── layouts/          # 布局组件（BasicLayout / BlankLayout）
├── pages/            # 页面组件
├── store/            # 状态管理 (Zustand)
├── types/            # TypeScript 类型定义
└── utils/            # 通用工具函数
```

## 🔑 核心功能

- **动态路由**：菜单和路由均从后端获取，前端通过 `pageComponentMap` 自动匹配加载。
- **权限控制**：支持路由级权限和按钮级权限 (`Access` 组件)。
- **主题系统**：支持一键切换品牌色、亮暗模式。
- **Mock 系统**：集成 MSW，支持前后端并行开发。
- **代码规范**：集成 ESLint 9 + Stylelint + Prettier + Husky。
