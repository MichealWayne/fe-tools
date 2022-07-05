/**
 * @author Wayne
 * @Date 2021-04-27 14:47:13
 * @LastEditTime 2022-07-05 13:03:49
 */
import fs from 'fs';

const IMG_REG = /\.(jpg|gif|jpeg|png|webp|bmp)+$/;

/**
 * @function getImgFiles
 * @description 获得图片文件数组
 * @example return: ['a_2x.jpg', 'b_2x.png']
 * @params {String} imgFolderPath: image folder path;
 * @params {Boolean} notdoublebool: 不筛选'2x.'图;
 * @return {Array}
 */
function getImgList(imgFolderPath: string, notDoubleImg?: boolean) {
  const imgArr: string[] = [];

  if (!imgFolderPath) return imgArr;
  const files = fs.readdirSync(imgFolderPath, 'utf-8');

  for (const i in files) {
    if (typeof files[i] !== 'string' || !files[i].match(IMG_REG)) {
      continue;
    }
    if (!imgArr.includes(files[i]) && (files[i].includes('_2x.') || notDoubleImg)) {
      imgArr.push(files[i]);
    }
  }

  return imgArr;
}

export default getImgList;
