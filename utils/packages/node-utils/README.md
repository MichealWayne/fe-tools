# @fe-tools/node-utils

提供 Node.js 环境下常用的工具方法库，用于简化项目构建和文件系统操作。

## 功能模块

### Cache

- **Cache** - 缓存类，支持同步和异步数据缓存。(文件: `src/cache/index.ts`)

### File System (fs)

- **travelFolderSync** - 遍历文件夹并输出文件信息。(文件: `src/fs/fsFuncs.ts`)
- **mkdirsSync** - 容错式同步创建文件夹。(文件: `src/fs/fsFuncs.ts`)
- **fsExistsSync** - 同步判断文件是否存在。(文件: `src/fs/fsFuncs.ts`)
- **setFolderSync** - 同步创建文件夹。(文件: `src/fs/fsFuncs.ts`)
- **rmdirsSync** - 同步删除指定目录及其所有内容。(文件: `src/fs/fsFuncs.ts`)
- **writeFile** - 写入文件，文件不存在则创建。(文件: `src/fs/fsFuncs.ts`)
- **writeJson** - 写入 JSON 文件。(文件: `src/fs/fsFuncs.ts`)
- **readFileSync** - 同步读取文件内容。(文件: `src/fs/fsFuncs.ts`)
- **readJsonFile** - 同步读取 JSON 文件内容。(文件: `src/fs/fsFuncs.ts`)

### Stream

- **copyStream** - 复制文件流，支持转换。(文件: `src/fs/stream.ts`)

### Process

- **runAsync** - 异步执行命令。(文件: `src/process/run.ts`)
- **runSync** - 同步执行命令。(文件: `src/process/run.ts`)
- **forceRunAsync** - 强制异步执行外部命令行。(文件: `src/process/run.ts`)
- **runPromise** - 处理 Promise 的错误。(文件: `src/process/run.ts`)
- **exit** - 退出当前进程。(文件: `src/process/run.ts`)

### Environment

- **parseArgs** - 解析命令行参数。(文件: `src/process/env.ts`)

### Logging

- **Tip.log/info** - 普通日志。(文件: `src/logging/tip.ts`)
- **Tip.safe/success** - 成功日志（绿色）。(文件: `src/logging/tip.ts`)
- **Tip.warn** - 警告日志（黄色）。(文件: `src/logging/tip.ts`)
- **Tip.error** - 错误日志（红色）。(文件: `src/logging/tip.ts`)
- **Tip.strongWarn/strongError** - 强调日志（带背景色）。(文件: `src/logging/tip.ts`)

### Colors

- 提供多种终端颜色，用于美化命令行输出。(文件: `src/logging/colors.ts`)

### System

- **platform** - 获取当前平台标识。(文件: `src/system/os.ts`)
- **cpuCount** - 获取 CPU 核心数。(文件: `src/system/os.ts`)
- **freemem/totalmem** - 获取内存信息。(文件: `src/system/os.ts`)
- **loadavg** - 获取系统负载。(文件: `src/system/os.ts`)
- **cpuUsage/cpuFree** - 获取 CPU 使用率。(文件: `src/system/os.ts`)

### Common

- **getTimeStr** - 获取格式化时间字符串。(文件: `src/common/index.ts`)
- **base64Encode/Decode** - Base64 编解码。(文件: `src/common/base64.ts`)
- **isBase64Str** - 判断字符串是否为 Base64。(文件: `src/common/base64.ts`)
- **startServer** - 启动简易本地静态服务器。(文件: `src/common/server.ts`)
