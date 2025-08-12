/**
 * @module aiUtils
 * @author Wayne
 * @Date 2025-08-10
 * @LastEditTime 2025-08-10 15:02:11
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
interface SummaryInput {
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
 * Generates a prompt for summarizing text.
 * @param text The text to summarize.
 * @param options Options for the summary.
 * @returns A prompt string for the LLM, or an empty string if it exceeds token limits.
 */
export const genSummaryPrompt = createPromptGenerator(
  { maxTokenLength: DEFAULT_SUMMARY_TOKEN_LEN },
  getCreateSummaryPromptTxt
);
