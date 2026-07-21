# Koa + TypeScript 后端模板

## 项目简介

这是一个基于 Koa 3 和 TypeScript 的 Node.js 后端服务模板，适合快速创建轻量级 HTTP 服务。

模板内置：

- Koa HTTP 服务
- 路由
- 请求体解析
- CORS 扩展点
- 日志
- TypeScript 类型检查
- ESLint、Prettier 与 Jest

## 技术栈

- Node.js 20+
- Koa 3
- `@koa/router`
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
├── index.ts                # 服务启动入口
├── config/                 # 环境变量与配置
├── routes/                 # 业务路由和健康检查路由
├── controllers/            # 控制器
├── middlewares/            # 中间件
├── types/                  # 类型声明
└── constant.ts             # 常量
```

## 环境变量

- `PORT`：服务端口，默认读取 `package.json` 中的 `port`
- `NODE_ENV`：运行环境，例如 `development` 或 `production`

## AI 参考信息

当 AI 基于此模板新增功能或修改代码时，请遵循以下约束：

1. 服务入口是 `src/index.ts`，不要绕过现有中间件链直接创建第二个 Koa 实例。
2. 新增业务路由放入 `src/routes`，控制器放入 `src/controllers`。
3. 不要修改健康检查路径：`/health`、`/health/live`、`/health/ready`。
4. 健康检查成功响应应保持 `status`、`timestamp`、`uptime` 字段兼容；就绪失败时使用 HTTP 503。
5. 需要增加数据库、缓存等依赖检查时，只扩展健康检查模块，不要在普通业务路由中实现探针逻辑。
6. 修改依赖或源码后执行 `npm run typecheck`、`npm run lint`、`npm run build` 和 `npm test`。
7. 不要提交 `node_modules`、`dist`、`.env`、日志或临时文件。
8. 使用 `@koa/router` 和 `koa-body` 的当前 API，不要恢复已废弃的 `koa-router` 导入。

## 许可证

ISC
