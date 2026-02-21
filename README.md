# React + TypeScript + Vite 后台管理系统基础框架

基于 React 19 + TypeScript + Vite + Ant Design 6 的企业级后台管理系统基础框架，开箱即用。

## 框架迁移指南

将此基础框架应用到新项目时，需要修改以下配置项。请按照顺序逐一检查和修改。

---

## 一、项目元数据配置

### 1.1 package.json

**文件位置**: [package.json](package.json)

| 配置项         | 当前值             | 说明             | 修改建议                                           |
| -------------- | ------------------ | ---------------- | -------------------------------------------------- |
| `name`         | `admin-react-vite` | 项目名称         | 改为新项目的 npm 包名，如 `my-project-admin`       |
| `version`      | `1.0.0`            | 项目版本         | 根据实际情况修改，遵循语义化版本规范               |
| `private`      | `true`             | 是否私有包       | 如需发布到 npm，改为 `false` 并添加 `license` 字段 |
| `engines.node` | `>=20.19.0`        | Node.js 版本要求 | 根据团队环境调整                                   |

**示例修改**:

```json
{
  "name": "my-project-admin",
  "version": "1.0.0",
  "description": "我的项目后台管理系统",
  "private": true
}
```

### 1.2 index.html

**文件位置**: [index.html](index.html)

| 配置项                      | 当前值         | 说明             |
| --------------------------- | -------------- | ---------------- |
| `<title>`                   | `后台管理系统` | 浏览器标签页标题 |
| `<meta name="description">` | `后台管理系统` | SEO 描述         |
| `<html lang>`               | `zh-CN`        | 页面语言         |
| `<link rel="icon">`         | `/vite.svg`    | 网站图标         |

**示例修改**:

```html
<title>我的项目管理系统</title>
<meta name="description" content="我的项目后台管理系统" />
<link rel="icon" type="image/svg+xml" href="/my-icon.svg" />
```

---

## 二、环境变量配置

### 2.1 开发环境变量

**文件位置**: [.env.development](.env.development)

| 环境变量                | 当前值                               | 说明                     | 是否必须修改              |
| ----------------------- | ------------------------------------ | ------------------------ | ------------------------- |
| `VITE_APP_TITLE`        | `后台管理系统`                       | 应用标题                 | ✅ 是                     |
| `VITE_API_BASE_URL`     | `/api`                               | API 基础路径             | ✅ 是（根据后端接口调整） |
| `VITE_AUTH_MODE`        | `jwt`                                | 认证方式 (`jwt` / `sso`) | ✅ 是                     |
| `VITE_SSO_AUTHORITY`    | `https://sso.example.com`            | SSO 服务地址             | 使用 SSO 时修改           |
| `VITE_SSO_CLIENT_ID`    | `my-admin-app`                       | SSO 客户端 ID            | 使用 SSO 时修改           |
| `VITE_SSO_REDIRECT_URI` | `http://localhost:5173/sso/callback` | SSO 回调地址             | 使用 SSO 时修改           |
| `VITE_SSO_SCOPE`        | `openid profile`                     | SSO 权限范围             | 使用 SSO 时修改           |

### 2.2 生产环境变量

**文件位置**: [.env.production](.env.production)

| 环境变量            | 当前值         | 说明          | 是否必须修改         |
| ------------------- | -------------- | ------------- | -------------------- |
| `VITE_APP_TITLE`    | `后台管理系统` | 应用标题      | ✅ 是                |
| `VITE_API_BASE_URL` | `/api`         | API 基础路径  | ✅ 是                |
| `VITE_ENABLE_MOCKS` | `true`         | 是否启用 Mock | 生产环境建议 `false` |
| `VITE_AUTH_MODE`    | `jwt`          | 认证方式      | ✅ 是                |
| `VITE_SSO_*`        | -              | SSO 相关配置  | 使用 SSO 时修改      |

### 2.3 环境变量类型声明

**文件位置**: [src/vite-env.d.ts](src/vite-env.d.ts)

如果新增环境变量，需要在 `ImportMetaEnv` 接口中添加类型声明：

```typescript
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_BASE_URL: string;
  // 新增环境变量时在此添加类型声明
  readonly VITE_MY_NEW_VAR: string;
}
```

---

## 三、构建配置

### 3.1 Vite 配置

**文件位置**: [vite.config.ts](vite.config.ts)

