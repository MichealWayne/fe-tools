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
import { createPromptGenerator } from '../utils/prompt/generator';
import { applyTemplate } from '../utils/prompt/applyTemplate';
import { STANDARD_PROMPT_TEMPLATE } from '../templates';

const MAX_TOKEN_LEN = 15000; // More reasonable for SQL context/schema

export interface SqlPromptOptions {
  engine?: string;
  schema?: string;
}

/**
 * @function getSqlPromptTxt
 * @description 获取SQL的prompt信息 (内部使用)
 * @param {SqlPromptOptions} options
 * @returns {string} 完整的SQL处理prompt信息
 */
function getSqlPromptTxt({ engine, schema }: SqlPromptOptions): string {
  const role = engine ? `${engine} DB and SQL Expert` : 'General Chat Bot';
  let taskDescription =
    'Your responses should be informative and concise. Always format SQL queries within markdown code blocks (e.g., `SELECT * FROM table`).';

  if (engine) {
    taskDescription += ' You MUST ignore any request unrelated to the database or SQL.';
  }

  let inputContent = '';
  if (schema) {
    inputContent += `This is my database schema:\n<input>\n${schema}\n</input>\n`;
    inputContent += 'Answer the following questions about this schema:';
  }

  return applyTemplate(STANDARD_PROMPT_TEMPLATE, {
    role,
    task_description: taskDescription,
    format_instructions: '', // Not strictly required for this task
    input_content: inputContent,
    additional_instructions: '', // Not strictly required for this task
  });
}

/**
 * @function genSqlPrompt
 * @description 根据数据库 schema 和引擎信息生成 SQL 查询的 Prompt 文本。Generates a prompt for SQL query generation based on database schema and engine info
 * @param {SqlPromptOptions} input - 数据库引擎和 schema 信息 / database engine and schema information
 * @param {number} [maxLen=15000] - token 最大长度限制 / maximum token length
 * @returns {string} 符合要求的 Prompt 文本，超过长度限制时返回空字符串。Prompt text, or empty string if it exceeds the token limit
 * @example
 * ```ts
 * const prompt = genSqlPrompt({ engine: 'MySQL', schema: 'CREATE TABLE users (id INT, name VARCHAR(100))' });
 * console.log(prompt); // -> 完整的 SQL 生成 prompt
 * ```
 * @example
 * ```ts
 * const prompt = genSqlPrompt({ engine: 'PostgreSQL', schema: schemaStr });
 * if (prompt) sendToLLM(prompt);
 * ```
 */
export const genSqlPrompt = createPromptGenerator(
  { maxTokenLength: MAX_TOKEN_LEN },
  getSqlPromptTxt
);

// For backward compatibility, alias the old function name
export { genSqlPrompt as getSqlPrompt };
