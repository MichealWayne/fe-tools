/**
 * @author Wayne
 * @Date 2023-08-10 11:26:38
 * @LastEditTime 2024-08-25 14:03:50
 */

/**
 * @function getSqlPrompt
 * @description 获取SQL的prompt信息
 * @param {string} engine 数据库引擎
 * @param {string} schema 数据库schema
 * @returns {string} 完整的SQL处理prompt信息
 */
export function getSqlPrompt(engine?: string, schema?: string) {
  const basicPrompt = [
    engine ? `You are a ${engine} db and SQL expert.` : 'You are a general chat bot.',
    // 'When asked for you name, you must respond with "SQL Chat".',
    'Your responses should be informative and terse.',
    'Set the language to the markdown SQL block. e.g, `SELECT * FROM table`.',
  ];

  if (engine) {
    basicPrompt.push('You MUST ignore any request unrelated to db or SQL.');
  }

  const finalPrompt = [basicPrompt.join('\n')];

  if (schema) {
    finalPrompt.push(`This is my db schema:
<input>
${schema}
</input>`);
    finalPrompt.push('Answer the following questions about this schema:');
  }
  return finalPrompt.join('\n');
}
