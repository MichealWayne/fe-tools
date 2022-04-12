/**
 * @module dom
 */

/**
 * @function isBrowser
 * @description 是否在浏览器环境下
 * @return {boolean}
 */
export function isBrowser() {
  return ![typeof window, typeof document].includes('undefined');
}

/**
 * @function isBrowserTab
 * @description 当前页面是否显示
 * @return {boolean}
 */
export function isBrowserTab() {
  return !document.hidden;
}

/**
 * @function hasClass
 * @param {Element} element
 * @param {string} className
 * @return {boolean}
 */
export function hasClass(element: HTMLElement, className: string) {
  return new RegExp('(\\s|^)' + className + '(\\s|$)').test(element.className);
}

/**
 * @function addClass
 * @param {Element} element
 * @param {string} className
 */
export function addClass(element: HTMLElement, className: string) {
  if (!hasClass(element, className)) {
    element.className += ' ' + className;
  }
}

/**
 * @function removeClass
 * @param {Element} element
 * @param {string} className
 */
export function removeClass(element: HTMLElement, className: string) {
  if (hasClass(element, className)) {
    const reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    element.className = element.className.replace(reg, ' ');
  }
}

/**
 * @function insertAfter
 * @description 在指定元素之后插入新元素
 * @param {dom element} el
 * @param {string} htmlString
 */
export function insertAfter(el: HTMLElement, htmlString: string) {
  return el.insertAdjacentHTML('afterend', htmlString);
}

/**
 * @function insertBefore
 * @description 在指定元素之前插入新元素
 * @param {dom element} el
 * @param {string} htmlString
 */
export function insertBefore(el: HTMLElement, htmlString: string) {
  return el.insertAdjacentHTML('beforebegin', htmlString);
}

/**
 * @function elementContains
 * @description 检查是否包含子元素
 * @param {dom element} parent
 * @param {dom element} child
 */
export function elementContains(parent: HTMLElement, child: HTMLElement) {
  return parent !== child && parent.contains(child);
}

/**
 * @function hide
 * @description 隐藏元素
 * @param  {...dom element} el
 */
export function hide(...el: HTMLElement[]) {
  [...el].forEach(e => (e.style.display = 'none'));
}

/**
 * @function nodeListToArray
 * @description dom列表伪数组转为数组
 * @param {dom element list} nodeList
 */
export function nodeListToArray(nodeList: HTMLElement[]) {
  return [...nodeList];
}

/**
 * @function setAttribute
 * @param {Element} node
 * @param {string} key
 * @param {string} value
 */
export function setAttribute(node: HTMLElement, key: string, value: string) {
  let { tagName } = node;
  switch (key) {
    case 'style':
      node.style.cssText = value;
      break;
    case 'value':
      tagName = (tagName || '').toLowerCase();
      if (tagName === 'input' || tagName === 'textarea') {
        (node as HTMLInputElement).value = value;
      } else {
        // if it is not a input or textarea, use `setAttribute` to set
        node.setAttribute(key, value);
      }
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
}

/**
 * @function escapeHTML
 * @param {string} str
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
 * @param {DOMelement} element: 父节点
 * @returns { {left: number, top: number} }
 */
export function getOffsetPos(element: HTMLElement | null) {
  const pos = {
    left: 0,
    top: 0,
  };

  while (element) {
    pos.left += element.offsetLeft;
    pos.top += element.offsetTop;
    element = element.offsetParent as HTMLElement;
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
 * @param {Element} el
 * @returns { {x: number, y: number} }
 */
export function getScrollPosition(el = window) {
  return {
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.screenLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.screenTop,
  };
}

/**
 * @function setScrollTop
 * @description 设置滚动条距顶部的距离
 * @param {number} height: 滚动高度;
 * @return {number} value
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
 * (need getScrollTop, setScrollTop,requestAnimFrame)
 * @param {Number} to: 滚动高度
 * @param {Number} duration: 滚动时间
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
 * @param {dom element} elemSelector
 */
export function smoothScroll(elemSelector: string) {
  document.querySelector(elemSelector)?.scrollIntoView({
    behavior: 'smooth',
  });
}

/**
 * @function disableCP
 * @description 禁止网页复制粘贴
 */
export function disableCP() {
  const html = document.querySelector('html') as HTMLElement;
  html.oncopy = () => false;
  html.onpaste = () => false;
}
