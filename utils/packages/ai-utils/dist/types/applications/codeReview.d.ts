/**
 * @function genCodeReviewPrompt
 * @description 生成用于代码审查的Prompt
 * @param {string} codeStr 代码字符串
 * @param {number} maxLen token最大长度, 默认30000
 * @returns {string} 符合要求的Prompt文本，如果超过长度限制则返回空字符串
 */
export declare const genCodeReviewPrompt: (input: string) => string;
