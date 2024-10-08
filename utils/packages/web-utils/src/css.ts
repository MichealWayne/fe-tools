/**
 * @module CSS
 * @author Wayne
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2024-08-25 10:14:19
 */

import { isUndefined } from 'utils';

/**
 * @function getPrefix
 * @description 可以用于判断当前浏览器是否需要添加 CSS3 属性的前缀，例如，在实现某些动画效果时，不同浏览器可能需要不同的前缀。
 * @return {string} css前缀，'webkit'/'o'/''
 * @example
const prefix = getPrefix();
const testEl = document.createElement('div');

// 设置 transform 样式
testEl.style[`${prefix}Transform` as keyof CSSStyleDeclaration] = 'translate3d(0,0,0)';

// 设置 transition 样式
testEl.style[`${prefix}Transition` as keyof CSSStyleDeclaration] = 'all 0.3s ease-in-out';

// 绑定事件
document.addEventListener(`${prefix}AnimationStart`, () => console.log(`${prefix}AnimationStart event triggered`));

// 解绑事件
document.removeEventListener(`${prefix}AnimationStart`, () => console.log(`${prefix}AnimationStart event triggered`));
 */
export function getPrefix() {
  const vendors = {
    Webkit: 'webkit',
    Moz: '',
    O: 'o',
  };

  const testEl = document.createElement('div');
  if (isUndefined(testEl.style.transform)) {
    for (const i in vendors) {
      if (!isUndefined(testEl.style[`${i}TransitionProperty` as keyof typeof testEl.style])) {
        return vendors[i as keyof typeof vendors];
      }
    }
  }
  return '';
}

/**
 * @function getStyle
 * @description **getStyle(el, property)** get DOM style（获取指定元素的 CSS 样式属性值）
 * @param {DOM Object} elem DOM元素（为了IE不能用Element）
 * @param {string} property css属性
 * @return {number | undefined} 返回属性值
 @example
// 获取元素宽度：
const element = document.getElementById('my-element');
const width = getStyle(element, 'width');
 */
export function getStyle(elem: any, property: string) {
  const value =
    elem.currentStyle?.[property] ||
    document.defaultView!.getComputedStyle(elem, null).getPropertyValue(property);
  const matches = value?.match(/^(\d+)(\.\d+)?px$/);
  // eslint-disable-next-line no-undefined
  return matches ? +matches[1] : undefined;
}

/**
 * @function getElementSize
 * @description **getElementStyle(el, property)** 获取元素的尺寸数据、如width/height
 * @param {HTMLElement} elem DOM元素
 * @param {string} property css属性
 * @return {number | undefined} 返回尺寸数值
 * @example
 *  const bodyWidth = getElementStyle(document.querySelector('body'), 'width')
 */
export function getElementSize(elem: HTMLElement, property: string): number {
  // IE currentStyle
  const value = (elem as any).currentStyle
    ? (elem as any).currentStyle[property]
    : document.defaultView?.getComputedStyle(elem, null).getPropertyValue(property);
  const matches = value?.match(/^(\d+)(\.\d+)?px$/);
  return matches ? +matches[1] : 0;
}
