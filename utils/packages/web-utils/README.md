# @fe-tools/web-utils

封装了浏览器环境下的常用工具方法，简化前端开发。

## 功能模块

### Cookies (文件: `src/cookies.ts`)

- **getCookie**, **setCookie**, **delCookie** - 管理浏览器 Cookie。

### CSS (文件: `src/css.ts`)

- **getPrefix** - 获取浏览器前缀。
- **getStyle** - 获取元素计算样式。
- **getElementSize** - 获取元素尺寸。

### Clipboard (文件: `src/clipboard.ts`)

- **readClipboardText** - 读取剪贴板文本。
- **copyToClipboard** - 复制文本到剪贴板。

### DOM (文件: `src/dom.ts`)

- 提供 DOM 操作如添加/移除 class、元素插入、滚动控制、可见性判断、XSS 防护等。

### File (文件: `src/file.ts`)

- **readFile**, **readFileAsDataURL** - 读取文件内容。
- **downloadFile**, **downloadImageFileByUrl** - 文件下载。
- **getFileExtension** - 获取文件扩展名。

### Image (文件: `src/image.ts`)

- **isImageLoaded** - 图片预加载。
- **getImageSize** - 获取图片原始尺寸。
- **isSupportWebP** - 检查 WebP 支持。
- **cropImage**, **compressImage** - 图片裁剪与压缩。

### Navigate (文件: `src/navigate.ts`)

- **navigateTo** - 页面跳转。
- **httpsRedirect** - 强制 HTTPS 重定向。

### Lifecycle (文件: `src/lifecycle.ts`)

- **onPageLoad**, **onPageUnload**, **onBeforeUnload** - 页面生命周期事件监听。

### Load Assets (文件: `src/loadAssets.ts`)

- **loadScript/Css/Image** - 动态加载 JS/CSS/图片资源。

### Platform (文件: `src/platform.ts`)

- **isBrowser**, **isPC**, **isOpenHarmony** - 环境判断。
- 获取浏览器、系统、移动设备信息。

### Rem (文件: `src/rem.ts`)

- 提供 REM 布局相关的工具函数。

### Storage (文件: `src/storage.ts`)

- 封装了 localStorage 和 sessionStorage 的操作。

### URL (文件: `src/url.ts`)

- **parseQueryString**, **getUrlParam** - URL 参数解析。
- **paramsJoinUrl** - 参数拼接为 URL。
- **getBaseUrl** - 获取基础地址（ url 中?之前的部分）。
- **getUrlDomain** - 获取 URL 域名。
- **uniqueSlash** - 规范化路径分隔符。

### Keyboard (文件: `src/keyboard.ts`)

- **getKeyName** - 获取键盘按键名称。

### Others (文件: `src/others.ts`)

- **isBase64** - 判断字符串是否为 Base64 编码。

### Performance (性能监控) (文件: `src/performance.ts`)

- **measureFPS** - 测量并监控页面帧率(FPS)。
- **measureMemory** - 测量当前页面的内存使用情况。
- **measureLoadTime** - 测量页面加载时间的各个阶段。
- **getWebVitals** - 获取 Web Vitals 核心性能指标(LCP、FID、CLS)。
- **createPerformanceObserver** - 创建性能观察器监听特定性能条目。
- **getResourceTiming** - 获取资源加载时间详情。

### Network (网络工具) (文件: `src/network.ts`)

- **isOnline** - 检测当前网络连接状态。
- **onlineStatusChange** - 监听网络状态变化。
- **getNetworkType** - 获取网络连接类型(4G、5G、WiFi 等)。
- **getNetworkSpeed** - 估算当前网络下载速度。
- **retryRequest** - 带重试机制的请求函数。
- **requestIdleCallbackPolyfill** - requestIdleCallback 的 polyfill 实现。
- **cancelIdleCallbackPolyfill** - cancelIdleCallback 的 polyfill 实现。

### Form (表单处理) (文件: `src/form.ts`)

- **serializeForm** - 将表单序列化为对象或查询字符串。
- **deserializeForm** - 将数据填充到表单中。
- **validateForm** - 验证表单字段,支持自定义规则。
- **autoSaveForm** - 自动保存表单数据到本地存储。
- **formDiff** - 检测表单数据的变更。

### I18n (国际化) (文件: `src/i18n.ts`)

- **formatDate** - 根据区域设置格式化日期。
- **formatNumber** - 根据区域设置格式化数字。
- **formatCurrency** - 根据区域设置格式化货币。
- **formatRelativeTime** - 根据区域设置格式化相对时间。
- **pluralize** - 根据数量返回正确的复数形式。
- **getLocale** - 获取用户的首选语言区域。
- **getTextDirection** - 获取语言的文本方向(LTR/RTL)。
