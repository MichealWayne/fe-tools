/**
 * @fileoverview AI-powered prompt enhancement utilities for improving prompt quality and effectiveness.
 *
 * This module provides intelligent prompt enhancement capabilities using AI language models.
 * It includes prompt optimization, clarity improvement, context enrichment, and structure
 * refinement to create more effective and precise AI interactions.
 *
 * @module EnhancePrompt
 * @author Wayne
 * @since 1.0.0
 */
import { createPromptGenerator } from '../utils/prompt/generator';
import { applyTemplate } from '../utils/prompt/applyTemplate';
import { STANDARD_PROMPT_TEMPLATE } from '../templates';

const MAX_TOKEN_LEN = 10000; // GPT-4o 32k, prompt text should be shorter

/**
 * @function enhancePromptTxt
 * @description 将用户prompt增强为更专业的prompt（内部使用）。Enhances user prompts with professional structure, clarity improvements, and context enrichment for better AI interactions.
 * @param {string} userPrompt - 用户原始prompt文本。Original user prompt text that needs enhancement and optimization
 * @returns {string}
 */
function enhancePromptTxt(userPrompt: string): string {
  return applyTemplate(STANDARD_PROMPT_TEMPLATE, {
    role: 'Professional Prompt Engineer',
    task_description:
      "Enhance the user's prompt to make it more specific, actionable, and effective for interacting with an AI model.",
    format_instructions:
      'Respond ONLY with the enhanced prompt text. Do not include any explanations, metadata, or wrapper tags.',
    input_content: userPrompt,
    additional_instructions:
      'For valid prompts:\n' +
      '- Make instructions explicit and unambiguous.\n' +
      '- Add relevant context and constraints.\n' +
      '- Remove redundant information.\n' +
      '- Maintain the core intent.\n' +
      '- Ensure the prompt is self-contained.\n' +
      '- Use professional language.\n\n' +
      'For invalid or unclear prompts:\n' +
      '- Respond with clear, professional guidance.\n' +
      '- Keep responses concise and actionable.\n' +
      '- Maintain a helpful, constructive tone.\n' +
      '- Focus on what the user should provide.\n' +
      '- Use a standard template for consistency.',
  });
}

/**
 * @function genEnhancePrompt
 * @description 根据用户原始 Prompt 生成用于增强该 Prompt 的元 Prompt 文本。Generates a meta-prompt for enhancing the user's original prompt
 * @param {string} input - 用户的原始 prompt 字符串 / user's original prompt string
 * @param {number} [maxLen=10000] - token 最大长度限制 / maximum token length
 * @returns {string} 符合要求的 Prompt 文本，超过长度限制时返回空字符串。Prompt text, or empty string if it exceeds the token limit
 * @example
 * ```ts
 * const prompt = genEnhancePrompt('写一个排序函数');
 * console.log(prompt); // -> 完整的 prompt 增强元 prompt
 * ```
 * @example
 * ```ts
 * const prompt = genEnhancePrompt(userInput);
 * if (prompt) sendToLLM(prompt);
 * ```
 */
export const genEnhancePrompt = createPromptGenerator(
  { maxTokenLength: MAX_TOKEN_LEN },
  enhancePromptTxt
);

// For backward compatibility, alias the old function name
export { genEnhancePrompt as enhancePrompt };
