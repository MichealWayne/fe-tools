# @fe-tools/node-img-build

一个用于处理图片的 Node.js 工具包，支持生成不同倍率图片、WebP 格式转换、图片模糊处理和 Base64 编码转换。

> 注意：本工具依赖于 [gm](https://www.npmjs.com/package/gm) 和 [ImageMagick](https://imagemagick.org/index.php)。请确保系统已安装 [ImageMagick](https://imagemagick.org/script/download.php)。

## 核心功能

- **getImgList** - 获取指定目录下的图片文件列表，支持递归和筛选。(文件: `src/index.ts`)
- **toWebpImg** - 将图片转换为 WebP 格式，并可自定义质量。(文件: `src/index.ts`)
- **generate1xFrom2x** - 根据 2x 图片自动生成 1x 图片。(文件: `src/index.ts`)
- **toBase64** - 将图片流转换为 Base64 编码字符串。(文件: `src/index.ts`)
- **toBlurImg** - 对图片进行模糊处理。(文件: `src/index.ts`)
- **resizeImg** - 调整图片的宽度和高度。(文件: `src/index.ts`)

## 全局配置

可通过 `config` 对象修改默认配置，例如 WebP 质量、模糊参数等。(文件: `src/config.ts`)
