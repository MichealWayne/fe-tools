/**
 * @module String
 * @description string functions
 */

/**
 * @function byteSize
 * @param {string} str 
 */
export function byteSize (str) {
    return new Blob([str]).size;
}

/**
 * @function capitalize
 * @param {string} param0 
 */
export function capitalize ([first, ...rest]) {
    return first.toUpperCase() + rest.join('');
}

/**
 * @function capitalizeEveryWord
 * @param {string} str 
 */
export function capitalizeEveryWord (str) {
    return str.replace(/\b[a-z]/g, char => char.toUpperCase());
}

/**
 * @function decapitalize
 * @param {string} param0 
 */
export function decapitalize ([first, ...rest]) {
    return first.toLowerCase() + rest.join('');
}

/**
 * @function splitLines
 * @param {string} str 
 */
export function splitLines (str) {
    return str.split(/\r?\n/);
}

/**
 * @function stripHTMLTags
 * @param {string} str 
 */
export function stripHTMLTags (str) {
    return str.replace(/<[^>]*>/g, '');
}

/**
 * @function palindrome
 * @param {string} str 
 */
export function palindrome (str) {
    const s = str.toLowerCase().replace(/[\W_]/g,'');
    return s === s.split('').reverse().join('');
}

/**
 * @function fromCamelCase
 * @param {string} str 
 * @param {string} separator 
 */
export function fromCamelCase (str, separator = '_') {
    str.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2').toLowerCase();
}

/**
 * @function reverseString
 * @param {string} str 
 */
export function reverseString (str) {
    return [...str].reverse().join('');
}

/**
 * @function truncateString
 * @param {string} str 
 * @param {number} num 
 */
export function truncateString (str, num) {
    return str.length > num
            ? str.slice(0, num > 3 ? num - 3 : num) + '...'
            : str;
}