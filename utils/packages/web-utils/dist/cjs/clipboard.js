"use strict";
/**
 * @author Wayne
 * @Date 2024-10-13 13:39:56
 * @LastEditTime 2025-01-12 11:29:31
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyToClipboard = exports.readClipboardText = void 0;
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
function readClipboardText() {
    if (!navigator.clipboard || !navigator.clipboard.readText) {
        return Promise.reject(new Error('Clipboard API is not available'));
    }
    return navigator.clipboard.readText().catch(function (error) {
        console.error('Failed to read clipboard contents(getClipboardText): ', error);
        throw error;
    });
}
exports.readClipboardText = readClipboardText;
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
function copyToClipboard(text) {
    return __awaiter(this, void 0, void 0, function () {
        var copyInput, succeeded, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (document.execCommand) {
                        try {
                            copyInput = document.createElement('input');
                            copyInput.value = text;
                            document.body.appendChild(copyInput);
                            copyInput.select();
                            succeeded = document.execCommand('copy');
                            copyInput.remove();
                            if (succeeded) {
                                return [2 /*return*/, true];
                            }
                        }
                        catch (error) {
                            // ignore and fallback to clipboard API
                        }
                    }
                    if (!navigator.clipboard || !navigator.clipboard.writeText) {
                        return [2 /*return*/, false];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, navigator.clipboard.writeText(text)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.copyToClipboard = copyToClipboard;
