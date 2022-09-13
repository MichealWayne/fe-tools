/**
 * @author Wayne
 * @Date 2022-08-31 16:05:14
 * @LastEditTime 2022-08-31 19:01:05
 */

/**
 * @func getClientHeight
 * @returns {number}
 * @desc 📝 获取可视窗口的高度
 * @example getClientHeight();
 */
export const getClientHeight = (): number => {
  let clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight =
      document.body.clientHeight < document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  } else {
    clientHeight =
      document.body.clientHeight > document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  }
  return clientHeight;
};

/**
 * @func getClientWidth
 * @returns {number}
 * @desc 📝 获取可视窗口的高度
 * @example const clientW = getClientWidth();
 */
export const getClientWidth = (): number =>
  (document.compatMode === 'BackCompat' ? document.body : document.documentElement).clientWidth;
