/**
 * @module DOM
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2025-04-20 13:48:40
 */

import { isUndefined } from 'utils';

/**
 * @function isPageVisible
 * @description 当前页面是否为显示状态
 * @return {boolean} 是否为显示状态
 * @example
 if (!isPageVisible()) {
  // 取消一些请求事件等处理
 }
 */
export function isPageVisible() {
  return !document.hidden;
}

/**
 * @function hasClass
 * @description 判断节点elem是否包含某个class
 * @param {HTMLElement} elem DOM节点
 * @param {string} className 样式类名
 * @return {boolean} 节点是否包含对应类名
 * @example
 // 测试用例1：测试样式类名存在情况
 const elem = document.createElement('div');
 elem.className = 'test-class';
 const result1 = hasClass(elem, 'test-class'); // true
 const result2 = hasClass(elem, 'other-class'); // false

 // 测试用例2：测试样式类名前后有其他类名情况
 elem.className = 'prev-class test-class next-class';
 const result3 = hasClass(elem, 'test-class'); // true
 const result4 = hasClass(elem, 'prev-class'); // false
 const result5 = hasClass(elem, 'next-class'); // false

 // 测试用例3：测试样式类名前后有多余空格情况
 elem.className = '  test-class  ';
 const result6 = hasClass(elem, 'test-class'); // true
 const result7 = hasClass(elem, '  test-class  '); // false
 const result8 = hasClass(elem, 'test-class  '); // false
 */
export function hasClass(elem: HTMLElement, className: string) {
  return new RegExp(`(\\s|^)${className}(\\s|$)`).test(elem.className);
}

/**
 * @function addClass
 * @description 给DOM节点elem添加class
 * @param {HTMLElement} elem DOM节点
 * @param {String} className 样式类名
 * @example
const div = document.createElement('div');
div.className = 'foo';
addClass(div, 'bar');
 */
export function addClass(elem: HTMLElement, className: string) {
  if (!hasClass(elem, className)) {
    elem.className += ` ${className}`;
  }
}

/**
 * @function removeClass
 * @description 移除DOM节点的某个class
 * @param {HTMLElement} elem DOM节点
 * @param {string} className 样式类名
 * @example
 const elem = document.createElement('div');
 elem.className = 'foo bar';
 removeClass(elem, 'foo');
 console.log(elem.className); // 'bar'
 */
export function removeClass(elem: HTMLElement, className: string) {
  if (hasClass(elem, className)) {
    const CLASS_NAME_REGEX = new RegExp(`(\\s|^)${className}(\\s|$)`);
    elem.className = elem.className.replace(CLASS_NAME_REGEX, ' ');
  }
}

/**
 * @function insertAfter
 * @description 在指定元素之后插入新元素
 * @param {HTMLElement} elem DOM节点
 * @param {string} htmlString HTML字符串
 * @return {HTMLElement} 插入的元素
 * @example
// 在一个元素之后插入一个新元素
const parent = document.getElementById('parent');
const newElem = document.createElement('div');
newElem.textContent = 'Inserted after parent';
insertAfter(parent, newElem.outerHTML);

// 在一个元素之后插入 HTML 字符串
const target = document.getElementById('target');
const html = '<div>Inserted after target</div>';
insertAfter(target, html);
 */
export function insertAfter(elem: HTMLElement, htmlString: string) {
  return elem.insertAdjacentHTML('afterend', htmlString);
}

/**
 * @function insertBefore
 * @description 在指定元素之前插入新元素
 * @param {HTMLElement} elem DOM节点 
 * @param {string} htmlString HTML字符串
 * @return {HTMLElement} 插入的元素
  * @example
// 在一个元素之前插入一个新元素
const parent = document.getElementById('parent');
const newElem = document.createElement('div');
newElem.textContent = 'Inserted before parent';
insertBefore(parent, newElem.outerHTML);

// 在一个元素之谦插入 HTML 字符串
const target = document.getElementById('target');
const html = '<div>Inserted before target</div>';
insertBefore(target, html);
 */
export function insertBefore(elem: HTMLElement, htmlString: string) {
  return elem.insertAdjacentHTML('beforebegin', htmlString);
}

/**
 * @function elementContains
 * @description 检查是否包含子元素
 * @param {HTMLElement} parent 父元素
 * @param {HTMLElement} child 子元素
 * @return {boolean} 是否包含子元素
 * @example
const parent = document.getElementById('parent');
const child = document.getElementById('child');
if (elementContains(parent, child)) {
  console.log('Parent contains child');
} else {
  console.log('Parent does not contain child');
}
 */
export function elementContains(parent: HTMLElement, child: HTMLElement) {
  return parent !== child && parent.contains(child);
}

