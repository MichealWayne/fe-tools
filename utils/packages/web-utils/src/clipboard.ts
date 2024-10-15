/**
 * @author Wayne
 * @Date 2024-10-13 13:39:56
 * @LastEditTime 2024-10-13 13:40:36
 */

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
    document.execCommand('copy');
    copyInput.remove();
    resolve(true);
  });
}
