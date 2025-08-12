/**
 * @module tokenUtils
 * @author Wayne
 * @Date 2023-07-14 15:30:41
 * @LastEditTime 2025-08-10 15:02:13
 */

/**
 * @function estimateTokenLength
 * @description A simple heuristic to estimate the number of tokens in a string.
 * Note: This is a rough approximation. For precise token counts, use a model-specific tokenizer library (e.g., tiktoken for OpenAI).
 * @param {string} input The string to estimate token length for.
 * @return {number} The estimated number of tokens.
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
