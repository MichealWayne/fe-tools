
/*
* 提示toast
* Toast
* css need (./index.less)
* @author: Micheal Wang
* @build time: 2017.12.23
* 
* @params {Object} options 构建配置
*         {String} background: 背景色
*         {String} color: 字体颜色
* @params {Object} options 调用配置
*         {String} html: 内容（必须）
*         {String} type: 类型 （'top' || 'middle' || 'bottom'默认）
*         {String} time: css动画时间
* @example: 
*     var toast = new Toast();
*     toast.show('好的');
* 
*     setTimeout(function () {
*         toast.show('一色热似懂非懂是水电费水电费水电费', 'middle', '5s');
*     }, 5000);
*/


class Toast {
    constructor(props = {}) {
        let { color, background } = props;
        this.color = color;
        this.background = background;
    }

    createDom (html, type = 'bottom', time = '2s') {
        let item = document.createElement('p');

        item.id = 'fundToast';
        item.className = `z-${type}`;
        item.innerHTML = html;
        item.style.animationDuration = time;
        item.style.webkitAnimationDuration = time;

        if (this.color) item.style.color = this.color;
        if (this.background) item.style.background = this.background;

        return item;
    }

    show (words, type, time) {
        type = type ? type : undefined;
        let _nowItem = this.createDom(words, type, time);
        _nowItem.style.animat

        let _item = document.getElementById('fundToast');
        if (_item) {
            _item.parentNode.replaceChild(_nowItem, _item);
        } else {
            document.body.appendChild(_nowItem)
        }

        let _width = _nowItem.getBoundingClientRect().width;

        _nowItem.style.width = _width + 'px';
        _nowItem.style.marginLeft = - _width / 2 + 'px';
        _nowItem.className += ' f-a-messageOut';

    }
}

module.exports = Toast;