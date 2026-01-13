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
 * @function getCreateSummaryPromptTxt
 * @description 获取文本摘要的prompt (内部使用)
 * @param {SummaryInput} input
 * @returns {string}
 */
function getCreateSummaryPromptTxt(input) {
    var text = input.text, _a = input.options, options = _a === void 0 ? {} : _a;
    var _b = options.length, length = _b === void 0 ? 'medium' : _b, _c = options.language, language = _c === void 0 ? 'en' : _c;
    var formatInstructions = "Provide a concise summary in ".concat(language, ". The summary should be clear and capture the main points of the text.");
    var additionalInstructions = "Produce a ".concat(length, " length summary. Focus on the core ideas and key information. Exclude minor details and examples unless they are critical to the main points.");
    return applyTemplate(STANDARD_PROMPT_TEMPLATE, {
        role: 'Skilled Content Summarizer',
        task_description: 'Create a clear and concise summary of the provided text.',
        format_instructions: formatInstructions,
        input_content: text,
        additional_instructions: additionalInstructions,
    });
}
var DEFAULT_SUMMARY_TOKEN_LEN = 10000; // Reasonable default for summaries
/**
 * Generates a prompt for summarizing text.
 * @param text The text to summarize.
 * @param options Options for the summary.
 * @returns A prompt string for the LLM, or an empty string if it exceeds token limits.
 */
export var genSummaryPrompt = createPromptGenerator({ maxTokenLength: DEFAULT_SUMMARY_TOKEN_LEN }, getCreateSummaryPromptTxt);
