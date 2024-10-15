/**
 * @author Wayne
 * @Date 2024-07-07 13:42:13
 * @LastEditTime 2024-10-13 13:31:20
 */
/**
 * @function readFile
 * @description 读取文件内容，返回字符串
 * @param {File} file 文件对象
 * @returns {Promise<string>} 文件内容
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
 * @param {File} file 文件对象
 * @returns {Promise<string>} 文件内容
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
 * @param {string} content 文件内容
 * @param {string} filename 文件名
 * @param {string} contentType 文件类型
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
 * @function downloadImageFileByUrl
 * @description 根据URL下载图片文件
 * @param {string} url 图片URL
 * @param {string} filename 文件名
 * @param {string} imageType 图片类型
 * @returns {Promise<boolean>} 是否下载成功
 * @example
 * downloadImageFileByUrl('https://example.com/image.jpg', 'image.jpg');
 * downloadImageFileByUrl('https://example.com/image.png', 'image.png', 'image/png');
 */
export function downloadImageFileByUrl(url: string, filename: string, imageType = 'image/jpeg') {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const img = document.createElement('img');
    img.setAttribute('crossOrigin', 'Anonymous');
    img.src = url;
    img.onload = _ => {
      canvas.width = img.width;
      canvas.height = img.height;

      const context = canvas.getContext('2d')!;
      context.drawImage(img, 0, 0, img.width, img.height);

      canvas.toBlob(blob => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob!);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
        resolve(true);
      }, imageType);
    };
    img.onerror = e => reject(e);
  });
}

/**
 * @function getFileExtension
 * @description 根据文件名获取文件扩展名
 * @param {string} filename 文件名
 * @returns {string} 文件扩展名
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
