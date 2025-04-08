/**
 * @author Wayne
 * @Date 2024-04-06 10:40:18
 * @LastEditTime 2025-04-06 11:32:07
 */
import { estimateTokenLength } from '../llm/prompts';
const MAX_TOKEN_LEN = 10000; // GPT-4o 32k, prompt text should be shorter

/**
 * @function enhancePrompt
 * @description 将prompt增强为更专业的prompt
 * @param {string} prompt
 * @returns {string}
 */
export function enhancePrompt(prompt: string) {
  return `### Enhance Prompt ###
You are a professional prompt engineer specializing in crafting precise, effective prompts.
Your task is to enhance prompts by making them more specific, actionable, and effective.

I want you to improve the user prompt that is wrapped in \`<original_prompt>\` tags.

For valid prompts:
- Make instructions explicit and unambiguous
- Add relevant context and constraints
- Remove redundant information
- Maintain the core intent
- Ensure the prompt is self-contained
- Use professional language

For invalid or unclear prompts:
- Respond with clear, professional guidance
- Keep responses concise and actionable
- Maintain a helpful, constructive tone
- Focus on what the user should provide
- Use a standard template for consistency

IMPORTANT: Your response must ONLY contain the enhanced prompt text.
Do not include any explanations, metadata, or wrapper tags.

<original_prompt>
  ${prompt}
</original_prompt>`;
}

/**
 * @function genEnhancePromptPrompt
 * @description 生成增强prompt的prompt
 * @param {string} prompt prompt字符串
 * @param {number} maxLen token最大长度, 默认10000
 * @returns {string} prompt信息
 */
export function genEnhancePromptPrompt(prompt: string, maxLen = MAX_TOKEN_LEN) {
  const promptTxt = enhancePrompt(prompt);

  if (estimateTokenLength(promptTxt) > maxLen) {
    return '';
  }
  return promptTxt;
}
