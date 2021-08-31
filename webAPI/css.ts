/**
 * @model CSS
 */

/**
 * @function getPrefix
 * @return {string} css前缀
 * @return {string}
 */
export function getPrefix() {
  const vendors = {
    Webkit: 'webkit',
    Moz: '',
    O: 'o',
  };

  const testEl = document.createElement('div');
  if (testEl.style.transform === undefined) {
    for (const i in vendors) {
      if (testEl.style[i + 'TransitionProperty'] !== undefined) {
        return vendors[i];
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
export function getStyle(el, property) {
  const value = el.currentStyle
    ? el.currentStyle[property]
    : document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
  const matches = value && value.match(/^(\d+)(\.\d+)?px$/);
  return matches ? +matches[1] : undefined;
}
