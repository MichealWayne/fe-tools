/**
 * @author Wayne
 * @Date 2021-04-27 14:47:13
 * @LastEditTime 2023-03-07 13:52:59
 */
import path from 'path';
import gmConstructor from 'gm';

import NodeUtils from 'node-utils';

const { Tip } = NodeUtils;

const gm = gmConstructor.subClass({ imageMagick: true });

/**
 * @function getGmFile
 * @description 获得gm格式图片
 * @param {String} filePath
 * @param {String} imgName
 * @param {Function} callback?
 * @return {Promise}
 */
export function getGmStream(
  filePath: string,
  imgName: string,
  callback?: (data: gmConstructor.ImageInfo, gm?: gmConstructor.State) => void
) {
  const gmInstance = gm(path.join(filePath, imgName));

  if (callback) {
    return gmInstance.identify((err, data) => {
      if (err) {
        Tip.error(err);
        return false;
      }

      return callback.call(gm, data);
    });
  }

  return gmInstance;
}

/**
 * @function toWebpImg
 * @description 图片转为webp格式（文件名中的_2x.会被替换）
 * @param {String} filepath: 图片所在目录;
 * @param {String} filename: 图片文件名;
 * @param {String} outpath: 输出目录;
 * @param {Function} callback: callback（可选）;
 * @return {Promise}
 */
export function toWebpImg(
  filePath: string,
  imgName: string,
  outPath: string,
  callback?: (webPath: string) => void
) {
  const webpPath = path.join(outPath, `${imgName.replace('_2x.', '.').split('.')[0]}.webp`);

  return gm(path.join(filePath, imgName))
    .setFormat('webp')
    .write(webpPath, err => {
      if (err) {
        Tip.error(err);
        return false;
      }

      Tip.safe(`${webpPath}生成成功。`, true);
      if (callback) callback(webpPath);
    });
}

/**
 * @function toBlurImg
 * @description 生成模糊图（gm格式）
 * @param {GmFile} gmfile: gm格式图
 * @param {Object} config: 配置信息
 *                  color: 颜色总数
 *                  blurRadius: 模糊半径
 *                  blurSigma: 模糊Sigma值
 * @return {GmFile}
 */
export function toBlurImg(
  gmStream: gmConstructor.State,
  { color = 8, blurRadius = 7, blurSigma = 3 }
) {
  if (!gmStream) return false;

  return gmStream.colors(color).blur(blurRadius, blurSigma);
}

/**
 * @function toBase64
 * @description 图片转base64
 * @param {gmConstructor.State} gmStream
 * @param {String} type
 * @param {Function} callback
 * @return {Promise}
 */
export function toBase64(
  gmStream: gmConstructor.State,
  type = 'jpg',
  callback?: (base64: string) => void
) {
  return gmStream.toBuffer(type, (err, buffer) => {
    if (err) {
      Tip.error(err);
      return false;
    }

    const _url = `data:image/${type};base64,${buffer.toString('base64')}`;
    if (callback) callback(_url);
  });
}

/**
 * @function resizeImg
 * @description 图片改变尺寸
 * @param {gmConstructor.State} gmStream
 * @param {Number} width
 * @param {Number} height
 * @param {Promise}
 */
export function resizeImg(gmStream: gmConstructor.State, width: number, height?: number) {
  if (!width) {
    Tip.error('Error! no width config.');
    return false;
  }

  if (height) {
    return gmStream.resize(width, height);
  }

  return gmStream.resize(width);
}

export default {
  getGmStream,
  toWebpImg,
  toBlurImg,
  toBase64,
  resizeImg,
};
