/**
 * @author Wayne
 * @Date 2024-07-07 13:42:13
 * @LastEditTime 2024-07-08 14:01:30
 */
/**
 * @function readFile
 * @description 读取文件内容
 * @param {File} file
 * @returns {Promise<string>}
 * @example
 * readFile(file).then(content => console.log('file content', content));    // e.g input[type="file"] onchange
 */
export function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      resolve(e.target!.result as string);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

/**
 * @function readFileAsDataURL
 * @description 读取文件内容为Data URL(image、video、audio本地预览等)
 * @param {File} file
 * @returns {Promise<string>}
 * @example
 * readFileAsDataURL(file).then(dataURL => console.log('file dataURL', dataURL));  // e.g input[type="file"] onchange
 */
export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * @function downloadFile
 * @description 保存/下载文件
 * @param {string} content
 * @param {string} filename
 * @param {string} contentType
 * @example
 * downloadFile('file content', 'file.txt', 'text/plain');
 * downloadFile('data:image/png;base64,...', 'image.png', 'image/png');
 */
export function downloadFile(content: string, filename: string, contentType: string) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}

/**
 * @function getFileExtension
 * @description 根据文件名获取文件扩展名
 * @param {string} filename
 * @returns {string}
 * @example
 * getFileExtension('file.txt');    // 'txt'
 * getFileExtension('file');        // ''
 * getFileExtension('.file');       // ''
 * getFileExtension('file.png');    // 'png'
 */
export function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop()!.toLowerCase() : '';
}
