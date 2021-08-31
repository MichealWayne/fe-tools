# webpack-ts-demo

webpack(4) + TypeScript(4.4) 前端项目模板。

## src 目录结构

├─css css
├─images 图片
├─js js
│ └─lib 工具库
└─mock 接口模拟

## 操作命令

### 安装依赖

```sh
npm i
```

### 本地开发

```sh
npm run start
```

或

```sh
npm run dev
```

### 打包（测试环境包）

测试包带 sourcemap，无版本及备份

```sh
npm run build
```

### 打包（生产包）

生产包不带 sourcemap，包含版本及备份。

```sh
npm run build:prod
```

- 注意：如需执行处理脚本，可在 build/目录下增加脚本文件 build.js。打包后版本备份前会执行该脚本。
