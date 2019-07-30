/*
 * 下拉刷新
 * css need (./index.less)
 * @author: Micheal Wang
 * @build time: 2018.06.13
 * 
 * @params {Object} option 调用配置
 *         {String} container: 作用容器
 *         {String} imageSrc: 刷新图片
 *         {Function} next: 下拉后回调（恢复状态需使用this.back()）
 * @example:
    PullRefresh({
        container: 'm-container',
        next: function () {
            console.log(123);
            this.back();
        }
    });
 */

function PullRefresh(option) {
    let defaults = {
        container: '',
        next: function() {}
    };
    let length,
        isLock = false, // 是否锁定整个操作
        isCanDo = false, // 是否移动滑块
        isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
        hasTouch = 'ontouchstart' in window && !isTouchPad;

    let obj = document.querySelector(option.container) || document.body;
    let objparent = obj.parentElement;

    /* 操作方法 */
    let fn = { // 移动容器
        translate: function(diff) {
            obj.style.webkitTransform = 'translate3d(0,' + diff + 'px,0)';
            obj.style.transform = 'translate3d(0,' + diff + 'px,0)';
        },
        // 设置效果时间
        setTransition: function(time) {
            obj.style.webkitTransition = 'all ' + time + 's';
            obj.style.transition = 'all ' + time + 's';
        },
        // 返回到初始位置
        back: function() {
            fn.translate(0 - offset); //标识操作完成
            isLock = false;
        },
        // 字符串转DOM
        strToDom: function(arg) {
            let objE = document.createElement('div');
            objE.innerHTML = arg;
            return objE.firstChild;
        }
    };

    //添加元素
    let loadingHTML = `<div id="fundPullRefresh">
                            <img src="{option.imageSrc || '//s.thsi.cn/ijijin/image/fundloading.png'}" class="u-loading_img a-loading_imgrotate">
                            <span class="u-loading_text">下拉加载</span>
                        </div>`;
    obj.insertBefore(fn.strToDom(loadingHTML), obj.firstChild);
    let loadImg = document.querySelector('.u-loading_img');
    let loadText = document.querySelector('.u-loading_text');
    let loading = document.querySelector('#fundPullRefresh');
    let offset = loading.clientHeight;

    fn.translate(0 - offset);
    obj.addEventListener('touchstart', start, false);
    obj.addEventListener('touchmove', move, false);
    obj.addEventListener('touchend', end, false);
    obj.addEventListener('mousedown', start, false);
    obj.addEventListener('mousemove', move, false);
    obj.addEventListener('mouseup', end, false); // 滑动开始

    // touchstart
    function start(e) {
        if (objparent.scrollTop <= 0 && !isLock) {
            let even = typeof event === 'undefined' ? e : event; // 标识操作进行中
            isLock = true;
            isCanDo = true; // 保存当前鼠标Y坐标
            start = hasTouch ? even.touches[0].pageY : even.pageY; // 消除滑块动画时间
            fn.setTransition(0);
            loadText.innerHTML = '下拉加载';
        }
        return false;
    }

    // 滑动中
    function move(e) {
        if (window.pageYOffset > 0) return false;
        if (objparent.scrollTop <= 0 && isCanDo) {
            let even = typeof event === 'undefined' ? e : event; // 保存当前鼠标Y坐标
            end = hasTouch ? even.touches[0].pageY : even.pageY;
            if (start < end) {
                //even.preventDefault(); // 消除滑块动画时间
                fn.setTransition(0); // 移动滑块
                if ((end - start - offset) / 2 <= 150) {
                    length = (end - start - offset) / 2;
                    fn.translate(length);
                } else {
                    length += 0.3;
                    fn.translate(length);
                }
                if (end - start > offset) {
                    loadImg.classList.remove('a-loading_imgrotate');
                    loadImg.style.webkitTransform = 'rotate(' + (end - start) * 5 + 'deg)';
                    loadImg.style.transform = 'rotate(' + (end - start) * 5 + 'deg)';
                    loadText.innerHTML = '释放刷新';
                }
				return false;
            }
        }
    } //滑动结束

    function end(e) {
        if (isCanDo) {
            isCanDo = false; // 判断滑动距离是否大于等于指定值
            loadImg.classList.add('a-loading_imgrotate');
            if (end - start >= offset) { // 设置滑块回弹时间
                fn.setTransition(1); // 保留提示部分
                fn.translate(0); // 执行回调函数
                loadText.innerHTML = '加载中...';
                if (typeof option.next == 'function') {
                    option.next.call(fn, e);
                }
            } else { // 返回初始状态
                fn.back();
            }
        }
    }
}


module.exports = PullRefresh;