/**
 * @function hide
 * @description 隐藏元素
 * @param  {...HTMLElement} elems DOM节点列表
 * @example
const elementsToHide = document.querySelectorAll('.hide-me');
hide(...elementsToHide);
 */
export function hide(...elems: HTMLElement[]) {
  [...elems].forEach(e => (e.style.display = 'none'));
}

/**
 * @function nodeListToArray
 * @description dom列表伪数组转为数组
 * @param {HTMLElement[]} nodeList DOM节点列表
 * @return {HTMLElement[]} DOM节点数组
 * @example
// 获取所有 div 元素，得到的是一个类数组对象 NodeList
const divs = document.querySelectorAll('div');

// 调用函数将 NodeList 转换为数组
const divArray = nodeListToArray(divs);

// 现在可以使用数组的方法对 divArray 进行操作了
divArray.forEach(div => {
  // ...
});
 */
export function nodeListToArray(nodeList: HTMLElement[]) {
  return [...nodeList];
}

/**
 * @function setAttribute
 * @description 设置指定 DOM 元素的属性值
 * @param {HTMLElement} elem DOM节点
 * @param {String} key 属性名
 * @param {String} value 属性值
 * @example
const elem = document.getElementById('myElement');
setAttribute(elem, 'style', 'color: red; font-size: 16px;');

const elem = document.getElementById('myInput');
setAttribute(elem, 'value', 'hello world');
 */
export function setAttribute(elem: HTMLElement, key: string, value: string) {
  const tagName = (elem.tagName || '').toLowerCase();
  switch (key) {
    case 'style':
      elem.style.cssText = value;
      break;
    case 'value':
      if (tagName === 'input' || tagName === 'textarea') {
        (elem as HTMLInputElement).value = value;
      } else {
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
 * @description 将字符串中的 HTML 特殊字符转义成对应的实体字符，以避免 XSS 攻击等问题。
 * @param {string} str 需要转义的字符串
 * @example
  const inputBox = document.getElementById('input-box');
  const outputBox = document.getElementById('output-box');

  inputBox.addEventListener('input', () => {
    const escapedText = escapeHTML(inputBox.value);
    outputBox.innerText = escapedText;
  });
 */
export function escapeHTML(str: string) {
  return str?.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        // eslint-disable-next-line quotes
        "'": '&#39;',
        '"': '&quot;',
      }[tag] || tag)
  );
}

/* scorll */

/**
 * @function getOffsetPos
 * @description 获取一个元素的距离文档(document)左上角的位置，类似jQ中的offset()
 * @param {HTMLElement} elem 父节点
 * @return { {left: number, top: number} } 元素的位置
 * @example
 const elem = document.getElementById('my-elem');
const offsetPos = getOffsetPos(elem);
console.log(offsetPos.left, offsetPos.top);

 */
export function getOffsetPos(elem?: HTMLElement) {
  const pos = {
    left: 0,
    top: 0,
  };

  while (elem) {
    pos.left += elem.offsetLeft;
    pos.top += elem.offsetTop;
    // eslint-disable-next-line no-param-reassign
    elem = elem.offsetParent as HTMLElement;
  }

  return pos;
}

/**
 * @function getScrollTop
 * @description 获取滚动条距顶部的距离
 * @return {number} 滚动高度
 * @example
 const scrollTop = getScrollTop();
 console.log(scrollTop);
 */
export function getScrollTop() {
  return document.documentElement?.scrollTop || document.body.scrollTop;
}

/**
 * @function getScrollPosition
 * @description 获取文档滚动的位置
 * @param {Element} elem 滚动的元素
 * @returns { {x: number, y: number} } 滚动的位置
 * @example
  const scrollPos = getScrollPosition();
 console.log(scrollPos.x, scrollPos.y);
 */
export function getScrollPosition(elem = window) {
  return {
    x: !isUndefined(elem.pageXOffset) ? elem.pageXOffset : elem.screenLeft,
    y: !isUndefined(elem.pageYOffset) ? elem.pageYOffset : elem.screenTop,
  };
}

/**
 * @function setScrollTop
 * @description 设置滚动条距顶部的距离
 * @param {Number} height 滚动高度
 * @return {Number} 滚动高度
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
 * @param {number} to 滚动高度
 * @param {number} duration 滚动时间
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
 * @param {DOMElement} elemSelector DOM元素
 */
export function smoothScroll(elemSelector: string) {
  document.querySelector(elemSelector)?.scrollIntoView({
    behavior: 'smooth',
  });
}

/**
 * @function disableCopy
 * @description 禁止网页复制粘贴
 */
export function disableCopy() {
  const html = document.querySelector('html');
  if (html) {
    html.oncopy = () => false;
    html.onpaste = () => false;
  }
}
