/**
 * @fileoverview AI-powered text summarization utilities with customizable length and style options.
 *
 * This module provides intelligent text summarization capabilities using AI language models.
 * It includes support for various summary lengths, styles, and formats to create concise
 * and informative summaries from long-form content while preserving key information.
 *
 * @module CreateSummary
 * @author Wayne
 * @since 1.0.0
 */
import { createPromptGenerator } from '../utils/prompt/generator';
import { applyTemplate } from '../utils/prompt/applyTemplate';
import { STANDARD_PROMPT_TEMPLATE } from '../templates';

/**
 * Options for generating a text summary.
 */
export interface SummaryOptions {
  /**
   * The desired length of the summary (e.g., 'short', 'medium', 'long').
   * The exact interpretation is up to the LLM.
   */
  length?: 'short' | 'medium' | 'long';
  /**
   * The language for the summary (e.g., 'en', 'zh').
   */
  language?: string;
}

// Internal interface to pass both text and options to the generator
export interface SummaryInput {
  text: string;
  options?: SummaryOptions;
}

/**
 * @function getCreateSummaryPromptTxt
 * @description 获取文本摘要的prompt (内部使用)
 * @param {SummaryInput} input
 * @returns {string}
 */
function getCreateSummaryPromptTxt(input: SummaryInput): string {
  const { text, options = {} } = input;
  const { length = 'medium', language = 'en' } = options;

  const formatInstructions = `Provide a concise summary in ${language}. The summary should be clear and capture the main points of the text.`;

  const additionalInstructions = `Produce a ${length} length summary. Focus on the core ideas and key information. Exclude minor details and examples unless they are critical to the main points.`;

  return applyTemplate(STANDARD_PROMPT_TEMPLATE, {
    role: 'Skilled Content Summarizer',
    task_description: 'Create a clear and concise summary of the provided text.',
    format_instructions: formatInstructions,
    input_content: text,
    additional_instructions: additionalInstructions,
  });
}

const DEFAULT_SUMMARY_TOKEN_LEN = 10000; // Reasonable default for summaries

/**
 * @function genSummaryPrompt
 * @description 根据输入文本生成摘要 Prompt 文本。Generates a prompt for summarizing the given text
 * @param {SummaryInput} input - 摘要输入参数（包含待摘要文本及配置项）/ summary input (text and options)
 * @param {number} [maxLen=10000] - token 最大长度限制 / maximum token length
 * @returns {string} 符合要求的 Prompt 文本，超过长度限制时返回空字符串。Prompt text, or empty string if it exceeds the token limit
 * @example
 * ```ts
 * const prompt = genSummaryPrompt({ text: 'Long article content...', options: { maxLength: 200 } });
 * console.log(prompt); // -> 完整的摘要生成 prompt
 * ```
 * @example
 * ```ts
 * const prompt = genSummaryPrompt({ text: articleText });
 * if (prompt) sendToLLM(prompt);
 * ```
 */
export const genSummaryPrompt = createPromptGenerator(
  { maxTokenLength: DEFAULT_SUMMARY_TOKEN_LEN },
  getCreateSummaryPromptTxt
);
