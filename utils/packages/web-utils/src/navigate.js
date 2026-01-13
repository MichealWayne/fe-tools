/**
 * @module jump
 * @author Wayne
 * @Date 2025-05-11 10:53:56
 * @LastEditTime 2025-05-11 19:10:33
 */
/**
 * @function navigateTo
 * @description 跳转到指定URL，支持新标签页、替换等选项。Navigates to a specified URL with support for new tabs, replacement, and other options
 * @param {string} url - 跳转地址。The URL to navigate to
 * @param {NavigateOptions} [options] - 跳转选项。Navigation options
 * @example
 * navigateTo('https://example.com', { newTab: true });
 */
export function navigateTo(url, options) {
    if (options === void 0) { options = {}; }
    var _a = options.replace, replace = _a === void 0 ? false : _a, _b = options.newTab, newTab = _b === void 0 ? false : _b, _c = options.target, target = _c === void 0 ? '_blank' : _c;
    // 新窗口打开
    if (newTab) {
        window.open(url, target);
        return;
    }
    // 当前窗口打开，替换当前地址（无history）
    if (replace) {
        window.location.replace(url);
        return;
    }
    // 当前窗口打开
    window.location.assign(url);
}
/**
 * @function httpsRedirect
 * @description 强制跳转到HTTPS协议，将HTTP转换为HTTPS。Forces redirect to HTTPS protocol, converting HTTP to HTTPS
 * @param {string} [url] - 跳转地址（可选，默认为当前页面地址）。The URL to redirect (optional, defaults to current page URL)
 */
export function httpsRedirect(url) {
    if (url === void 0) { url = location.href; }
    if (!url.startsWith('https://')) {
        var newUrl = new URL(url);
        newUrl.protocol = 'https';
        location.replace(newUrl.toString());
    }
}
