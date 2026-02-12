# CI/CD 与部署指南

本项目提供了完善的自动化流水线配置，旨在实现从代码提交到生产环境部署的全流程自动化。

## ⚙️ 自动化流水线 (Workflows)

### 1. GitHub Actions

配置文件位于 `.github/workflows/ci.yml`。

- **触发时机**：代码推送（Push）或提交合并请求（PR）至 `main` 或 `develop` 分支。
- **执行流程**：
  1.  **代码拉取**：Checkout 当前分支代码。
  2.  **环境初始化**：安装 Node.js 20.x 或 22.x。
  3.  **依赖安装**：执行 `npm install`。
  4.  **代码检测**：执行 `npm run lint`（ESLint + Stylelint）。
  5.  **单元测试**：执行 `npm run test:run`（Vitest）。
  6.  **项目构建**：执行 `npm run build`（生成 `dist` 目录）。

### 2. GitLab CI

配置文件位于 `.gitlab-ci.yml`。

- **关键阶段**：`install` -> `lint` -> `test` -> `build` -> `deploy`。
- **缓存机制**：针对 `node_modules` 进行了缓存，加速后续流水线运行。

---

## �️ 平台配置指南

要使流水线正常运行，除了配置文件外，还需要在平台端进行少量配置。

### 1. GitHub Actions 配置步奏

1.  **代码提交**：将 `.github/workflows/ci.yml` 推送至远程仓库。
2.  **查看进度**：在 GitHub 仓库顶部的 **Actions** 选项卡中可以查看所有正在运行或已完成的任务。
3.  **配置密钥 (如需自动部署)**：
    - 进入仓库 **Settings** -> **Secrets and variables** -> **Actions**。
    - 点击 **New repository secret**。
    - 添加部署所需的凭证（如 `SSH_PRIVATE_KEY` 或服务器密码），这些变量可以在 `.yml` 中引用（如 `${{ secrets.SSH_PRIVATE_KEY }}`）。

### 2. GitLab CI 配置步奏

1.  **代码提交**：确保项目根目录下存在 `.gitlab-ci.yml`。
2.  **查看进度**：在 GitLab 左侧导航栏中选择 **Build** -> **Pipelines** 查看运行状态。
3.  **配置变量**：
    - 进入 **Settings** -> **CI/CD**。
    - 展开 **Variables** 部分，点击 **Add variable**。
    - 添加部署相关的变量（如 `PRODUCTION_SERVER_IP`），在 `.gitlab-ci.yml` 中直接通过 `$PRODUCTION_SERVER_IP` 访问。
    - 建议对敏感信息开启 **Masked** 选项以防日志泄露。

---

## �🚀 部署策略

### 1. 传统 Web 服务器部署 (Nginx)

构建后的静态资源（`dist` 目录）可以直接部署到 Nginx/Apache 等服务器上。

#### 建议的 Nginx 配置：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /www/admin-react-vite/dist;
    index index.html;

    # 核心：支持前端路由模式 (React Router)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 缓存控制：入口文件不缓存
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # 缓存控制：静态资源长期缓存（文件名带 hash）
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # API 代理配置（如果需要）
    location /api/ {
        proxy_pass http://backend-api-server:3000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 2. 多环境部署

通过环境变量区分不同环境：

- `VITE_API_BASE_URL`: 不同环境对应的后端地址。
- `VITE_AUTH_MODE`: 环境特有的认证方式。

在 CI 中配置 Secrets（如 `GH_TOKEN` 或 `DEPLOY_KEY`），通过 SSH 或 FTP 将 `dist` 目录同步到目标服务器。

---

## 🔄 前端版本检测集成

在构建阶段，`npm run build` 会自动执行 `scripts/generate-version.js`。

1.  **生成文件**：在 `public/` 下通过 `version.json` 记录当前包版本与 Git Hash。
2.  **前端轮询**：应用运行后会自动开启定时轮询（默认 5 分钟）。
3.  **自动生效**：一旦检测到服务器端 `version.json` 发生变化，会提示用户刷新。

> [!TIP]
> 部署后，请务必检查 `version.json` 是否能在浏览器直接访问（http://domain/version.json），这是版本更新检测功能的前提。
