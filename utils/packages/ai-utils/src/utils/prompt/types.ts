/**
 * @module aiUtils
 * @author Wayne
 * @Date 2025-08-10
 * @LastEditTime 2025-08-10 15:02:15
 */

/**
 * Configuration options for the prompt generator.
 */
export interface PromptConfig {
  /**
   * Maximum allowed token length for the generated prompt.
   * If the generated prompt exceeds this length, the generator may return an empty string or throw an error.
   */
  maxTokenLength?: number;
  // Future extensions could include:
  // model?: string; // Preferred LLM model
  // strictLengthCheck?: boolean; // Whether to throw an error or just return empty string on overflow
}
