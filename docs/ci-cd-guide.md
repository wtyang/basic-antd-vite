# CI/CD 使用指南

本项目提供了标准的自动化流水线配置，旨在实现自动检查与自动部署。

## ⚙️ 现有流水线

### GitHub Actions

配置位于 `.github/workflows/`：

- **ci.yml**: 在 Pull Request 时触发。执行单元测试、代码规范扫描和构建验证。
- **cd.yml**: 在代码合并至 `main` 时触发。执行代码发布流程。

## 🧪 本地质量检查

在提交代码前，建议手动运行以下命令进行自我检查：

```bash
# 运行所有静态检查
npm run lint

# 运行所有单元测试
npm run test:run

# 模拟生产构建
npm run build
```

## 🚀 部署建议

- **Nginx 配置**: 建议对 `index.html` 设置 `no-cache`，对 `assets/` 静态资源进行强缓存（文件名带 hash）。
- **版本控制**: 项目根目录会自动由 CI 流程生成 `version.json`，前端 `VersionChecker` 组件会定时轮询此文件，提示用户刷新版本。
