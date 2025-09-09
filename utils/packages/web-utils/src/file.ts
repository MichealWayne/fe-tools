/**
 * @author Wayne
 * @Date 2024-07-07 13:42:13
 * @LastEditTime 2024-10-13 13:31:20
 */
/**
 * @function readFile
 * @description 使用FileReader API将文件内容读取为文本。Reads a file's content as text using the FileReader API
 * @param {File} file - 要读取的File对象（来自input[type="file"]或拖放）。The File object to read (from input[type="file"] or drag-and-drop)
 * @returns {Promise<string>} 解析为文件文本内容的Promise。Promise that resolves to the file's text content
 * @throws {Error} 如果文件读取失败或文件损坏则抛出错误。Throws if file reading fails or file is corrupted
 * @example
 * // Handle file input change
 * const fileInput = document.getElementById('file-input');
 * fileInput.addEventListener('change', async (event) => {
 *   const file = event.target.files[0];
 *   if (file) {
 *     try {
 *       const content = await readFile(file);
 *       document.getElementById('file-content').textContent = content;
 *     } catch (error) {
 *       console.error('Failed to read file:', error);
 *     }
 *   }
 * });
 *
 * @example
 * // Process multiple files with progress indication
 * async function processFiles(files) {
 *   const results = [];
 *   for (let i = 0; i < files.length; i++) {
 *     try {
 *       const content = await readFile(files[i]);
 *       results.push({ name: files[i].name, content });
 *       updateProgress((i + 1) / files.length * 100);
 *     } catch (error) {
 *       console.error(`Failed to read ${files[i].name}:`, error);
 *     }
 *   }
 *   return results;
 * }
 *
 * @example
 * // Validate file content before processing
 * async function validateAndReadFile(file) {
 *   // Check file size (e.g., max 5MB)
 *   if (file.size > 5 * 1024 * 1024) {
 *     throw new Error('File too large. Maximum size is 5MB.');
 *   }
 *
 *   // Check file type
 *   const allowedTypes = ['text/plain', 'text/csv', 'application/json'];
 *   if (!allowedTypes.includes(file.type)) {
 *     throw new Error('Unsupported file type.');
 *   }
 *
 *   return await readFile(file);
 * }
 *
 * @since 1.0.0
 * @see {@link readFileAsDataURL} - Read file as data URL for images/media
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/FileReader} - Browser support: IE 10+, all modern browsers
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html} - WCAG: Error handling and user feedback
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
 * @description 读取文件内容为Data URL（用于image、video、audio本地预览等）。Reads file content as Data URL (for local preview of images, videos, audio, etc.)
 * @param {File} file - 文件对象。The File object
 * @returns {Promise<string>} 文件内容的Promise。Promise that resolves to the file content
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
 * @description 保存/下载文件。Saves/downloads a file
 * @param {string} content - 文件内容。The file content
 * @param {string} filename - 文件名。The filename
 * @param {string} contentType - 文件类型。The file content type
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
 * @description 根据URL下载图片文件。Downloads an image file by URL
 * @param {string} url - 图片URL。The image URL
 * @param {string} filename - 文件名。The filename
 * @param {string} imageType - 图片类型。The image type
 * @returns {Promise<boolean>} 是否下载成功。Whether the download was successful
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
