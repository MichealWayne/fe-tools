/*
* css处理
* @author: Micheal Wang
* @build time: 2017.12.13
*/


/*
* 获得css前缀
* @return {String} css前缀
*/
export function getPrefix () {
    var vendors = {
        Webkit: 'webkit',
        Moz: '',
        O: 'o'
    };

    var testEl = document.createElement('div');
    if (testEl.style.transform === undefined) {
        for (var i in vendors) {
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