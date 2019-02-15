'use strict';

const path = require('path');
const fs = require('fs');
const Tip = require('../base/lib/util/tip');


/*
* 获得图片文件数组
* @example return: ['a_2x.jpg', 'b_2x.png']
* @params {String} imgFolderPath: image folder path;
* @params {Boolean} notdoublebool: 不筛选'2x.'图;
* @return {Array}
*/
function getImgFiles (imgFolderPath, notdoublebool) {
    let imgArr = [];

    if (!imgFolderPath) return false;
    let files = fs.readdirSync(imgFolderPath, 'utf-8');

    for (let i in files) {
        if (typeof files[i] !== 'string' || !files[i].match(/\.(jpg|gif|jpeg|png|webp|bmp)+$/)) continue;
        if (!~imgArr.indexOf(files[i]) && (~files[i].indexOf('_2x.') || notdoublebool)) imgArr.push(files[i]);
    }

    return imgArr
}


module.exports = {
    getImgFiles
};
