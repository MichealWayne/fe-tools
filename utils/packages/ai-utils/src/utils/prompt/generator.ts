/**
 * @module aiUtils
 * @author Wayne
 * @Date 2025-08-10
 * @LastEditTime 2025-08-10 15:02:14
 */

import { estimateTokenLength } from '../../llm/prompts/token';
import { PromptConfig } from './types';

// Default maximum token length if not specified in config
const DEFAULT_MAX_TOKEN_LENGTH = 32000; // Suitable for models like GPT-4o mini

/**
 * Creates a reusable prompt generator function.
 *
 * This higher-order function encapsulates common logic like token length checking,
 * allowing specific prompt content generation to be handled by the provided `contentGenerator`.
 *
 * @template T The type of the input parameter for the content generator function.
 * @param {PromptConfig} config Configuration for the prompt generator, including maximum token length.
 * @param {(input: T) => string} contentGenerator A function that takes the input and returns the core prompt content.
 * @returns {(input: T) => string} A function that generates the full prompt string based on the input, or an empty string if it exceeds the token limit.
 *
 * @example
 * const myPromptGenerator = createPromptGenerator(
 *   { maxTokenLength: 10000 },
 *   (userQuery: string) => `Answer the following question: ${userQuery}`
 * );
 * const prompt = myPromptGenerator("What is the weather today?");
 * if (prompt) {
 *   // Use the prompt with an LLM API
 * } else {
 *   console.error("Prompt was too long");
 * }
 */
export function createPromptGenerator<T>(
  config: PromptConfig,
  contentGenerator: (input: T) => string
): (input: T) => string {
  const maxLen = config.maxTokenLength ?? DEFAULT_MAX_TOKEN_LENGTH;

  return (input: T): string => {
    const promptText = contentGenerator(input);

    // Basic validation
    if (typeof promptText !== 'string') {
      console.error('Content generator must return a string.');
      return '';
    }

    const tokenLength = estimateTokenLength(promptText);
    if (tokenLength > maxLen) {
      console.warn(
        `Generated prompt exceeds maximum token length. Length: ${tokenLength}, Max: ${maxLen}`
      );
      return '';
    }

    return promptText;
  };
}
