/**
 * @module Image
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2025-09-07 21:24:32
 */
/**
 * @function isImageLoaded
 * @description 加载图片（通常用于预加载）。Loads an image (typically used for preloading)
 * @param {string} imgUrl - 图片地址。The image URL
 * @return {Promise<boolean>} 图片加载状态。The image loading status
 * @example
isImageLoaded('https://example.com/image.jpg')
  .then(function(result) {
    console.log('图片加载完成');
    console.log(result);
  })
  .catch(function(result) {
    console.log('图片加载失败');
    console.log(result);
  });
 */
export declare function isImageLoaded(imgUrl: string): Promise<unknown>;
/**
 * @function getImageSize
 * @description 获取图片的原始尺寸大小（使用naturalWidth/naturalHeight）。Gets the original dimensions of an image (using naturalWidth/naturalHeight)
 * @param {string} imgUrl - 图片地址。The image URL
 * @return {{width: number, height: number}} 图片尺寸。The image dimensions
 * @example
getImageSize('https://example.com/image.jpg')
  .then(function(result) {
    console.log('图片大小：', result.width, 'x', result.height);
  })
  .catch(function(error) {
    console.log('无法获取图片大小：', error);
  });
  */
export declare function getImageSize(imgUrl: string): Promise<unknown>;
/**
 * @function isSupportWebP
 * @description 检测页面当前所处环境是否支持WebP格式图片。Detects whether the current environment supports WebP format images
 * @return {boolean} 是否支持WebP格式图片。Whether WebP format images are supported
 * @example
const imgEl = document.createElement('img');
if (isSupportWebP()) {
  imgEl.src = 'image.webp';
} else {
  imgEl.src = 'image.png';
}
document.body.appendChild(imgEl);
 */
export declare function isSupportWebP(): boolean;
/**
 * @function cropImage
 * @description 裁剪图片，返回裁剪后的canvas元素。Crops an image and returns the cropped canvas element
 * @param {HTMLImageElement|HTMLCanvasElement} src - 图片/canvas元素。The image/canvas element
 * @param {number} x - 位置x，裁剪图片起始坐标。The x position, starting coordinate for cropping
 * @param {number} y - 位置y，裁剪图片起始坐标。The y position, starting coordinate for cropping
 * @param {number} width - 裁剪图片宽度。The width of the cropped image
 * @param {number} height - 裁剪图片高度。The height of the cropped image
 * @example
// 从一个图片元素中裁剪出一个 100x100 大小的矩形，起始坐标为 (50, 50)
const image = document.querySelector('img');
const croppedCanvas = cropImage(image, 50, 50, 100, 100);

// 将裁剪后的 canvas 元素插入到页面中
document.body.appendChild(croppedCanvas);

// 从一个 canvas 元素中裁剪出一个 200x100 大小的矩形，起始坐标为 (0, 0)
const canvas = document.querySelector('canvas');
const croppedCanvas = cropImage(canvas, 0, 0, 200, 100);

// 将裁剪后的 canvas 元素插入到页面中
document.body.appendChild(croppedCanvas);
 */
export declare function cropImage(src: HTMLImageElement | HTMLCanvasElement, x: number, y: number, width: number, height: number): HTMLCanvasElement;
/**
 * @function compressImage
 * @description 进行图片压缩并输出base64
 * @param {HTMLImageElement} img: 图片元素
 * @param {number} rate: 压缩比例
 * @return {string} base64图片
 * @example
 *   const img = new Image();
 *   img.src = 'https://blog.michealwayne.cn/favicon.png';
 *   img.onload = () => console.log(compressImage(img, 0.3)); // 输出压缩后的base64
 */
export declare function compressImage(img: HTMLImageElement, rate: number): string;
