# 开发规范指南

本指南旨在规范团队开发流程，确保代码质量和可维护性。

## 🛠 开发流程

### 1. 新增页面

1.  在 `src/pages/` 下创建具体的业务组件。
2.  在 `src/config/pageComponentMap.ts` 中注册该组件标识。
3.  在后端/Mock 中配置对应的菜单项，指明其路径和组件标识。

### 2. 状态管理 (Zustand)

- 状态应当按功能模块拆分（如 `useUserStore`, `useAppStore`）。
- 关键状态（如 Token）需要配合 `persist` 中间件进行持久化。

### 3. API 请求

- 所有请求逻辑放在 `src/api/modules/` 下，按模块划分文件。
- 使用 `src/api/request.ts` 中封装的 axios 实例，享受统一的拦截器和错误处理。

## 💅 代码样式规范

- **JavaScript/TypeScript**: 遵循 ESLint 9 定义的规则。
- **CSS**:
  - 推荐使用 **CSS Modules** (`index.module.css`)。
  - 样式书写遵循 Stylelint 规范，并推荐使用 Recess 顺序排列属性。
- **格式化**: 提交代码时 Husky 会自动触发 Prettier 格式化。

## 🧪 测试规范

- 使用 **Vitest** 进行单元测试。
- 测试文件存放在 `src/test/` 或 `__tests__/` 下，命名规律为 `*.test.ts(x)`。
- 运行测试：`npm run test:run`。

## 📝 Git 提交规范

使用中文提交，格式遵循：`<类型>: <描述>`

- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档变更
- `style`: 代码格式（不影响代码运行的变动）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 增加测试
- `chore`: 构建过程或辅助工具的变动
