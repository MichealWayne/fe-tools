/**
 * @module promptApplications
 * @author Wayne
 * @Date 2023-07-22 11:34:04
 * @LastEditTime 2025-08-10 15:02:10
 */
import { createPromptGenerator } from '../utils/prompt/generator';
import { applyTemplate } from '../utils/prompt/applyTemplate';
import { STANDARD_PROMPT_TEMPLATE } from '../templates';

const MAX_TOKEN_LEN = 30000; // GPT-4o 32k

/**
 * @function getCodeReviewPromptTxt
 * @description 获取检测的prompt (内部使用)
 * @param {string} patch
 * @return {string}
 */
function getCodeReviewPromptTxt(patch: string) {
  return applyTemplate(STANDARD_PROMPT_TEMPLATE, {
    role: 'Frontend Expert and Code Reviewer',
    task_description:
      'Perform a concise code review on the provided patch. Identify bug risks, improvement suggestions, and provide analysis in Chinese.',
    format_instructions:
      'Respond with TypeScript/JavaScript code if issues are found. Ensure the result uses the following JSON format:\n' +
      '```json\n' +
      '{\n' +
      '  "score": ..,\n' +
      '  "details": [\n' +
      '    {\n' +
      '      "line": ..,\n' +
      '      "column": ..,\n' +
      '      "suggestion": ..\n' +
      '    }\n' +
      '    ...\n' +
      '  ]\n' +
      '}\n' +
      '```\n' +
      'Your suggestions should be brief and clear.',
    input_content: patch,
    additional_instructions:
      'Analyze the code patch step-by-step. Focus on correctness, efficiency, and best practices.',
  });
}

/**
 * @function genCodeReviewPrompt
 * @description 生成用于代码审查的Prompt
 * @param {string} codeStr 代码字符串
 * @param {number} maxLen token最大长度, 默认30000
 * @returns {string} 符合要求的Prompt文本，如果超过长度限制则返回空字符串
 */
export const genCodeReviewPrompt = createPromptGenerator(
  { maxTokenLength: MAX_TOKEN_LEN },
  getCodeReviewPromptTxt
);