| 配置项                                    | 当前值                       | 说明               | 修改场景            |
| ----------------------------------------- | ---------------------------- | ------------------ | ------------------- |
| `base`                                    | `env.VITE_APP_BASE \|\| '/'` | 部署基础路径       | 子目录部署时修改    |
| `server.port`                             | `5173`                       | 开发服务器端口     | 端口冲突时修改      |
| `server.proxy./api.target`                | `http://localhost:3000`      | API 代理目标地址   | ✅ 根据后端地址修改 |
| `build.chunkSizeWarningLimit`             | `1600`                       | chunk 大小警告阈值 | 大型项目可调高      |
| `build.rollupOptions.output.manualChunks` | -                            | 代码分割配置       | 根据项目依赖调整    |

**关键配置修改示例**:

```typescript
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://your-backend-server:8080', // 修改为实际后端地址
      changeOrigin: true,
    },
  },
},
```

### 3.2 TypeScript 配置

**文件位置**: [tsconfig.app.json](tsconfig.app.json)

| 配置项                   | 当前值           | 说明     | 修改场景               |
| ------------------------ | ---------------- | -------- | ---------------------- |
| `compilerOptions.target` | `ES2022`         | 编译目标 | 需兼容旧浏览器时调整   |
| `compilerOptions.lib`    | `ES2022, DOM`    | 编译库   | 需要其他 API 时添加    |
| `compilerOptions.paths`  | `@/*: ["src/*"]` | 路径别名 | 可根据需要添加更多别名 |

---

## 四、源码配置

### 4.1 API 请求配置

**文件位置**: [src/api/request.ts](src/api/request.ts)

| 配置项     | 当前值                              | 说明                 | 是否必须修改            |
| ---------- | ----------------------------------- | -------------------- | ----------------------- |
| `baseURL`  | `import.meta.env.VITE_API_BASE_URL` | API 基础地址         | 通过环境变量配置        |
| `timeout`  | `30000`                             | 请求超时时间（毫秒） | 根据接口响应时间调整    |
| 请求拦截器 | 自动注入 `Bearer Token`             | 认证头格式           | 根据后端要求调整        |
| 响应拦截器 | `code === 0 \|\| code === 200`      | 业务成功判断         | ✅ 根据后端接口规范修改 |

**需要根据后端接口规范修改的部分**:

```typescript
// 业务成功判断逻辑（第47行）
if (data.code === 0 || data.code === 200) {
  // 根据后端实际返回的成功码修改
}

// 401 处理逻辑（第64-75行）
case 401: {
  // 登录过期处理，根据实际登录页路径调整
}
```

### 4.2 存储前缀配置

**文件位置**: [src/utils/storage.ts](src/utils/storage.ts)

| 配置项   | 当前值   | 说明                | 是否必须修改          |
| -------- | -------- | ------------------- | --------------------- |
| `PREFIX` | `admin_` | localStorage 键前缀 | ✅ 建议修改为项目标识 |

**修改示例**:

```typescript
const PREFIX = 'my_project_'; // 避免与其他项目冲突
```

### 4.3 Zustand Store 持久化配置

**文件位置**: [src/store/useAppStore.ts](src/store/useAppStore.ts)

| 配置项         | 当前值            | 说明           | 是否必须修改 |
| -------------- | ----------------- | -------------- | ------------ |
| `persist.name` | `admin_app_store` | 持久化存储键名 | ✅ 建议修改  |

**修改示例**:

```typescript
persist(
  (set) => ({
    /* ... */
  }),
  {
    name: 'my_project_app_store', // 修改为项目唯一标识
  },
);
```

### 4.4 主题预设配置

**文件位置**: [src/config/themePresets.ts](src/config/themePresets.ts)

| 配置项         | 说明                 | 修改场景           |
| -------------- | -------------------- | ------------------ |
| `themePresets` | 主题预设配色方案数组 | 根据项目品牌色调整 |

**修改示例**:

```typescript
export const themePresets: ThemePreset[] = [
  { name: '品牌蓝', colorPrimary: '#1890ff' },
  { name: '品牌绿', colorPrimary: '#52c41a' },
  // 添加或修改主题色
];
```

### 4.5 表格全局配置

**文件位置**: [src/config/table.ts](src/config/table.ts)

| 配置项                | 当前值                       | 说明         |
| --------------------- | ---------------------------- | ------------ |
| `DEFAULT_PAGE_SIZE`   | `50`                         | 默认每页条数 |
| `PAGE_SIZE_OPTIONS`   | `['20', '50', '100', '200']` | 每页条数选项 |
| `globalTableScroll.y` | `calc(100vh - 400px)`        | 表格滚动高度 |

### 4.6 认证配置

**文件位置**: [src/config/auth.ts](src/config/auth.ts)

