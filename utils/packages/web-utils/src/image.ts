/**
 * @module Image
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2024-08-25 10:14:40
 */

/**
 * @function isImageLoaded
 * @description 加载图片（通常用于预加载）
 * @param {string} imgUrl 图片地址
 * @return {Promise<boolean>} 图片加载状态
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
export function isImageLoaded(imgUrl: string) {
  return new Promise(function (resolve, reject) {
    const img = new Image();
    img.src = imgUrl;

    img.onload = function () {
      resolve(true);
    };

    img.onerror = function (error) {
      reject(error);
    };
  });
}

/**
 * @function getImageSize
 * @description 获取图片的原始尺寸大小（用了naturalWidth/naturalHeight）
 * @param {string} imgUrl  图片地址
 * @return {{width: number, height: number}}  图片尺寸
 * @example
getImageSize('https://example.com/image.jpg')
  .then(function(result) {
    console.log('图片大小：', result.width, 'x', result.height);
  })
  .catch(function(error) {
    console.log('无法获取图片大小：', error);
  });
  */
export function getImageSize(imgUrl: string) {
  return new Promise(function (resolve, reject) {
    const img = new Image();
    img.src = imgUrl;

    img.onload = function () {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };

    img.onerror = function (e) {
      reject(e || '无法加载图片');
    };
  });
}

/**
 * @function isSupportWebP
 * @description 页面当前所处环境是否支持webp格式图片
 * @return {boolean} 是否支持webp格式图片
 * @example
const imgEl = document.createElement('img');
if (isSupportWebP()) {
  imgEl.src = 'image.webp';
} else {
  imgEl.src = 'image.png';
}
document.body.appendChild(imgEl);
 */
export function isSupportWebP() {
  return (
    !![].map &&
    document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0
  );
}

/**
 * @function imageToBlob
 * @description 将图片转为Blob对象，可用于上传
 * @param {HTMLImageElement|Image|HTMLCanvasElement} src 图片/canvase元素
 * @param {number} x 位置x，裁剪图片起始坐标
 * @param {number} y 位置y，裁剪图片起始坐标
 * @param {number} width 裁剪图片宽度
 * @param {number} height 裁剪图片高度
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
export function cropImage(
  src: HTMLImageElement | HTMLCanvasElement,
  x: number,
  y: number,
  width: number,
  height: number
) {
  if (width < 0 || height < 0) {
    throw new Error('Invalid dimensions');
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(src, x, y, width, height, 0, 0, width, height);
  return canvas;
}

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
export function compressImage(img: HTMLImageElement, rate: number) {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  const tCanvas: HTMLCanvasElement = document.createElement('canvas');
  const tctx = tCanvas.getContext('2d')!;

  let { width, height } = img;

  let ratio;
  if ((ratio = (width * height) / 4000000) > 1) {
    ratio = Math.sqrt(ratio);
    width /= ratio;
    height /= ratio;
  } else {
    ratio = 1;
  }
  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let count;
  const _widthrate = width > 1000 || height > 1500 ? 0.5 : 1;
  if ((count = (width * height) / 1000000) > 1) {
    count = ~~(Math.sqrt(count) + 1);

    const nw = ~~(width / count);
    const nh = ~~(height / count);
    tCanvas.width = nw;
    tCanvas.height = nh;
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
        ctx.drawImage(tCanvas, i * nw, j * nh);
      }
    }
  } else {
    ctx.drawImage(img, 0, 0, width * _widthrate, height * _widthrate);
  }

  const ndata = canvas.toDataURL('image/jpeg', rate || 0.8);
  tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
  return ndata;
}
