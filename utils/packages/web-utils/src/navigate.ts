/**
 * @module jump
 * @author Wayne
 * @Date 2025-05-11 10:53:56
 * @LastEditTime 2025-05-11 19:10:33
 */

/**
 * 跳转选项
 */
export interface NavigateOptions {
  /**
   * 是否替换当前历史记录（默认为 false，使用 pushState）
   */
  replace?: boolean;
  /**
   * 是否在新标签页打开
   */
  newTab?: boolean;
  /**
   * 目标窗口名称，仅 newTab=true 时有效
   */
  target?: string;
}

/**
 * @function navigateTo
 * @description 跳转到指定URL，支持新标签页、替换等选项。Navigates to a specified URL with support for new tabs, replacement, and other options
 * @param {string} url - 跳转地址。The URL to navigate to
 * @param {NavigateOptions} [options] - 跳转选项。Navigation options
 * @returns {void}
 * @example
 * ```ts
 * navigateTo('https://example.com', { newTab: true });
 * ```
 * @example
 * ```ts
 * navigateTo('/dashboard', { replace: true }); // 替换当前历史记录 / replace current history entry
 * ```
 */
export function navigateTo(url: string, options: NavigateOptions = {}): void {
  const { replace = false, newTab = false, target = '_blank' } = options;

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
 * @returns {void}
 * @example
 * ```ts
 * // 使用当前页面地址，若为 HTTP 则跳转至 HTTPS
 * httpsRedirect(); // 若当前为 http://example.com 则跳转到 https://example.com
 * ```
 * @example
 * ```ts
 * httpsRedirect('http://example.com/page'); // -> 跳转到 https://example.com/page
 * httpsRedirect('https://example.com'); // 已是 HTTPS，无操作
 * ```
 */
export function httpsRedirect(url: string = location.href) {
  if (!url.startsWith('https://')) {
    const newUrl = new URL(url);
    newUrl.protocol = 'https';
    location.replace(newUrl.toString());
  }
}
