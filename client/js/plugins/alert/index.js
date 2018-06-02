
/*
* 弹窗alert
* Alert
* css need (components.less, z-.less, colors.less, ./index.less)
* @author: Micheal Wang
* @build time: 2017.12.23
* 
* @params {Object} options 构建配置
*         {String} background: 背景色
* @params {Object} options 调用配置
*         {String} title: 标题
*         {String} className: 给.m-win新增class
*         {String} content: 内容（必须）
*         {Array} btns: 按钮数组
*                 {Object} options 按钮配置
*                 {String} text: 按钮文案（必须）
*                 {String} className: 按钮class
*                 {Function} callback: 按钮点击回调
@example: 
    var alert = new Alert();

    alert.show({
        title: '提示',
        content: '哈哈哈',
        className: 'j-test',
        btns: [
            { text: '关闭' },
            { text: '好的', callback: function() { alert(123456) } }
        ]
    })
*/

class Alert {
    constructor(props = {}) {
        let { background } = props;
        this.bgHtml = `<div class="m-win_bg" ${ background ? 'style="background:' + background + '"' : ''}></div>`;
    }

    createDom ({ title, content, btns = [], className } = params) {
        let item = document.createElement('div'),
            handleHide = this.hide,
            html = `<div class="m-win ${className || ''}">
                        ${title ? '<h4 class="m-tit">' + title + '</h4>' : ''}
                        <div class="m-ctn${ title ? '' : ' z-notit' }">${ content }</div>
                        <p class="f-b_1px bt_1px">${ btns.length ? btns.map((item, index) => {
                            return `<a data-index="${ index }" class="u-btn_il f-fl f-b_1px bl_1px ${ item.className ? item.className : '' }" style="width:${ Math.floor(100 / btns.length) + '%' }">${ item.text }</a>`
                        }).join('').replace('bl_1px', '') : `<a class="u-btn">确定</a>` }</p>
                    </div>
                    ${this.bgHtml}
                    `;

        item.id = 'fundAlert';
        item.innerHTML = html;

        let bg = document.createElement('div');
        bg.className = 'm-win_bg';
        if (this.background) bg.style.background = this.background

        if (btns.length) {
            let btnDoms = item.getElementsByClassName('u-btn_il');

            Array.prototype.forEach.call(btnDoms, item => {
                let index = item.getAttribute('data-index');

                if (!btns[index].callback) btns[index].callback = this.hide;
                item.addEventListener('click', btns[index].callback, false);
            });
        } else {
            item.getElementsByClassName('u-btn')[0].addEventListener('click', this.hide, false);;
        }
        

        return item;
    }

    show (params = {}) {
        if (!params.content) return false;
        let _nowItem = this.createDom(params);

        let _item = document.getElementById('fundAlert');
        if (_item) {
            _item.parentNode.replaceChild(_nowItem, _item);
        } else {
            document.body.appendChild(_nowItem)
        }

        _nowItem = _nowItem.getElementsByClassName('m-win')[0];
        let _height = _nowItem.getBoundingClientRect().height;

        _nowItem.style.marginTop = - _height / 2 + 'px';
        _nowItem.style.opacity = 1;
    }

    hide () {
        let _item = document.getElementById('fundAlert');
        if (_item) _item.className += ' z-hide';
    }
}

module.exports = Alert;