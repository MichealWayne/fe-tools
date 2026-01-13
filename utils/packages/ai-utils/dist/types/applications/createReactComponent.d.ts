/**
 * @function genCreateReactComponentPrompt
 * @description 生成用于创建React组件的Prompt
 * @param {string} description 用户对组件的描述
 * @param {number} maxLen token最大长度, 默认20000
 * @returns {string} 符合要求的Prompt文本，如果超过长度限制则返回空字符串
 */
export declare const genCreateReactComponentPrompt: (input: string) => string;
export { genCreateReactComponentPrompt as getCreateReactComponentPrompt };
