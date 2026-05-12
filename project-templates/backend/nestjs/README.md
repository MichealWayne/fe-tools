# NestJS template

Node.js 服务模板 —— NestJS

## 环境要求

- Node.js 18+
- npm 7+

## 项目运行

安装依赖：

```sh
npm install
```

开发启动：

```sh
npm run dev
```

构建后启动：

```sh
npm run start
```

构建：

```sh
npm run build
```

生产构建：

```sh
npm run build:prod
```

类型检查：

```sh
npm run typecheck
```

代码检查：

```sh
npm run lint
```

## 环境变量

- `PORT`: 服务端口，默认读取 `package.json` 中的 `port`
- `NODE_ENV`: 运行环境，开发环境可设置为 `development`
