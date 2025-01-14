/**
 * @author Wayne
 * @Date 2024-10-13 13:39:56
 * @LastEditTime 2025-01-12 11:29:31
 */

/**
 * @function readClipboardText
 * @description 读取剪贴板文案
 * @returns {Promise<string>} 剪贴板文案
 */
export function readClipboardText() {
  return new Promise<string>((resolve, reject) => {
    try {
      navigator.clipboard
        .readText()
        .then(resolve)
        .catch(e => {
          console.error('Failed to read clipboard contents(getClipboardText): ', e);
          reject(e);
        });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * @function copyToClipboard
 * @description 拷贝文案到剪贴板
 * @param {string} text 文案
 * @return {Promise<boolean>} 是否拷贝成功
 */
export function copyToClipboard(text: string) {
  return new Promise(resolve => {
    // 创建一个input框获取需要复制的文本内容
    const copyInput = document.createElement('input');
    copyInput.value = text;
    document.body.appendChild(copyInput);
    copyInput.select();

    // 执行复制，document.execCommand是不推荐的API，但兼容IE
    document.execCommand('copy');
    copyInput.remove();
    resolve(true);
  }).catch(() => {
    // 如果复制失败，尝试使用navigator.clipboard
    navigator.clipboard
      .writeText(text)
      .then(() => true)
      .catch(() => false);
  });
}
