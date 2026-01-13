interface SqlPromptOptions {
    engine?: string;
    schema?: string;
}
/**
 * @function genSqlPrompt
 * @description 生成用于SQL查询的Prompt
 * @param {SqlPromptOptions} options 数据库引擎和schema信息
 * @param {number} maxLen token最大长度, 默认15000
 * @returns {string} 符合要求的Prompt文本，如果超过长度限制则返回空字符串
 */
export declare const genSqlPrompt: (input: SqlPromptOptions) => string;
export { genSqlPrompt as getSqlPrompt };