| 配置项            | 说明     | 修改场景                           |
| ----------------- | -------- | ---------------------------------- |
| `authConfig.mode` | 认证模式 | 通过环境变量 `VITE_AUTH_MODE` 配置 |
| `ssoConfig.*`     | SSO 配置 | 通过环境变量配置                   |

---

## 五、路由与页面配置

### 5.1 页面组件映射表

**文件位置**: [src/config/pageComponentMap.ts](src/config/pageComponentMap.ts)

**说明**: 此文件定义了后端返回的菜单 `component` 字段与前端组件的映射关系。

**必须修改**: 根据新项目的页面结构调整映射关系。

**示例**:

```typescript
export const pageComponentMap: Record<string, React.LazyExoticComponent<...>> = {
  // 仪表盘
  'dashboard/index': lazy(() => import('@/pages/dashboard')),

  // 新增业务页面映射
  'user/list': lazy(() => import('@/pages/user/UserList')),
  'user/detail': lazy(() => import('@/pages/user/UserDetail')),
  'order/list': lazy(() => import('@/pages/order/OrderList')),
};
```

### 5.2 静态路由配置

**文件位置**: [src/router/index.tsx](src/router/index.tsx)

| 配置项               | 说明         | 修改场景           |
| -------------------- | ------------ | ------------------ |
| `/login` 路由        | 登录页       | 保留或修改路径     |
| `/sso/callback` 路由 | SSO 回调页   | 使用 SSO 时保留    |
| `/portal` 路由       | 门户页       | 根据需求保留或删除 |
| 默认跳转             | `/dashboard` | 根据首页需求修改   |

### 5.3 图标映射表

**文件位置**: [src/layouts/BasicLayout/index.tsx](src/layouts/BasicLayout/index.tsx)

**说明**: 定义后端返回的菜单 `icon` 字段与 Ant Design 图标的映射。

**修改示例**:

```typescript
const iconMap: Record<string, React.ReactNode> = {
  DashboardOutlined: <DashboardOutlined />,
  UserOutlined: <UserOutlined />,
  // 添加新图标映射
  OrderOutlined: <OrderedListOutlined />,
};
```

---

## 六、Mock 数据配置

### 6.1 Mock 处理器

**文件位置**: [src/mocks/handlers.ts](src/mocks/handlers.ts)

**说明**: 使用 MSW (Mock Service Worker) 模拟后端接口。

**必须修改**: 根据新项目的接口规范修改 Mock 数据结构。

**关键修改点**:

- `API_PREFIX`: API 路径前缀
- 各接口返回的数据结构
- 菜单数据结构

### 6.2 Mock 启用控制

| 环境变量                  | 说明                          |
| ------------------------- | ----------------------------- |
| `VITE_ENABLE_MOCKS=true`  | 生产环境启用 Mock（演示环境） |
| `VITE_ENABLE_MOCKS=false` | 生产环境禁用 Mock（真实后端） |

---

## 七、CI/CD 配置

### 7.1 GitHub Actions

**文件位置**: [.github/workflows/ci.yml](.github/workflows/ci.yml)

| 配置项                       | 当前值                                  | 说明              | 修改场景             |
| ---------------------------- | --------------------------------------- | ----------------- | -------------------- |
| `branches`                   | `[main, develop]`                       | 触发分支          | 根据分支策略调整     |
| `node-version`               | `[22.x]`                                | Node.js 版本      | 根据项目要求调整     |
| `VITE_APP_BASE`              | `/${{ github.event.repository.name }}/` | 部署基础路径      | 子目录部署时自动设置 |
| `peaceiris/actions-gh-pages` | -                                       | GitHub Pages 部署 | 根据部署平台调整     |

### 7.2 GitLab CI

**文件位置**: [.gitlab-ci.yml](.gitlab-ci.yml)

| 配置项     | 当前值                               | 说明         |
| ---------- | ------------------------------------ | ------------ |
| `image`    | `node:22-alpine`                     | Docker 镜像  |
| `stages`   | `install, lint, test, build, deploy` | CI 阶段      |
| `deploy_*` | 注释状态                             | 部署任务模板 |

---

## 八、代码规范配置

### 8.1 ESLint 配置

**文件位置**: [eslint.config.js](eslint.config.js)

| 配置项     | 说明                                           | 修改场景         |
| ---------- | ---------------------------------------------- | ---------------- | ---------------------- |
| `ignores`  | `['dist', 'public/**']`                        | 忽略目录         | 添加其他需要忽略的目录 |
| 自定义规则 | 如 `@typescript-eslint/no-explicit-any: 'off'` | 根据团队规范调整 |

### 8.2 Prettier 配置

**文件位置**: [.prettierrc.json](.prettierrc.json)

