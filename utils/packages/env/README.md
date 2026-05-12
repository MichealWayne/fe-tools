# fe-tools-env

用于判断应用运行时环境，例如 Web、Node.js、小程序、Weex 或 React Native。

## 安装与导入

```bash
npm install fe-tools-env
```

```ts
import { RUNTIME_NAME, isWeb, isNode } from 'fe-tools-env';
```

## 功能说明

### 环境识别 (文件: `src/index.ts`)

- **GLOBAL** - 提供兼容 Web、Node.js 和小程序环境的全局变量。
- **ENV_MAP** - 当前 `process.env` 映射。
- **__DEV__** - 判断是否为 development 环境。
- **isWeb/isNode** - 判断 Web 或 Node.js 环境。
- **isByteDanceMicroApp/isWeChatMiniProgram/isAliPayMiniApp/isBaiduSmartProgram/isKuaiShouMiniProgram** - 判断常见小程序运行时。
- **isReactNative** - 判断 React Native 环境。
- **RunTimeIdMap** - 运行时标识枚举。
- **RUNTIME_NAME** - 当前运行时名称。
