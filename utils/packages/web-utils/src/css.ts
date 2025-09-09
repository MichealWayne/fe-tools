/**
 * @module CSS
 * @author Wayne
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2024-08-25 10:14:19
 */

import { isUndefined } from 'utils';

/**
 * @function getPrefix
 * @description 检测当前浏览器所需的CSS供应商前缀。Detects the CSS vendor prefix required for the current browser
 * @returns {string} 供应商前缀：'webkit'（Chrome/Safari），'o'（Opera），或''（Firefox/标准）。The vendor prefix: 'webkit' (Chrome/Safari), 'o' (Opera), or '' (Firefox/standard)
 * @example
 * // Apply vendor-prefixed CSS properties
 * const prefix = getPrefix();
 * const element = document.createElement('div');
 *
 * // Set transform with proper prefix
 * element.style[`${prefix}Transform`] = 'translate3d(0, 0, 0)';
 * element.style[`${prefix}Transition`] = 'all 0.3s ease-in-out';
 *
 * @example
 * // Cross-browser animation event handling
 * const prefix = getPrefix();
 * const animationEvents = {
 *   webkit: 'webkitAnimationEnd',
 *   o: 'oAnimationEnd',
 *   '': 'animationend'
 * };
 *
 * element.addEventListener(animationEvents[prefix], () => {
 *   console.log('Animation completed');
 * });
 *
 * @example
 * // Feature detection with fallback
 * function applyModernCSS(element) {
 *   const prefix = getPrefix();
 *
 *   if (prefix !== null) {
 *     // Modern browser with CSS3 support
 *     element.style[`${prefix}Transform`] = 'scale(1.1)';
 *     element.style[`${prefix}Filter`] = 'blur(2px)';
 *   } else {
 *     // Fallback for older browsers
 *     element.style.zoom = '1.1';
 *     element.className += ' blur-fallback';
 *   }
 * }
 *
 * @since 1.0.0
 * @see {@link https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix} - CSS vendor prefixes
 * @see {@link https://caniuse.com/css-transitions} - CSS transitions browser support
 * @see {@link https://autoprefixer.github.io/} - Automated CSS prefixing tool
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html} - WCAG: Animation accessibility
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
 * @description 获取DOM元素特定属性的计算CSS样式值。Gets the computed CSS style value for a specific property of a DOM element
 * @param {HTMLElement} elem - 要获取样式的DOM元素。The DOM element to get styles from
 * @param {string} property - CSS属性名称（例如，'width'，'height'，'margin-top'）。The CSS property name (e.g., 'width', 'height', 'margin-top')
 * @returns {number | undefined} 像素中的数值，如果不是像素值则为undefined。The numeric value in pixels, or undefined if not a pixel value
 * @example
 * // Get element dimensions
 * const element = document.getElementById('my-element');
 * const width = getStyle(element, 'width');
 * const height = getStyle(element, 'height');
 * console.log(`Element size: ${width}x${height}px`);
 *
 * @example
 * // Check element positioning
 * const sidebar = document.querySelector('.sidebar');
 * const leftPosition = getStyle(sidebar, 'left');
 * const topPosition = getStyle(sidebar, 'top');
 *
 * if (leftPosition < 0) {
 *   // Element is positioned off-screen
 *   sidebar.style.left = '0px';
 * }
 *
 * @example
 * // Responsive design calculations
 * function adjustLayout() {
 *   const container = document.querySelector('.container');
 *   const containerWidth = getStyle(container, 'width');
 *
 *   if (containerWidth && containerWidth < 768) {
 *     // Apply mobile layout
 *     container.classList.add('mobile-layout');
 *   }
 * }
 *
 * @since 1.0.0
 * @see {@link getElementSize} - Get element size with better cross-browser support
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle} - Browser support: IE 9+, all modern browsers
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/currentStyle} - IE-specific currentStyle property
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
 * @description 获取元素的尺寸数据，如width/height。Gets the computed size data of an element, such as width/height
 * @param {HTMLElement} elem - DOM元素。The DOM element
 * @param {string} property - CSS属性。The CSS property
 * @return {number} 返回尺寸数值。Returns the size value
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
