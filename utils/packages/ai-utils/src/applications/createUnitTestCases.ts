/**
 * @fileoverview AI-powered unit test generation utilities with comprehensive test case coverage and framework support.
 *
 * This module provides intelligent unit test generation using AI language models.
 * It includes support for multiple testing frameworks, comprehensive test case coverage,
 * edge case detection, and best practices for creating maintainable and effective unit tests.
 *
 * @module CreateUnitTestCases
 * @author Wayne
 * @since 1.0.0
 */
import { createPromptGenerator } from '../utils/prompt/generator';
import { applyTemplate } from '../utils/prompt/applyTemplate';
import { STANDARD_PROMPT_TEMPLATE } from '../templates';

const MAX_TOKEN_LEN = 30000; // GPT-4o 32k

/**
 * @function getCreateUnitTestCasesTxt
 * @description 获取单元测试生成的prompt文本（内部使用）。Generates a structured prompt for AI-powered unit test creation with comprehensive test case coverage and framework-specific patterns.
 * @param {string} codeToTest - 需要测试的代码。Source code that needs unit test coverage (functions, classes, or modules)
 * @returns {string}
 */
function getCreateUnitTestCasesTxt(codeToTest: string): string {
  return applyTemplate(STANDARD_PROMPT_TEMPLATE, {
    role:
      'Expert JavaScript and TypeScript test engineer specializing in Jest and maintainable unit tests',
    task_description:
      'Generate Jest unit tests for the provided code snippet. Cover the primary behavior, boundary cases, failure paths, and observable side effects exposed by the input code.',
    format_instructions:
      'Return only executable Jest test code in TypeScript. Do not include explanations, markdown code fences, or placeholder comments.',
    input_content: codeToTest,
    additional_instructions:
      '- Infer test targets strictly from the provided input; do not assume project-specific APIs that are not present.\n' +
      '- Prefer deterministic tests and mock external dependencies only when required by the code.\n' +
      '- Use describe/it blocks with clear names and assertions that validate externally visible behavior.\n' +
      '- If the code exposes exceptional branches, include error-path coverage.\n' +
      '- Keep the output ready to paste into a Jest test file with minimal manual cleanup.',
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
