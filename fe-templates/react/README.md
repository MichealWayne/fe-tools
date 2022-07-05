# React demo

## 使用

### 操作命令

#### 本地开发

```sh
npm run start
```

或

```sh
npm run dev
```

#### 打包（测试环境包）

测试包带 sourcemap，无版本及备份

```sh
npm run build
```

#### 打包（生产包）

生产包不带 sourcemap，包含版本及备份。

```sh
npm run build:prod
```

- 注意：如需执行处理脚本，可在 build/目录下增加脚本文件 build.js。打包后版本备份前会执行该脚本。

### 目录结构

├─asset
└─images 图片
└─lib 工具库
├─components 组件
├─less 样式
├─page 页面入口
├─script js 文件
├─type 接口定义
├─view view 层
