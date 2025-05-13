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
 * @description 跳转到指定 URL，支持新标签页、替换等
 * @param {string} url 跳转地址
 * @param {NavigateOptions} [options] 跳转选项
 * @example
 * navigateTo('https://example.com', { newTab: true });
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
 * @description 强制跳转到https, http -> https
 * @param {string?} url 跳转地址
 */
export function httpsRedirect(url: string = location.href) {
  if (!url.startsWith('https://')) {
    const newUrl = new URL(url);
    newUrl.protocol = 'https';
    location.replace(newUrl.toString());
  }
}
