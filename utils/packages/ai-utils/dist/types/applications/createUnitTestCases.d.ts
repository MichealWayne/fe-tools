/**
 * @function genUnitTestCasesPrompt
 * @description 生成用于创建单元测试的Prompt
 * @param {string} codeStr 代码字符串
 * @param {number} maxLen token最大长度, 默认30000
 * @returns {string} 符合要求的Prompt文本，如果超过长度限制则返回空字符串
 */
export declare const genUnitTestCasesPrompt: (input: string) => string;
