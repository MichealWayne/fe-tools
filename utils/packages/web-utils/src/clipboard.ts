/**
 * @author Wayne
 * @Date 2024-10-13 13:39:56
 * @LastEditTime 2025-01-12 11:29:31
 */

/**
 * @function readClipboardText
 * @description 使用现代剪贴板API从系统剪贴板读取文本内容。Reads text content from the system clipboard using the modern Clipboard API
 * @returns {Promise<string>} 解析为剪贴板文本内容的Promise。Promise that resolves to the clipboard text content
 * @throws {Error} 如果剪贴板访问被拒绝或不受支持则抛出错误。Throws if clipboard access is denied or not supported
 * @example
 * // Basic clipboard reading
 * readClipboardText()
 *   .then(text => {
 *     console.log('Clipboard content:', text);
 *     document.getElementById('paste-area').textContent = text;
 *   })
 *   .catch(error => {
 *     console.error('Failed to read clipboard:', error);
 *   });
 *
 * @example
 * // Async/await usage with error handling
 * async function handlePaste() {
 *   try {
 *     const clipboardText = await readClipboardText();
 *     if (clipboardText.trim()) {
 *       processClipboardContent(clipboardText);
 *     }
 *   } catch (error) {
 *     // Handle permission denied or unsupported browser
 *     showFallbackPasteOption();
 *   }
 * }
 *
 * @example
 * // Check permissions before reading
 * async function safeReadClipboard() {
 *   try {
 *     const permission = await navigator.permissions.query({ name: 'clipboard-read' });
 *     if (permission.state === 'granted') {
 *       const text = await readClipboardText();
 *       return text;
 *     } else {
 *       throw new Error('Clipboard read permission not granted');
 *     }
 *   } catch (error) {
 *     console.warn('Clipboard access failed:', error);
 *     return null;
 *   }
 * }
 *
 * @since 1.0.0
 * @see {@link copyToClipboard} - Copy text to clipboard
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/readText} - Browser support: Chrome 66+, Firefox 125+, Safari 13.1+
 * @see {@link https://caniuse.com/async-clipboard} - Clipboard API browser compatibility
 * @see {@link https://w3c.github.io/clipboard-apis/#security-considerations} - Security considerations for clipboard access
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
 * @description 将文本复制到系统剪贴板，为旧版浏览器提供回退方案。Copies text to the system clipboard with fallback for older browsers
 * @param {string} text - 要复制到剪贴板的文本内容。The text content to copy to clipboard
 * @returns {Promise<boolean>} 如果复制成功则解析为true，否则为false的Promise。Promise that resolves to true if copy succeeded, false otherwise
 * @example
 * // Basic text copying
 * copyToClipboard('Hello, World!')
 *   .then(success => {
 *     if (success) {
 *       showNotification('Text copied to clipboard!');
 *     } else {
 *       showNotification('Failed to copy text');
 *     }
 *   });
 *
 * @example
 * // Copy button implementation
 * const copyButton = document.getElementById('copy-btn');
 * copyButton.addEventListener('click', async () => {
 *   const textToCopy = document.getElementById('content').textContent;
 *   const success = await copyToClipboard(textToCopy);
 *
 *   // Update button state for accessibility
 *   copyButton.textContent = success ? 'Copied!' : 'Copy Failed';
 *   copyButton.setAttribute('aria-label',
 *     success ? 'Text copied to clipboard' : 'Failed to copy text'
 *   );
 *
 *   // Reset button after delay
 *   setTimeout(() => {
 *     copyButton.textContent = 'Copy';
 *     copyButton.setAttribute('aria-label', 'Copy text to clipboard');
 *   }, 2000);
 * });
 *
 * @example
 * // Copy with user feedback and error handling
 * async function copyWithFeedback(text) {
 *   try {
 *     const success = await copyToClipboard(text);
 *     if (success) {
 *       // Announce to screen readers
 *       const announcement = document.createElement('div');
 *       announcement.setAttribute('aria-live', 'polite');
 *       announcement.textContent = 'Content copied to clipboard';
 *       document.body.appendChild(announcement);
 *       setTimeout(() => document.body.removeChild(announcement), 1000);
 *     }
 *     return success;
 *   } catch (error) {
 *     console.error('Copy operation failed:', error);
 *     return false;
 *   }
 * }
 *
 * @since 1.0.0
 * @see {@link readClipboardText} - Read text from clipboard
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText} - Modern Clipboard API
 * @see {@link https://caniuse.com/async-clipboard} - Browser support: Chrome 66+, Firefox 125+, Safari 13.1+
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand} - Legacy execCommand (deprecated)
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html} - WCAG: Providing feedback for user actions
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
