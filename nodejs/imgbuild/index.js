'use strict';

const FS = require('../base/lib/fs/fsFuncs');
const Tip = require('../base/lib/util/tip');
const setnew = require('./setnewimg');
const handleold = require('./getoldimg');

let config = require('./config')

const fs = require('fs'),
    path = require('path');

let ImgBuild = {
    // 替换页面中的base64占位
    renderHtml: (filepath, imgjson, pc, callback) => {
        if (!imgjson || !filepath) {
            Tip.error('Error!No filepath or imgjson.(ImgBuild.renderHtml())');
            return false;
        }

        fs.readFile(filepath, 'utf-8', (err, data) => {
            if (err) {
                Tip.error(err);
                return false;
            }

            let _data = data.replace(/ijijin-img=[\'\"]?([^\'\"]*)[\'\"]?/gi, (matches, source) => {
                if (~source.indexOf('.base64')) {
                    let _item = imgjson[source.split('.')[0].split('/').slice(-1) + '_min'];
                    let _src = _item ? _item.base64 : source;

                    if (!_item) return `ijijin-img="${source}"`;
                    else if (pc) return `src="${_src}" data-original="${source.replace(source.split('/').slice(-1), _item.src)}"`;
                    else return `src="${_src}" data-format="${_item.format}" data-original="${source.replace('.base64', '')}"`;
                } else return `ijijin-img="${source}"`
            });

            fs.writeFile(filepath, _data, err => {
                if (err) {
                    Tip.error(err);
                    return false;
                }

                Tip.safe(`Base64 image rendered success!(${filepath})`, true);
                if (callback) callback();
            });
        });
    }
};

/*
 * console base64
 */
ImgBuild.consoleBase64 = (src, type) => {
    let _src = src;
    setnew.getGmFile(path.dirname(_src), path.basename(_src), data => {
        setnew.toBase64(
            data,
            base64 => console.log(base64),
            type
        )
    });
};

/*
 * get webp image
 */
ImgBuild.toWebpImg = src => {
    let _src = src,
        _folder = path.dirname(_src),
        _filename = path.basename(_src);
    setnew.getGmFile(_folder, _filename, data => {
        setnew.toWebpImg(
            _folder,
            _filename,
            _folder
        )
    });
};

/*
* mobile image handle
*/
ImgBuild.handleMobileImg = ({
                                src = 'images/',
                                dist,
                                renderHtml = 'index.html',
                                callback,
                                dirname,
                                notdoublebool = false,
                                pc = false
                            } = options) => {

    if (dirname) config.dirname = dirname;

    let _src = path.join(config.dirname, src),
        _dist = path.join(config.dirname, dist || src),
        _htmlsrc = path.join(config.dirname, renderHtml);

    let oldImgs = handleold.getImgFiles(_src, notdoublebool);
    if (!oldImgs.length) return false;

    FS.setFolder(_dist, true);
    console.log(oldImgs);

    let base64Arr = [];
    oldImgs.forEach(imgname => {
        // webp
        setnew.toWebpImg(_src, imgname, _dist);

        setnew.getGmFile(_src, imgname, (gmfile, data) => {
			let _gm = setnew.resizeImg(gmfile, data.size.width * 0.64),
                _name = imgname.replace('_2x', '').split('.');
				
                _name = _name[0] + '_1x.' + _name[1];

            // 1x
            _gm.write(_dist + _name, err => {
                if (err) Tip.error(err);
                else Tip.safe(`${_name}  生成成功。`)
            });
			
            // base64
            let _gmbase64 = setnew.resizeImg(gmfile, data.size.width * 0.2);

            setnew.toBase64(_gmbase64.colors(8).blur(7, 3), img => {
                base64Arr.push({
                    src: imgname,
                    base64: img
                });

                if (base64Arr.length === oldImgs.length) {  // analyse all images
                    let _obj = {};

                    for (let i in base64Arr) {
                        if (!base64Arr[i].src) continue;
                        let _name = base64Arr[i].src.split('.')[0];

                        if (!notdoublebool && _name.slice(-3) === '_2x') _name = _name.slice(0, -3);

                        _name += '_min';
                        _obj[_name] = {
                            src: base64Arr[i].src,
                            format: base64Arr[i].src && base64Arr[i].src.split('.').length > 1 ? base64Arr[i].src.split('.')[1].toLowerCase() : null,
                            base64: base64Arr[i].base64
                        };
                    }

                    // base64 json
                    FS.setFile(_dist + '/base64.json', JSON.stringify(_obj), null, true);

                    // render html
                    ImgBuild.renderHtml(_htmlsrc, _obj, pc);

                    // callback
                    if (callback) callback(_obj);
                }
            });
        });
    });

    return oldImgs;
};


module.exports = ImgBuild;