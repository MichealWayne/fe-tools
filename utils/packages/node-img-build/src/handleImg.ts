/**
 * @author Wayne
 * @Date 2021-04-27 14:47:13
 * @LastEditTime 2022-07-05 11:32:42
 */
import path from 'path';
import { Tip } from 'node-utils';
import gmConstructor from 'gm';

const gm = gmConstructor.subClass({ imageMagick: true });

/**
 * @function getGmFile
 * @description 获得gm格式图片
 */
export function getGmStream(
  filePath: string,
  imgName: string,
  callback: (data: gmConstructor.ImageInfo, gm?: gmConstructor.State) => void
) {
  gm(path.join(filePath, imgName)).identify(function (err, data) {
    if (err) {
      Tip.error(err);
      return false;
    }

    return callback.call(gm, data);
  });
}

/**
 * @function toWebpImg
 * @description 图片转为webp格式（文件名中的_2x.会被替换）
 * @params {String} filepath: 图片所在目录;
 * @params {String} filename: 图片文件名;
 * @params {String} outpath: 输出目录;
 * @params {Function} callback: callback（可选）;
 */
export function toWebpImg(
  filePath: string,
  imgName: string,
  outPath: string,
  callback?: (webPath: string) => void
) {
  const webpPath = path.join(outPath, imgName.replace('_2x.', '.').split('.')[0] + '.webp');

  gm(path.join(filePath, imgName))
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
 * @params {GmFile} gmfile: gm格式图
 * @params {Object} config: 配置信息
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

  gmStream.colors(color).blur(blurRadius, blurSigma);

  return gmStream;
}

/**
 * @function toBase64
 * @description 图片转base64
 */
export function toBase64(
  gmStream: gmConstructor.State,
  callback: (base64: string) => void,
  type = 'jpg'
) {
  gmStream.toBuffer(type, (err, buffer) => {
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
 */
export function resizeImg(gmStream: gmConstructor.State, width: number, height?: number) {
  if (!width) {
    Tip.error('Error! no width config.');
    return false;
  }

  if (height) {
    return gmStream.resize(width, height);
  } else {
    return gmStream.resize(width);
  }
}

export default {
  getGmStream,
  toWebpImg,
  toBlurImg,
  toBase64,
  resizeImg,
};
