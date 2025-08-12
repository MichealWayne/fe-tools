/**
 * @author Wayne
 * @Date 2023-08-10 11:26:38
 * @LastEditTime 2025-08-10 15:02:11
 */
import { createPromptGenerator } from '../utils/prompt/generator';
import { applyTemplate } from '../utils/prompt/applyTemplate';
import { STANDARD_PROMPT_TEMPLATE } from '../templates';

const MAX_TOKEN_LEN = 15000; // More reasonable for SQL context/schema

interface SqlPromptOptions {
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
 * @description 生成用于SQL查询的Prompt
 * @param {SqlPromptOptions} options 数据库引擎和schema信息
 * @param {number} maxLen token最大长度, 默认15000
 * @returns {string} 符合要求的Prompt文本，如果超过长度限制则返回空字符串
 */
export const genSqlPrompt = createPromptGenerator(
  { maxTokenLength: MAX_TOKEN_LEN },
  getSqlPromptTxt
);

// For backward compatibility, alias the old function name
export { genSqlPrompt as getSqlPrompt };
