/**
 * @model CSS
 */


/**
 * @function getPrefix
 * @return {string} css前缀
 * @return {string}
 */
export function getPrefix () {
    const vendors = {
        Webkit: 'webkit',
        Moz: '',
        O: 'o'
    };

    let testEl = document.createElement('div');
    if (testEl.style.transform === undefined) {
        for (let i in vendors) {
            if (testEl.style[i + 'TransitionProperty'] !== undefined) {
                return vendors[i];
            }
        }
    } else return ''
}

/**
 * @function getStyle
 * @description **getStyle(el, property)** get DOM style
 * @param {DOM Object} el element
 * @param {String} property css property
 * @return {Number | Undefined}
 */
export function getStyle(el, property) {
    let value = el.currentStyle ?
        el.currentStyle[property] :
        document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
    let matches = value && value.match(/^(\d+)(\.\d+)?px$/);
    return matches ? +matches[1] : undefined;
}