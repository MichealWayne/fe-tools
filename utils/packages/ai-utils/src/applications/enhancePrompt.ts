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
 * @description 生成用于增强Prompt的Prompt
 * @param {string} prompt 用户的原始prompt字符串
 * @param {number} maxLen token最大长度, 默认10000
 * @returns {string} 符合要求的Prompt文本，如果超过长度限制则返回空字符串
 */
export const genEnhancePrompt = createPromptGenerator(
  { maxTokenLength: MAX_TOKEN_LEN },
  enhancePromptTxt
);

// For backward compatibility, alias the old function name
export { genEnhancePrompt as enhancePrompt };
