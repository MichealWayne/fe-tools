'use strict';


const path = require('path');
const gm = require('gm').subClass({ imageMagick : true });
const Tip = require('../base/lib/util/tip');

/*
* 获得gm格式图片
*/
function getGmFile (filepath, filename, callback) {
    gm(path.join(filepath, filename)).identify(function (err, data) {
        if (err) {
            Tip.error(err);
            return false;
        }

        callback.call(this, this, data);
    });
}

/*
* 图片转为webp格式（文件名中的_2x.会被替换）
* @params {String} filepath: 图片所在目录;
* @params {String} filename: 图片文件名;
* @params {String} outpath: 输出目录;
* @params {Function} callback: callback（可选）;
*/
function toWebpImg (filepath, filename, outpath, callback) {
    let webpPath = path.join(outpath, filename.replace('_2x.', '.').split('.')[0] + '.webp');

    gm(path.join(filepath, filename))
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

/*
* 生成模糊图（gm格式）
* @params {GmFile} gmfile: gm格式图
* @params {Object} config: 配置信息
*                  color: 颜色总数
*                  blurRadius: 模糊半径
*                  blurSigma: 模糊Sigma值
* @return {GmFile}
*/
function toBlurImg (gmfile, { color = 8, blurRadius = 7, blurSigma = 3  }) {
    if (!gmfile) return false;

    gmfile.colors(color)
        .blur(blurRadius, blurSigma);

    return gmfile
}

/*
* 图片转base64
*/
function toBase64 (gmfile, callback, type = 'jpg') {
    gmfile.toBuffer(type, (err, buffer) => {
        if (err) {
            Tip.error(err);
            return false;
        }

        let _url = `data:image/${type};base64,${buffer.toString('base64')}`;
        if (callback) callback(_url);
    })
}

/*
* 图片改变尺寸
*/
function resizeImg (gmfile, width, height) {
    if (!width) {
        Tip.error('Error! no width config.')
        return false;
    }

    if (height) return gmfile.resize(width, height);
    else return gmfile.resize(width);
}

/*
* 按比例
*/

module.exports = {
    getGmFile,
    toWebpImg,
    toBlurImg,
    toBase64,
    resizeImg
}