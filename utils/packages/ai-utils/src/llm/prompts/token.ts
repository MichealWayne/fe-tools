/**
 * @fileoverview Token estimation utilities for AI language model prompt optimization and length management.
 *
 * This module provides heuristic-based token estimation for various AI language models.
 * It includes functions for approximating token counts, which is useful for prompt optimization
 * and ensuring prompts stay within model token limits. For precise calculations, consider using tiktoken.
 *
 * @module Token
 * @author Wayne
 * @since 1.0.0
 * @see {@link https://www.npmjs.com/package/tiktoken} - For precise token counting
 */

/**
 * @function estimateTokenLength
 * @description 估算字符串中的token数量。A simple heuristic to estimate the number of tokens in a string using character-based approximation for various language models.
 * @param {string} input - 需要估算token数量的字符串。The string to estimate token length for (supports multilingual text)
 * @returns {number} 估算的token数量。The estimated number of tokens (rough approximation)
 * @example
 * // Estimate tokens for English text
 * const englishTokens = estimateTokenLength('Hello, how are you today?');
 * console.log(englishTokens); // Approximately 6-8 tokens
 *
 * @example
 * // Estimate tokens for Chinese text
 * const chineseTokens = estimateTokenLength('你好，今天怎么样？');
 * console.log(chineseTokens); // Approximately 8-10 tokens
 *
 * @example
 * // Estimate tokens for code
 * const codeTokens = estimateTokenLength('function hello() { return "world"; }');
 * console.log(codeTokens); // Approximately 8-12 tokens
 *
 * @example
 * // Check if prompt fits within model limits
 * const prompt = 'Generate a summary of this article...';
 * const tokens = estimateTokenLength(prompt);
 * const maxTokens = 4096;
 * if (tokens > maxTokens * 0.8) {
 *   console.warn('Prompt may be too long for model');
 * }
 *
 * @see {@link https://www.npmjs.com/package/tiktoken} - For precise OpenAI token counting
 */
export function estimateTokenLength(input: string): number {
  if (typeof input !== 'string') {
    console.warn('estimateTokenLength: Input is not a string. Returning 0.');
    return 0;
  }

  let tokenLength = 0;

  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i);

    if (charCode < 128) {
      // ASCII character
      if (charCode <= 122 && charCode >= 65) {
        // a-Z
        tokenLength += 0.25;
      } else {
        tokenLength += 0.5;
      }
    } else {
      // Unicode character
      tokenLength += 1.5;
    }
  }

  return tokenLength;
}
