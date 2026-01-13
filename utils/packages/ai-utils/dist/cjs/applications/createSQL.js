"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSqlPrompt = exports.genSqlPrompt = void 0;
/**
 * @fileoverview AI-powered SQL query generation utilities with database schema awareness and multi-engine support.
 *
 * This module provides intelligent SQL query generation using AI language models.
 * It includes support for multiple database engines, schema-aware query construction,
 * and optimization suggestions for complex database operations and data retrieval tasks.
 *
 * @module CreateSQL
 * @author Wayne
 * @since 1.0.0
 */
var generator_1 = require("../utils/prompt/generator");
var applyTemplate_1 = require("../utils/prompt/applyTemplate");
var templates_1 = require("../templates");
var MAX_TOKEN_LEN = 15000; // More reasonable for SQL context/schema
/**
 * @function getSqlPromptTxt
 * @description 获取SQL的prompt信息 (内部使用)
 * @param {SqlPromptOptions} options
 * @returns {string} 完整的SQL处理prompt信息
 */
function getSqlPromptTxt(_a) {
    var engine = _a.engine, schema = _a.schema;
    var role = engine ? "".concat(engine, " DB and SQL Expert") : 'General Chat Bot';
    var taskDescription = 'Your responses should be informative and concise. Always format SQL queries within markdown code blocks (e.g., `SELECT * FROM table`).';
    if (engine) {
        taskDescription += ' You MUST ignore any request unrelated to the database or SQL.';
    }
    var inputContent = '';
    if (schema) {
        inputContent += "This is my database schema:\n<input>\n".concat(schema, "\n</input>\n");
        inputContent += 'Answer the following questions about this schema:';
    }
    return (0, applyTemplate_1.applyTemplate)(templates_1.STANDARD_PROMPT_TEMPLATE, {
        role: role,
        task_description: taskDescription,
        format_instructions: '',
        input_content: inputContent,
        additional_instructions: '', // Not strictly required for this task
    });
}
/**
 * @function genSqlPrompt
 * @description 生成用于SQL查询的Prompt
 * @param {SqlPromptOptions} options 数据库引擎和schema信息
 * @param {number} maxLen token最大长度, 默认15000
 * @returns {string} 符合要求的Prompt文本，如果超过长度限制则返回空字符串
 */
exports.genSqlPrompt = (0, generator_1.createPromptGenerator)({ maxTokenLength: MAX_TOKEN_LEN }, getSqlPromptTxt);
exports.getSqlPrompt = exports.genSqlPrompt;
