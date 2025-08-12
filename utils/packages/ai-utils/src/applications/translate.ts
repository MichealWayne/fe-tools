/**
 * @module aiUtils
 * @author Wayne
 * @Date 2025-08-10
 * @LastEditTime 2025-08-10 15:02:12
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
interface TranslateInput {
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
 * Generates a prompt for translating text.
 * @param text The text to translate.
 * @param options Options including source and target languages.
 * @returns A prompt string for the LLM, or an empty string if it exceeds token limits.
 */
export const genTranslatePrompt = createPromptGenerator(
  { maxTokenLength: DEFAULT_TRANSLATE_TOKEN_LEN },
  getTranslatePromptTxt
);
