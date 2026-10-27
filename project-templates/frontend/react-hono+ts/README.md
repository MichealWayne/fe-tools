# React + Hono + TypeScript 模板

一个可独立复制使用的全栈模板：React 19 + Vite 构建前端，Hono + Node.js 提供后端 API，使用 Hono RPC 共享请求和响应类型。

## 环境要求

- Node.js 22.12+（建议使用 Node.js 22 LTS）
- npm

## 使用

复制本目录到新项目，在模板根目录执行：

```sh
npm install
npm run dev
```

打开 <http://localhost:3000>。页面包含 React 计数器和姓名表单；提交表单会请求 Hono 接口，展示加载状态、后端问候或错误信息。

开发时同时启动 Vite（3000）和 Hono（3001），修改页面或服务端代码均会自动更新。Vite 将 `/api` 请求代理到 Hono，无需额外配置 CORS。退出开发命令会同时停止两个服务。

### 操作命令

| 命令                                  | 说明                                           |
| ------------------------------------- | ---------------------------------------------- |
| `npm run dev` / `npm run start`       | 同时启动前端和后端开发服务                     |
| `npm run dev:web`                     | 仅启动 Vite，需另行启动后端                    |
| `npm run dev:server`                  | 仅启动 Hono，监听代码修改                      |
| `npm run build`                       | 类型检查并构建测试环境包，前后端均带 sourcemap |
| `npm run build:prod`                  | 类型检查并构建生产包，不生成 sourcemap         |
| `npm run serve` / `npm run preview`   | 启动已构建的全栈服务，默认 3001 端口           |
| `npm run typecheck`                   | 检查前端、后端和 Vite 配置的 TypeScript 类型   |
| `npm run lint` / `npm run lint:fix`   | ESLint 检查 / 自动修复                         |
| `npm run format`                      | Prettier 格式化源码和配置                      |
| `npm run test` / `npm run test:watch` | 运行 API 测试 / 监听测试                       |
| `npm run clean`                       | 清理生成目录 `dist/`                           |

构建前自动清理旧产物，避免测试环境 sourcemap 残留到生产包。本模板不生成版本备份或修改 README。

### 生产运行

```sh
npm run build:prod
npm run serve
```

打开 <http://localhost:3001>。Hono 同时提供 `dist/client` 内的页面与 `/api` 接口，支持前端页面路由的 HTML 回退；未知 API 返回 JSON 404。`preview` 使用真实 Hono 服务，不是仅提供静态页面的 `vite preview`。

运行时需要 `dist/`、`package.json` 和生产依赖（可使用 `npm ci --omit=dev` 安装）；源码修改后需要重新构建。本模板是 SPA + API，不包含 SSR、数据库或登录认证。

### 端口配置

Hono 读取进程环境变量 `PORT`，默认 3001，并监听 `0.0.0.0`。开发时 Vite 也读取该变量作为 API 代理目标，因此请在启动整个开发命令时设置：

```sh
# macOS / Linux
PORT=4001 npm run dev
PORT=4001 npm run serve
```

```powershell
# Windows PowerShell
$env:PORT = '4001'
npm run dev
```

前端端口在 `vite.config.ts` 中配置，默认 3000，端口占用会直接报错。当前不自动加载 `.env` 文件。密钥只应在服务端环境变量中使用，不要通过 `VITE_*` 暴露到浏览器。

## 目录结构

```text
src/
  App.tsx               # 计数器、表单和接口交互
  api.ts                # Hono RPC 客户端，仅导入后端类型
  main.tsx              # React 入口
  index.css             # 页面样式
server/
  app.ts                # API 路由、输入校验、错误响应与 AppType
  app.test.ts           # API 健康检查、校验和错误处理测试
  index.ts              # Node.js 服务入口、静态资源和页面回退
dist/                   # 构建生成，不提交
  client/               # Vite 前端产物
  server/               # TypeScript 编译后的 Node.js ESM 代码
vite.config.ts          # 开发代理和前端构建配置
tsconfig.json           # 全项目类型检查
tsconfig.server.json    # 后端 NodeNext 编译配置
eslint.config.js        # ESLint 和 React Hooks 规则
```

## API 示例

```sh
curl http://localhost:3001/api/health
# {"status":"ok"}

curl http://localhost:3001/api/hello \
  -H 'Content-Type: application/json' \
  -d '{"name":"React"}'
# {"message":"你好，React！这条消息来自 Hono 后端。"}
```

`POST /api/hello` 要求 JSON 请求体包含字符串 `name`，去除首尾空白后为 1–50 个字符。非法输入返回 400 和 `{ "error": "..." }`；未知接口返回 404；未处理异常返回不含内部信息的 500。

新增接口时在 `server/app.ts` 中链式定义路由，前端通过 `src/api.ts` 的 `client` 调用，复用服务端推导的类型。服务端本地导入使用 `.js` 扩展名，确保编译后的 Node.js ESM 可直接运行。

## 参考文档

- [React](https://react.dev/)
- [Vite](https://vite.dev/guide/)
- [Hono Node.js](https://hono.dev/docs/getting-started/nodejs)
- [Hono RPC](https://hono.dev/docs/guides/rpc)
