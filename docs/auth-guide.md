# 认证与权限指南

## 🛡️ 认证方案

本项目支持两类认证模式，通过环境变量 `VITE_AUTH_MODE` 切换：

### 1. JWT 模式 (`VITE_AUTH_MODE=jwt`)

- 传统的账号密码登录。
- 后端返回 `accessToken` 和 `refreshToken`。
- 前端在 `request.ts` 拦截器中自动注入 `Authorization` 头。

### 2. SSO 模式 (`VITE_AUTH_MODE=sso`)

- 单点登录，点击登录会重定向至 SSO 服务商。
- 认证成功后回调至 `/sso/callback`，由前端处理 Code。

## 🔑 权限控制

### 1. 路由权限

前端不维护路由列表，数据完全由 `GET /api/user/menus` 动态获取。

- 若后端未返回某路由，用户即无法通过界面或输入 URL 访问（由 `useDynamicRoutes` 保证）。

### 2. 按钮级权限

使用 `Access` 组件进行细粒度控制：

```tsx
import Access from '@/components/Access'

;<Access permission="user:add">
  <Button>新增用户</Button>
</Access>
```

- **超级管理员**：拥有 `*:*:*` 权限的用户将自动获得所有权限。
- **逻辑判断**：支持 `any` 或 `all` 模式（默认 `any` 满足任一即可）。
