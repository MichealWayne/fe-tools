# @fe-tools/utils

提供 JavaScript/TypeScript 开发中常用的通用工具函数库。

## 功能列表

### Array (数组) (文件: `src/array.ts`)

- 包含数组操作如求最大值、最小值、平均值、求和、去重、分片、扁平化、筛选等。

### Await & Promise (文件: `src/await-to.ts`)

- **to** - 简化 async/await 错误处理。

### Check (校验) (文件: `src/check.ts`)

- 邮箱、身份证、URL、手机号、邮政编码等格式校验。

### Check Plus (增强校验) (文件: `src/check.plus.ts`)

- 护照、车牌号校验，密码强度检测，身份证正确性校验。

### Color (颜色) (文件: `src/color.ts`)

- 随机颜色生成，颜色格式转换，透明色判断。

### Date (日期) (文件: `src/date.ts`)

- 日期差计算，日期前后判断，时间格式化等。

### Easing (缓动函数) (文件: `src/Easing.ts`)

- 提供多种缓动函数，如线性、二次、三次、弹性、弹跳等。

### Function (函数) (文件: `src/function.ts`)

- 函数工具如防抖、节流、柯里化、组合、管道、延迟执行、性能计时等。

### Math (数学) (文件: `src/math.ts`)

- 阶乘、公约数、最小公倍数等数学计算。

### Number (数字) (文件: `src/number.ts`)

- 数字类型判断、随机数生成、范围约束、近似相等比较等。

### Object (对象) (文件: `src/object.ts`)

- 对象遍历、属性筛选、类型判断等。

### String (字符串) (文件: `src/string.ts`)

- 字符串操作如大小写转换、截断、反转、驼峰转换、HTML 标签移除等。

### Trade (交易) (文件: `src/trade.ts`)

- 银行卡号校验、货币格式化。

### Tween (缓动) (文件: `src/tween.ts`)

- 提供缓动动画相关的计算函数。

### Type (类型) (文件: `src/type.ts`)

- 精确的变量类型判断。

### Others (其他) (文件: `src/others.ts`)

- 版本比较、金额转大写等实用功能。

### Collection (集合操作) (文件: `src/collection.ts`)

- **groupBy** - 按指定键对数组元素进行分组。
- **partition** - 将数组分为满足条件和不满足条件的两部分。
- **zip** - 将多个数组的对应元素组合成元组数组。
- **unzip** - 将元组数组拆分为多个独立数组。
- **cartesianProduct** - 计算多个数组的笛卡尔积。
- **sortBy** - 按多个字段和顺序对数组进行排序。
- **mergeSorted** - 合并多个已排序的数组。

### Validators (验证器) (文件: `src/validators.ts`)

- **isValidJSON** - 检查字符串是否为有效的 JSON 格式。
- **isValidEmail** - 检查字符串是否为有效的电子邮件地址。
- **isValidURL** - 检查字符串是否为有效的 URL。
- **isCreditCard** - 检查字符串是否为有效的信用卡号。
- **isValidPhoneNumber** - 检查字符串是否为有效的电话号码(支持多种格式)。
- **isHexColor** - 检查字符串是否为有效的十六进制颜色值。
- **isISBN** - 检查字符串是否为有效的 ISBN 号码。
- **isMACAddress** - 检查字符串是否为有效的 MAC 地址。
- **isPort** - 检查数字是否为有效的端口号。
- **isLatLong** - 检查字符串是否为有效的经纬度坐标。
- **isJWT** - 检查字符串是否为有效的 JWT Token。
- **isSemVer** - 检查字符串是否为有效的语义化版本号。

### Formatter (格式化工具) (文件: `src/formatter.ts`)

- **formatFileSize** - 将字节数格式化为易读的文件大小(如 1.5 MB)。
- **formatDuration** - 将毫秒数格式化为时长字符串(如 1h 30m 45s)。
- **formatNumber** - 格式化数字,支持千分位分隔和小数位控制。
- **formatRelativeTime** - 将时间戳格式化为相对时间(如"刚刚"、"5分钟前")。
- **formatPhoneNumber** - 格式化电话号码为指定格式。
- **formatCurrency** - 格式化货币金额,支持多币种和符号位置。
- **formatPercentage** - 格式化百分比数值。
- **truncateText** - 截断文本并添加省略号。

### JSON (JSON 处理) (文件: `src/json.ts`)

- **safeJSONParse** - 安全地解析 JSON 字符串,失败时返回默认值。
- **safeJSONStringify** - 安全地序列化对象为 JSON,处理循环引用。
- **flattenJSON** - 将嵌套的 JSON 对象扁平化为单层对象。
- **unflattenJSON** - 将扁平化的 JSON 对象还原为嵌套结构。
- **compareJSON** - 深度比较两个 JSON 对象是否相等。
- **mergeJSON** - 深度合并多个 JSON 对象。
