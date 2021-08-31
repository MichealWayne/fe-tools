const fs = require('fs');

/**
 * @function getImgFiles
 * @description 获得图片文件数组
 * @example return: ['a_2x.jpg', 'b_2x.png']
 * @params {String} imgFolderPath: image folder path;
 * @params {Boolean} notdoublebool: 不筛选'2x.'图;
 * @return {Array}
 */
function getImgFiles(imgFolderPath, notdoublebool) {
  const imgArr = [];

  if (!imgFolderPath) return false;
  const files = fs.readdirSync(imgFolderPath, 'utf-8');

  for (const i in files) {
    if (typeof files[i] !== 'string' || !files[i].match(/\.(jpg|gif|jpeg|png|webp|bmp)+$/)) {
      continue;
    }
    if (!imgArr.includes(files[i]) && (files[i].includes('_2x.') || notdoublebool)) {
      imgArr.push(files[i]);
    }
  }

  return imgArr;
}

module.exports = {
  getImgFiles,
};
