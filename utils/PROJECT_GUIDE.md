# fe-tools utils

前端和 Node.js 常用 TypeScript 工具集，包含通用函数、浏览器 API、Node.js 工具、Canvas 辅助方法、AI Prompt 工具、运行时环境识别和图片处理工具。

## 工程说明

| 目录 | 实际包名 | 说明 |
| --- | --- | --- |
| `packages/utils` | `fe-tools-utils` | 环境无关的 JS/TS 通用工具函数 |
| `packages/web-utils` | `fe-tools-webapi` | 浏览器 API、DOM、Storage、URL、性能等工具 |
| `packages/node-utils` | `fe-tools-node-utils` | Node.js 文件、进程、HTTP、日志、数据转换等工具 |
| `packages/ai-utils` | `fe-tools-ai-utils` | AI Prompt、模板、Token 估算等工具 |
| `packages/canvas-utils` | `fe-tools-canvas-utils` | Canvas 绘制、几何计算、颜色、动画等工具 |
| `packages/env` | `fe-tools-env` | Web、Node、小程序、React Native 等运行时识别 |
| `packages/node-img-build` | `fe-tools-node-img-build` | 基于 GraphicsMagick 的图片处理工具 |

根目录构建还会在 `dist/fe-tools` 生成聚合包，可通过子路径访问各模块。

### 1.安装

使用`pnpm`

```sh
pnpm install
```

### 2.执行单测

```sh
npm run test
```

只运行某个包的测试：

```sh
TEST_API=utils npm run test
TEST_API=web-utils npm run test
TEST_API=node-utils npm run test
```

### 3.构建

```sh
npm run build
```

### 4.生成文档

```sh
npm run docs
```
