# (Nodejs)utils

base 方法

@(前端)[nodejs]

利用 node 构建项目的简易方法库。

- [Cache](./src/cache/index.ts)：缓存类, 用于缓存数据, 支持异步和同步
- [File System](./src/fs/fsFuncs.ts)：文件系统操作，包括遍历、创建、读写文件等
  - `travelFolderSync`: 遍历文件夹输出文件信息
  - `mkdirsSync`: 同步进行文件夹创建（容错）
  - `fsExistsSync`: 判断文件是否存在(同步)
  - `setFolderSync`: 同步创建文件夹
  - `rmdirsSync`: 同步删除指定目录下的所前目录和文件
  - `writeFile`: 写文件,如果文件不存在则创建
  - `writeJson`: 写 JSON 文件
  - `readFileSync`: 读取文件内容（同步）
  - `readJsonFile`: 读取 JSON 文件内容
- [Stream](./src/fs/stream.ts)：文件流处理
  - `copyStream`: 复制文件流，支持转换
- [Process](./src/process/run.ts)：进程相关功能
  - `runAsync`: 异步执行命令
  - `runSync`: 同步执行命令
  - `forceRunAsync`: 强制执行外部命令行（异步）
  - `runPromise`: 处理 promise 的错误
  - `exit`: 退出进程
- [Environment](./src/process/env.ts)：环境变量处理
  - `parseArgs`: 解析命令行参数
- [Logging](./src/logging/tip.ts)：日志输出
  - `Tip.log/info`: 普通日志
  - `Tip.safe/success`: 成功日志（绿色）
  - `Tip.warn`: 警告日志（黄色）
  - `Tip.error`: 错误日志（红色）
  - `Tip.strongWarn/strongError`: 强调日志（背景色）
- [Colors](./src/logging/colors.ts)：终端颜色
  - 支持多种终端颜色，用于美化命令行输出
- [System](./src/system/os.ts)：系统信息
  - `platform`: 获取当前宿主平台标识
  - `cpuCount`: 获取当前 CPU 数量
  - `freemem/totalmem`: 获取内存信息
  - `loadavg`: 获取系统负载均衡
  - `cpuUsage/cpuFree`: 获取 CPU 使用情况
  - 其他系统监控相关功能
- [Common](./src/common/index.ts)：通用功能
  - `getTimeStr`: 获取格式化时间字符串
- [Base64](./src/common/base64.ts)：Base64 编解码
  - `base64Encode`: 字符串转 base64
  - `base64Decode`: base64 字符串解码
  - `isBase64Str`: 判断字符串是否是 base64
- [Server](./src/common/server.ts)：简易本地服务器
  - `startServer`: 启动本地静态资源服务器

## 使用示例

```javascript
import { readJsonFile, writeJson, Tip } from '@fe-tools/node-utils'; // @todo

// 读取JSON文件
const config = readJsonFile('./config.json');

// 修改配置
config.version = '1.0.1';

// 写入JSON文件
writeJson('./config.json', config);

// 输出成功信息
Tip.success('配置已更新');
```
