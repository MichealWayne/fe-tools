/**
 * @author Wayne
 * @Date 2024-05-11 10:40:18
 * @LastEditTime 2025-08-10 15:02:12
 */
import { createPromptGenerator } from '../utils/prompt/generator';
import { applyTemplate } from '../utils/prompt/applyTemplate';
import { STANDARD_PROMPT_TEMPLATE } from '../templates';

const MAX_TOKEN_LEN = 30000; // GPT-4o 32k

/**
 * @function getCreateUnitTestCasesTxt
 * @description 获取单元测试的prompt (内部使用)
 * @param {string} codeToTest
 * @returns {string}
 */
function getCreateUnitTestCasesTxt(codeToTest: string): string {
  return applyTemplate(STANDARD_PROMPT_TEMPLATE, {
    role: 'Expert Software Tester proficient in JavaScript/TypeScript and the Jest testing framework',
    task_description:
      'Generate a comprehensive set of unit test cases for the provided code snippet. The tests should cover main functionality, edge cases, and potential error conditions.',
    format_instructions:
      'Provide only the Jest test code in TypeScript. Do not include any explanations or markdown code block wrappers in your final response.',
    input_content: codeToTest,
    additional_instructions:
      '- The test environment is Node.js.\n' +
      '- Focus on testing the `prepareChatMessages`, `getFirstAnswerMsg`, `setChatMessages`, and `setModel` methods if they exist in the input.\n' +
      '- Ensure tests are clear, concise, and follow Jest best practices.\n' +
      '- Analyze the code carefully before generating tests.',
  });
}

/**
 * @function genUnitTestCasesPrompt
 * @description 生成用于创建单元测试的Prompt
 * @param {string} codeStr 代码字符串
 * @param {number} maxLen token最大长度, 默认30000
 * @returns {string} 符合要求的Prompt文本，如果超过长度限制则返回空字符串
 */
export const genUnitTestCasesPrompt = createPromptGenerator(
  { maxTokenLength: MAX_TOKEN_LEN },
  getCreateUnitTestCasesTxt
);
