/*
* 颜色以及图片处理
* @author: Micheal Wang
* @build time: 2017.11.15
*/

/*
* 随机生成16位颜色
* @return {String} 
*/
function randomColor() {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}

/*
* 16位色转rgb数组
* @param {String} color : hexadecimal number color
* @return {Array} 255色彩数组
*/
function getColorRgb(color) {
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = color.toLowerCase();

    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = '#';
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }

        //处理六位的颜色值  
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
        }
        return sColorChange
    }
        
    return sColor;
}

/*
* 判断浏览器是否支持webP格式图片
* @return {Boolean} 
*/
function isSupportWebP() {
    return !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
}

/*
* 压缩图片（jpg）
* @param {DOMelment} img: 图片元素
* @param {Number} rate: 压缩比例
* return {String} base64图片
*/
function compressImage(img, rate) {
    // 用于压缩image的canvas
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    // 瓦片canvas
    var tCanvas = document.createElement('canvas'),
        tctx = tCanvas.getContext('2d');

    // image信息
    var initSize = img.src.length,
        width = img.width,
        height = img.height;

    // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    var ratio;
    if ((ratio = width * height / 4000000) > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
    } else {
        ratio = 1;
    }
    canvas.width = width;
    canvas.height = height;

    // 铺底色
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //如果图片像素大于100万则使用瓦片绘制
    var count;
    var _widthrate = (width > 1000 || height > 1500) ? 0.5 : 1;
    if ((count = width * height / 1000000) > 1) {
        count = ~~(Math.sqrt(count) + 1); // 计算要分成多少块瓦片
        
        // 计算每块瓦片的宽和高
        var nw = ~~(width / count);
        var nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (var i = 0; i < count; i++) {
            for (var j = 0; j < count; j++) {
                tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                ctx.drawImage(tCanvas, i * nw, j * nh);
            }
        }
    } else {
        ctx.drawImage(img, 0, 0, width * _widthrate, height * _widthrate);
    }

    //进行最小压缩
    var ndata = canvas.toDataURL('image/jpeg', rate || 0.8);
    //console.log('压缩前：' + initSize);
    //console.log('压缩后：' + ndata.length);
    //console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
    return ndata;
}
