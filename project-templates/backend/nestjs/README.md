# NestJS + Fastify 后端模板

## 项目简介

这是一个基于 NestJS 11、Fastify 5 和 TypeScript 的 Node.js 后端服务模板，提供模块化的服务端项目结构。

模板内置：

- NestJS 模块化架构
- Fastify HTTP 适配器
- 全局异常过滤器
- 路由控制器
- 日志
- TypeScript 类型检查
- ESLint、Prettier 与 Jest

## 技术栈

- Node.js 20+
- NestJS 11
- Fastify 5
- TypeScript 6
- Jest 30
- ESLint 10

## 环境要求

- Node.js 20 或更高版本
- npm 10 或更高版本

## 安装

```bash
npm install
```

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 开发模式启动，支持热重载 |
| `npm run build` | 编译 TypeScript |
| `npm start` | 编译后启动服务 |
| `npm run typecheck` | 仅执行类型检查 |
| `npm run lint` | 执行 ESLint 检查 |
| `npm run test` | 执行 Jest 测试 |

默认服务端口为 `5000`，可通过 `PORT` 环境变量覆盖。

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

业务路由示例：

- `GET /`
- `GET /getTest`
- `POST /postTest`

## 项目结构

```text
src/
├── main.ts                # 服务启动入口
├── app.module.ts          # 根模块
├── app.controller.ts      # 示例业务控制器
├── health.controller.ts   # 健康检查控制器
├── app.service.ts         # 示例服务
├── config/                # 环境变量与配置
├── controllers/           # 通用控制器或日志模块
└── filters/               # 全局异常过滤器
```

## 环境变量

- `PORT`：服务端口，默认读取 `package.json` 中的 `port`
- `NODE_ENV`：运行环境，例如 `development` 或 `production`

## AI 参考信息

当 AI 基于此模板新增功能或修改代码时，请遵循以下约束：

1. 服务入口是 `src/main.ts`，根模块是 `src/app.module.ts`。
2. 新增业务功能优先创建独立的 Module、Controller 和 Service，不要把业务逻辑堆积到根控制器。
3. 不要修改健康检查路径：`/health`、`/health/live`、`/health/ready`。
4. 健康检查成功响应应保持 `status`、`timestamp`、`uptime` 字段兼容；就绪失败时使用 HTTP 503。
5. 需要增加数据库、缓存等就绪检查时，扩展 `HealthController` 或拆分为健康检查模块，并保持探针接口稳定。
6. 修改依赖或源码后执行 `npm run typecheck`、`npm run lint`、`npm run build` 和 `npm test`。
7. 不要提交 `node_modules`、`dist`、`.env`、日志或临时文件。
8. 保持 NestJS 与 Fastify adapter 的版本兼容，不要单独升级其中一个核心包。

## 许可证

ISC
