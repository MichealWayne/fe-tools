/**
 * @model CSS
 * @author Wayne
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2023-01-31 10:44:53
 */

import { isUndefined } from 'utils';

/**
 * @function getPrefix
 * @return {String} css前缀，'webkit'/'o'/''
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
 * @description **getStyle(el, property)** get DOM style
 * @param {DOM Object} el element
 * @param {String} property css property
 * @return {Number | Undefined}
 */
export function getStyle(el: any, property: string) {
  const value = el.currentStyle
    ? el.currentStyle[property]
    : document.defaultView!.getComputedStyle(el, null).getPropertyValue(property);
  const matches = value && value.match(/^(\d+)(\.\d+)?px$/);
  return matches ? +matches[1] : undefined;
}
