# Node Image Build Tool

一个用于处理图片的 Node.js 工具包，支持生成 1x/2x 倍图、WebP 格式转换、图片模糊处理和 Base64 编码转换。

依赖于 [gm](https://www.npmjs.com/package/gm) 和 [ImageMagick](https://imagemagick.org/index.php)。

> 注意：请确保系统已安装 [ImageMagick](https://imagemagick.org/script/download.php)

## 用法

### 获取图片列表

```typescript
// 获取目录中的所有 2x 图片
const images = imgBuild.getImgList('/path/to/images', { only2x: true });

// 获取目录中的所有图片（包括子目录）
const allImages = imgBuild.getImgList('/path/to/images', {
  includeAllImages: true,
  recursive: true,
});
```

### 生成 WebP 格式

```typescript
// 将 2x 图片转换为 WebP 格式
imgBuild
  .toWebpImg('/path/to/images', 'image_2x.png', '/path/to/output', { quality: 80 })
  .then(webpPath => {
    console.log(`WebP 图片已生成: ${webpPath}`);
  });
```

### 从 2x 图生成 1x 图

```typescript
// 从 2x 图自动生成 1x 图
imgBuild.generate1xFrom2x('/path/to/images', 'image_2x.png', '/path/to/output').then(onexPath => {
  console.log(`1x 图片已生成: ${onexPath}`);
});
```

### 图片转 Base64

```typescript
// 获取图片的 GM 流
imgBuild
  .getGmStream('/path/to/images', 'image.png')
  .then(({ gmStream }) => {
    // 转换为 Base64
    return imgBuild.toBase64(gmStream, 'png');
  })
  .then(base64String => {
    console.log('Base64 编码:', base64String);
  });
```

### 生成模糊图

```typescript
// 获取图片的 GM 流
imgBuild
  .getGmStream('/path/to/images', 'image.png')
  .then(({ gmStream }) => {
    // 生成模糊图
    const blurredGm = imgBuild.toBlurImg(gmStream, {
      color: 8,
      blurRadius: 10,
      blurSigma: 5,
    });

    // 保存模糊图
    return new Promise((resolve, reject) => {
      blurredGm.write('/path/to/output/blurred.png', err => {
        if (err) reject(err);
        else resolve('/path/to/output/blurred.png');
      });
    });
  })
  .then(blurredPath => {
    console.log(`模糊图已生成: ${blurredPath}`);
  });
```

### 调整图片尺寸

```typescript
// 获取图片的 GM 流
imgBuild
  .getGmStream('/path/to/images', 'image.png')
  .then(({ gmStream }) => {
    // 调整尺寸
    const resizedGm = imgBuild.resizeImg(gmStream, 200, 150);

    // 保存调整后的图片
    return new Promise((resolve, reject) => {
      resizedGm.write('/path/to/output/resized.png', err => {
        if (err) reject(err);
        else resolve('/path/to/output/resized.png');
      });
    });
  })
  .then(resizedPath => {
    console.log(`调整尺寸的图片已生成: ${resizedPath}`);
  });
```

## 全局配置

可以通过 `config` 对象修改默认配置：

```typescript
// 修改默认配置
imgBuild.config.webpQuality = 85;
imgBuild.config.blur.radius = 5;
```
