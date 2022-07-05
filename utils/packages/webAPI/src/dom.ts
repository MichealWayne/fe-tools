/**
 * @module dom
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2022-07-05 13:29:46
 */

/**
 * @function isBrowser
 * @description 当前页面是否在浏览器环境下
 * @return {Boolean}
 */
export function isBrowser() {
  return ![typeof window, typeof document].includes('undefined');
}

/**
 * @function isBrowserTab
 * @description 当前页面是否为显示状态
 * @return {Boolean}
 */
export function isBrowserTab() {
  return !document.hidden;
}

/**
 * @function hasClass
 * @description 判断节点elem是否包含某个class
 * @param {Element} elem
 * @param {String} className
 * @return {Boolean}
 */
export function hasClass(elem: HTMLElement, className: string) {
  return new RegExp('(\\s|^)' + className + '(\\s|$)').test(elem.className);
}

/**
 * @function addClass
 * @description 给DOM节点elem添加class
 * @param {Element} elem
 * @param {String} className
 */
export function addClass(elem: HTMLElement, className: string) {
  if (!hasClass(elem, className)) {
    elem.className += ' ' + className;
  }
}

/**
 * @function removeClass
 * @description 移除DOM节点的某个class
 * @param {Element} elem
 * @param {String} className
 */
export function removeClass(elem: HTMLElement, className: string) {
  if (hasClass(elem, className)) {
    const reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    elem.className = elem.className.replace(reg, ' ');
  }
}

/**
 * @function insertAfter
 * @description 在指定元素之后插入新元素
 * @param {DOMElement} elem
 * @param {String} htmlString
 */
export function insertAfter(elem: HTMLElement, htmlString: string) {
  return elem.insertAdjacentHTML('afterend', htmlString);
}

/**
 * @function insertBefore
 * @description 在指定元素之前插入新元素
 * @param {DOMElement} el
 * @param {String} htmlString
 */
export function insertBefore(el: HTMLElement, htmlString: string) {
  return el.insertAdjacentHTML('beforebegin', htmlString);
}

/**
 * @function elementContains
 * @description 检查是否包含子元素
 * @param {DOMElement} parent
 * @param {DOMElement} child
 */
export function elementContains(parent: HTMLElement, child: HTMLElement) {
  return parent !== child && parent.contains(child);
}

/**
 * @function hide
 * @description 隐藏元素
 * @param  {...DOMElement} el
 */
export function hide(...el: HTMLElement[]) {
  [...el].forEach(e => (e.style.display = 'none'));
}

/**
 * @function nodeListToArray
 * @description dom列表伪数组转为数组
 * @param {DOMElement[]} nodeList
 */
export function nodeListToArray(nodeList: HTMLElement[]) {
  return [...nodeList];
}

/**
 * @function setAttribute
 * @param {Element} elem
 * @param {String} key
 * @param {String} value
 */
export function setAttribute(elem: HTMLElement, key: string, value: string) {
  let { tagName } = elem;
  switch (key) {
    case 'style':
      elem.style.cssText = value;
      break;
    case 'value':
      tagName = (tagName || '').toLowerCase();
      if (tagName === 'input' || tagName === 'textarea') {
        (elem as HTMLInputElement).value = value;
      } else {
        // if it is not a input or textarea, use `setAttribute` to set
        elem.setAttribute(key, value);
      }
      break;
    default:
      elem.setAttribute(key, value);
      break;
  }
}

/**
 * @function escapeHTML
 * @param {String} str
 */
export function escapeHTML(str: string) {
  return str.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '%lt;',
        '>': '%gt;',
        "'": '&#39;',
        '"': '&quot;',
      }[tag] || tag)
  );
}

/* scorll */

/**
 * @function getOffsetPos
 * @description 获取一个元素的距离文档(document)的位置，类似jQ中的offset()
 * @param {DOMElement} elem 父节点
 * @returns { {left: number, top: number} }
 */
export function getOffsetPos(elem: HTMLElement | null) {
  const pos = {
    left: 0,
    top: 0,
  };

  while (elem) {
    pos.left += elem.offsetLeft;
    pos.top += elem.offsetTop;
    elem = elem.offsetParent as HTMLElement;
  }

  return pos;
}

/**
 * @function getScrollTop
 * @description 获取滚动条距顶部的距离
 * @return {Number} 滚动高度
 */
export function getScrollTop() {
  return (
    (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
  );
}

/**
 * @function getScrollPosition
 * @param {Element} elem
 * @returns { {x: number, y: number} }
 */
export function getScrollPosition(elem = window) {
  return {
    x: elem.pageXOffset !== undefined ? elem.pageXOffset : elem.screenLeft,
    y: elem.pageYOffset !== undefined ? elem.pageYOffset : elem.screenTop,
  };
}

/**
 * @function setScrollTop
 * @description 设置滚动条距顶部的距离
 * @param {Number} height 滚动高度
 * @return {Number} value
 */
export function setScrollTop(height: number) {
  window.scrollTo(0, height);
  return height;
}

/**
 * animate frame
 */
declare global {
  interface Window {
    mozRequestAnimationFrame?: any;
  }
}
export const requestAnimFrame = (function () {
  if (typeof window !== 'undefined') {
    return (
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window['webkitRequestAnimationFrame' as any]
    );
  }

  return function (callback: (...args: unknown[]) => unknown) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

/**
 * @function animateScrollTo
 * @description 在${duration}时间内，滚动条平滑滚动到${to}指定位置
 *  (need getScrollTop, setScrollTop,requestAnimFrame)
 * @param {Number} to 滚动高度
 * @param {Number} duration 滚动时间
 */
export function animateScrollTo(to: number, duration: number) {
  if (duration < 0) {
    setScrollTop(to);
    return;
  }

  const diff = to - getScrollTop();
  if (diff === 0) return;

  const step = (diff / duration) * 10;
  requestAnimationFrame(function () {
    if (Math.abs(step) > Math.abs(diff)) {
      setScrollTop(getScrollTop() + diff);
      return;
    }

    setScrollTop(getScrollTop() + step);
    if ((diff > 0 && getScrollTop() >= to) || (diff < 0 && getScrollTop() <= to)) {
      return;
    }

    animateScrollTo(to, duration - 16);
  });
}

/**
 * @function smoothScroll
 * @description 指定元素滚动到可视区域
 * @param {DOMElement} elemSelector
 */
export function smoothScroll(elemSelector: string) {
  document.querySelector(elemSelector)!.scrollIntoView({
    behavior: 'smooth',
  });
}

/**
 * @function disableCP
 * @description 禁止网页复制粘贴
 */
export function disableCP() {
  const html = document.querySelector('html')!;
  html.oncopy = () => false;
  html.onpaste = () => false;
}

/**
 * @function getElementSize
 * @description **getElementStyle(el, property)** get DOM style
 * @param {HTMLElement} elem element
 * @param {string} property css property
 * @return {number | undefined}
 * @example
 *  const bodyWidth = getElementStyle(document.querySelector('body'), 'width')
 */
export function getElementSize(elem: HTMLElement, property: string): number {
  // IE currentStyle
  const value = (elem as any).currentStyle
    ? (elem as any).currentStyle[property]
    : document.defaultView?.getComputedStyle(elem, null).getPropertyValue(property);
  const matches = value && value.match(/^(\d+)(\.\d+)?px$/);
  return matches ? +matches[1] : 0;
}