| 配置项          | 当前值 | 说明           |
| --------------- | ------ | -------------- |
| `semi`          | `true` | 使用分号       |
| `singleQuote`   | `true` | 使用单引号     |
| `printWidth`    | `80`   | 每行最大字符数 |
| `trailingComma` | `all`  | 尾随逗号       |
| `tabWidth`      | `2`    | 缩进空格数     |

### 8.3 Stylelint 配置

**文件位置**: [.stylelintrc.js](.stylelintrc.js)

| 配置项    | 说明       |
| --------- | ---------- |
| `extends` | 继承的配置 |
| `rules`   | 自定义规则 |

### 8.4 EditorConfig

**文件位置**: [.editorconfig](.editorconfig)

| 配置项         | 当前值  | 说明     |
| -------------- | ------- | -------- |
| `indent_style` | `space` | 缩进风格 |
| `indent_size`  | `2`     | 缩进大小 |
| `end_of_line`  | `lf`    | 换行符   |
| `charset`      | `utf-8` | 编码     |

---

## 九、其他配置文件

### 9.1 Node 版本

**文件位置**: [.nvmrc](.nvmrc)

```
v22
```

根据团队 Node.js 版本修改。

### 9.2 NPM 配置

**文件位置**: [.npmrc](.npmrc)

```
legacy-peer-deps=true
```

根据项目依赖情况调整。

### 9.3 Git Hooks

**文件位置**: [.husky/pre-commit](.husky/pre-commit)

当前配置：提交前自动执行 lint-staged（代码格式化和 lint 检查）。

---

## 十、迁移检查清单

将框架应用到新项目时，请按以下清单逐一检查：

### 必须修改项 ✅

- [ ] `package.json` - 项目名称、版本
- [ ] `index.html` - 标题、描述、图标
- [ ] `.env.development` - API 地址、认证方式
- [ ] `.env.production` - API 地址、Mock 开关
- [ ] `vite.config.ts` - API 代理地址
- [ ] `src/utils/storage.ts` - 存储前缀
- [ ] `src/store/useAppStore.ts` - 持久化键名
- [ ] `src/config/pageComponentMap.ts` - 页面组件映射
- [ ] `src/api/request.ts` - 业务成功判断逻辑

### 建议修改项 📝

- [ ] `src/config/themePresets.ts` - 主题配色
- [ ] `src/config/table.ts` - 表格默认配置
- [ ] `src/layouts/BasicLayout/index.tsx` - 图标映射
- [ ] `src/mocks/handlers.ts` - Mock 数据结构
- [ ] `.nvmrc` - Node.js 版本
- [ ] CI/CD 配置文件

### 可选修改项 🔧

- [ ] TypeScript 编译配置
- [ ] ESLint/Prettier 规则
- [ ] 路由配置
- [ ] 登录页 UI

---

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview

# 运行测试
pnpm test

# 代码检查
pnpm lint
```

## 技术栈

- **框架**: React 19 + TypeScript 5.9
- **构建工具**: Vite 7
- **UI 组件库**: Ant Design 6 + ProComponents
- **状态管理**: Zustand 5
- **路由**: React Router 7
- **HTTP 客户端**: Axios
- **测试**: Vitest + Testing Library
- **Mock**: MSW (Mock Service Worker)
- **代码规范**: ESLint + Prettier + Stylelint
- **Git Hooks**: Husky + lint-staged

## 目录结构

```
├── .github/workflows/    # GitHub Actions CI 配置
├── .husky/               # Git Hooks
├── docs/                 # 项目文档
├── public/               # 静态资源
├── scripts/              # 构建脚本
├── src/
│   ├── api/              # API 接口封装
│   ├── assets/           # 静态资源（图片等）
│   ├── components/       # 通用组件
│   ├── config/           # 配置文件
│   ├── hooks/            # 自定义 Hooks
│   ├── layouts/          # 布局组件
│   ├── mocks/            # Mock 数据
│   ├── pages/            # 页面组件
│   ├── router/           # 路由配置
│   ├── store/            # 状态管理
│   ├── test/             # 测试配置
│   ├── types/            # 类型定义
│   └── utils/            # 工具函数
├── .env.development      # 开发环境变量
├── .env.production       # 生产环境变量
├── vite.config.ts        # Vite 配置
└── package.json          # 项目配置
```

## 相关文档

- [快速开始](docs/getting-started.md)
- [开发指南](docs/development-guide.md)
- [认证配置](docs/auth-guide.md)
- [主题配置](docs/theme-guide.md)
- [CI/CD 指南](docs/ci-cd-guide.md)
- [数据流说明](docs/data-flow.md)
