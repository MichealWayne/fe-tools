/**
 * @module Image
 */

/**
 * @function isSupportWebP
 * @return {boolean}
 */
export function isSupportWebP() {
  return (
    !![].map &&
    document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0
  );
}

/**
 * @function compressImage
 * @param {HTMLImageElement} img: 图片元素
 * @param {Number} rate: 压缩比例
 * @return {String} base64图片
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
