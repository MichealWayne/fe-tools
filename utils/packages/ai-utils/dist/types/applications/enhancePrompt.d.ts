/**
 * @function genEnhancePrompt
 * @description 生成用于增强Prompt的Prompt
 * @param {string} prompt 用户的原始prompt字符串
 * @param {number} maxLen token最大长度, 默认10000
 * @returns {string} 符合要求的Prompt文本，如果超过长度限制则返回空字符串
 */
export declare const genEnhancePrompt: (input: string) => string;
export { genEnhancePrompt as enhancePrompt };
