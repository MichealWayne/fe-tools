/**
 * @fileoverview AI-powered code review utilities providing automated code analysis, bug detection, and improvement suggestions.
 *
 * This module provides comprehensive code review capabilities using AI language models.
 * It includes functions for analyzing code patches, identifying potential issues, and generating
 * structured feedback with scoring and detailed recommendations for code improvements.
 *
 * @module CodeReview
 * @author Wayne
 * @since 1.0.0
 */
import { createPromptGenerator } from '../utils/prompt/generator';
import { applyTemplate } from '../utils/prompt/applyTemplate';
import { STANDARD_PROMPT_TEMPLATE } from '../templates';

const MAX_TOKEN_LEN = 30000; // GPT-4o 32k

/**
 * @function getCodeReviewPromptTxt
 * @description 获取代码审查的prompt文本（内部使用）。Generates a structured prompt for AI-powered code review analysis with specific formatting requirements and evaluation criteria.
 * @param {string} patch - 代码补丁内容。Code patch content to be reviewed (diff format or complete code)
 * @returns {string} 格式化的代码审查prompt。Formatted prompt string for AI code review analysis
 * @example
 * // Generate prompt for code patch review
 * const patch = `
 * + function calculateTotal(items) {
 * +   let total = 0;
 * +   for (let i = 0; i < items.length; i++) {
 * +     total += items[i].price;
 * +   }
 * +   return total;
 * + }
 * `;
 * const prompt = getCodeReviewPromptTxt(patch);
 * console.log(prompt); // Returns structured prompt for AI analysis
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
