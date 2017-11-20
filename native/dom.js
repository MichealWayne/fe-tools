/*
* DOM操作
* @author: Micheal Wang
* @build time: 2017.11.15
*/

// class

/*
* 判断元素是否有某个class
* @param {DOMElement} element: 元素
* @param {String} className: class名
* @return {Boolean}
*/
function hasClass(element, className) {
    return (new RegExp('(\\s|^)' + className + '(\\s|$)')).test(element.className);
}

/*
* 为元素添加class
* (need hasClass)
* @param {DOMElement} element: 元素
* @param {String} className: class名
*/
function addClass(element, className) {
    if (!hasClass(element, className)) {
        element.className += ' ' + className;
    }
}

/*
* 为元素移除class
* (need hasClass)
* @param {DOMElement} element: 元素
* @param {String} className: class名
*/
function removeClass(element, className) {
    if (hasClass(element, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        element.className = element.className.replace(reg, ' ');
    }
}

/*
* 查找classElements（PC-ie8以下）
* @param {String} className: class名;
* @param {DOMelement} element: 父节点
* @param {Array} 节点数组
*/
function getElementsByClassName(className, element) {
    if (document.getElementsByClassName) {
        return (element || document).getElementsByClassName(className);
    }

    var children = (element || document).getElementsByTagName('*');
    var elements = [];
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var classNames = child.className.split(' ');
        for (var j = 0; j < classNames.length; j++) {
            if (classNames[j] == className) {
                elements.push(child);
                break;
            }
        }
    }
    return elements;
}

// scroll


/* 
* 获取一个元素的距离文档(document)的位置，类似jQ中的offset()
* @param {DOMelement} element: 父节点
* @returns { {left: number, top: number} }
*/
function offset(element) {
    var pos = {
        left: 0,
        top: 0
    };

    while (element) {
        pos.left += element.offsetLeft;
        pos.top += element.offsetTop;
        element = element.offsetParent;
    };

    return pos;
}


/*
* 获取滚动条距顶部的距离
* @return {Number} 滚动高度
*/
function getScrollTop() {
    return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
}

/*
* 设置滚动条距顶部的距离
* @param {Number} value: 滚动高度;
* @return {Number} value
*/
function setScrollTop(value) {
    window.scrollTo(0, value);
    return value;
}


/*
* animate frame
*/
var requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

/*
* 在${duration}时间内，滚动条平滑滚动到${to}指定位置
* (need getScrollTop, setScrollTop,requestAnimFrame)
* @param {Number} to: 滚动高度 
* @param {Number} duration: 滚动时间
*/
function animateScrollTo(to, duration) {
    if (duration < 0) {
        setScrollTop(to);
        return
    }

    var diff = to - getScrollTop();
    if (diff === 0) return 

    var step = diff / duration * 10;
    requestAnimationFrame(function() {
        if (Math.abs(step) > Math.abs(diff)) {
            setScrollTop(getScrollTop() + diff);
            return;
        }

        setScrollTop(getScrollTop() + step);
        if (diff > 0 && getScrollTop() >= to || diff < 0 && getScrollTop() <= to) {
            return;
        }

        animateScrollTo(to, duration - 16);
    });
}