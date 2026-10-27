# Fastify + TypeScript 后端模板

## 项目简介

这是一个基于 Fastify 5 和 TypeScript 的 Node.js 后端服务模板，内置以下能力：

- Fastify HTTP 服务
- CORS 与安全响应头
- Swagger/OpenAPI 文档
- 限流
- 日志
- TypeScript 类型检查
- ESLint、Prettier 与 Jest

## 技术栈

- Node.js 20.19+, 22.13+, or 24+
- Fastify 5
- TypeScript 6
- Jest 30
- ESLint 10

## 环境要求

- Node.js 20.19+、22.13+ 或 24+
- npm 10 或更高版本

## 安装

```bash
npm install
```

如需配置环境变量：

```bash
cp .env.example .env
```

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 开发模式启动，支持热重载 |
| `npm run build` | 编译 TypeScript |
| `npm run build:prod` | 清理并编译生产运行所需的 `dist/` 产物，不改动当前依赖安装 |
| `npm start` | 启动已经构建的 `dist/index.js` |
| `npm run typecheck` | 仅执行类型检查 |
| `npm run lint` | 执行 ESLint 检查 |
| `npm run test` | 执行 Jest 测试 |

默认服务端口为 `3000`。

部署时先运行 `npm run build:prod`，再在独立的部署环境安装生产依赖并启动。不要在开发工作目录里用省略开发依赖的安装命令替代构建。

## 健康检查

三个后端模板统一使用以下健康检查路由：

| 路由 | 用途 |
| --- | --- |
| `GET /health` | 综合健康检查 |
| `GET /health/live` | 存活检查 |
| `GET /health/ready` | 就绪检查 |

成功响应格式：

```json
{
  "status": "ok",
  "timestamp": "2026-07-14T11:31:16.737Z",
  "uptime": 12.34
}
```

Fastify 的业务 API 默认使用 `/api` 前缀；健康检查路由不使用此前缀。

Swagger 文档地址：`/documentation`。

## 项目结构

```text
src/
├── app.ts                  # 应用初始化、插件与基础路由
├── index.ts                # 服务启动入口
├── config/                 # 环境变量与配置
├── routes/                 # 业务路由和健康检查路由
├── controllers/            # 控制器
├── services/               # 业务服务
├── middlewares/            # 中间件
├── interfaces/             # 类型定义
└── utils/                  # 工具函数
```

## 环境变量

常用配置：

```env
NODE_ENV=development
PORT=3000
LOG_LEVEL=info
API_PREFIX=/api
```

完整配置以 `src/config` 为准。

- `JWT_SECRET`：生产环境必须设置为独立的随机密钥，开发环境使用仅供本地开发的默认值。
- `CORS_ORIGIN`：允许访问 API 的来源，支持逗号分隔的来源列表；默认 `*`。
- `CORS_CREDENTIALS`：默认关闭。使用 Cookie 跨域请求时设为 `true`，同时必须把 `CORS_ORIGIN` 配成明确的来源列表，不能使用 `*`。
- `SWAGGER_ENABLED`：开发环境默认开启，生产环境默认关闭；生产环境显式开启后，`/documentation` 和 OpenAPI 文档会公开。

## AI 参考信息

当 AI 基于此模板新增功能或修改代码时，请遵循以下约束：

1. 服务入口是 `src/index.ts`，应用组装逻辑位于 `src/app.ts`。
2. 新增业务 API 时优先放入 `src/routes`，并遵循 `/api` 前缀。
3. 不要把健康检查路由放入 `/api` 前缀；保持 `/health`、`/health/live`、`/health/ready` 不变。
4. 健康检查响应应保持 `status`、`timestamp`、`uptime` 字段兼容。
5. 需要增加数据库、缓存等就绪检查时，只修改 `/health/ready` 的检查逻辑；失败返回 HTTP 503。
6. 修改依赖后必须执行 `npm run typecheck`、`npm run lint`、`npm run build` 和 `npm test`。
7. 不要提交 `node_modules`、`dist`、`.env` 或运行日志。
8. 端口通过环境变量配置，不要在源码中写死部署环境端口。

## 许可证

ISC
