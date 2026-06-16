/**
 * @fileoverview AI-powered translation utilities supporting multiple languages with style and tone customization.
 *
 * This module provides intelligent translation capabilities using AI language models.
 * It includes support for multiple languages, translation styles, tone adjustment,
 * and context-aware translation with quality optimization for various use cases.
 *
 * @module Translate
 * @author Wayne
 * @since 1.0.0
 */
import { createPromptGenerator } from '../utils/prompt/generator';
import { applyTemplate } from '../utils/prompt/applyTemplate';
import { STANDARD_PROMPT_TEMPLATE } from '../templates';

/**
 * Options for translating text.
 */
export interface TranslateOptions {
  /**
   * The source language code (e.g., 'en', 'zh', 'fr').
   * If not provided, the LLM might attempt to auto-detect.
   */
  sourceLanguage?: string;
  /**
   * The target language code (e.g., 'en', 'zh', 'fr').
   */
  targetLanguage: string;
  /**
   * The style or tone for the translation (e.g., 'formal', 'informal', 'technical').
   */
  style?: 'formal' | 'informal' | 'technical' | 'casual' | 'literary';
}

// Internal interface to pass both text and options to the generator
export interface TranslateInput {
  text: string;
  options: TranslateOptions;
}

/**
 * @function getTranslatePromptTxt
 * @description 获取翻译的prompt (内部使用)
 * @param {TranslateInput} input
 * @returns {string}
 */
function getTranslatePromptTxt(input: TranslateInput): string {
  const { text, options } = input;
  const { sourceLanguage, targetLanguage, style } = options;

  let taskDescription = `Translate the provided text to ${targetLanguage}.`;
  if (sourceLanguage) {
    taskDescription = `Translate the provided text from ${sourceLanguage} to ${targetLanguage}.`;
  }

  let formatInstructions = `Provide the translated text in ${targetLanguage} only. Do not include the original text or any explanations.`;
  if (style) {
    formatInstructions += ` The translation should be in a ${style} style.`;
  }

  let additionalInstructions =
    'Maintain the original meaning and context as accurately as possible.';
  if (style) {
    additionalInstructions += ` Adapt the tone and word choice to fit a ${style} style.`;
  }
  if (!sourceLanguage) {
    additionalInstructions +=
      ' If the source language is ambiguous, choose the most likely one and proceed with the translation.';
  }

  return applyTemplate(STANDARD_PROMPT_TEMPLATE, {
    role: 'Expert Translator',
    task_description: taskDescription,
    format_instructions: formatInstructions,
    input_content: text,
    additional_instructions: additionalInstructions,
  });
}

const DEFAULT_TRANSLATE_TOKEN_LEN = 10000; // Reasonable default for translations

/**
 * @function genTranslatePrompt
 * @description 根据翻译输入生成翻译 Prompt 文本。Generates a prompt for text translation
 * @param {TranslateInput} input - 翻译输入参数（包含待翻译文本及源/目标语言配置）/ translate input (text and language options)
 * @param {number} [maxLen=10000] - token 最大长度限制 / maximum token length
 * @returns {string} 符合要求的 Prompt 文本，超过长度限制时返回空字符串。Prompt text, or empty string if it exceeds the token limit
 * @example
 * ```ts
 * const prompt = genTranslatePrompt({ text: 'Hello World', options: { from: 'en', to: 'zh' } });
 * console.log(prompt); // -> 完整的翻译 prompt
 * ```
 * @example
 * ```ts
 * const prompt = genTranslatePrompt({ text: sourceText, options: { to: 'ja' } });
 * if (prompt) sendToLLM(prompt);
 * ```
 */
export const genTranslatePrompt = createPromptGenerator(
  { maxTokenLength: DEFAULT_TRANSLATE_TOKEN_LEN },
  getTranslatePromptTxt
);
