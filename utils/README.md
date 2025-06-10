# fe-tools

[English README](./README_EN.md)

前端 JavaScript 实用工具函数集合，按功能分类为多个专注的包。

## 📦 包结构

本项目采用 monorepo 架构，包含以下几个包：

- **ai-utils**：AI 相关操作的工具函数
- **canvas-utils**：Canvas 操作相关的辅助函数
- **node-img-build**：Node.js 图像处理工具函数
- **node-utils**：Node.js 通用工具函数
- **utils**：通用 JavaScript 工具函数（环境无关）
- **web-utils**：浏览器专用工具函数

## 🔍 特性

- 模块化架构，灵活使用
- 完整 TypeScript 支持和类型定义
- 使用 Jest 进行全面测试
- 每个工具函数都有详细文档
- 环境特定的包设计，避免不必要的代码打包

## 📄 文档

完整的 API 文档可通过运行以下命令生成：

```sh
npm run docs
```

这将使用`typedoc.json`中指定的配置通过 TypeDoc 生成文档。

## 🔧 开发

### 环境要求

- Node.js（版本要求见 package.json）
- pnpm

### 参与贡献

1. Fork 仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 使用约定式提交规范提交更改
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

### 代码风格

本项目使用 ESLint 和 Prettier 进行代码格式化。配置文件已包含在仓库中。

## 📝 许可证

本项目采用 MIT 许可证 - 详见 LICENSE 文件。

## 👤 作者

- Wayne
- GitHub: [MichealWayne](https://github.com/MichealWayne)
- 问题跟踪: [GitHub Issues](https://github.com/MichealWayne/fe-tools/issues)
