"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genTranslatePrompt = void 0;
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
var generator_1 = require("../utils/prompt/generator");
var applyTemplate_1 = require("../utils/prompt/applyTemplate");
var templates_1 = require("../templates");
/**
 * @function getTranslatePromptTxt
 * @description 获取翻译的prompt (内部使用)
 * @param {TranslateInput} input
 * @returns {string}
 */
function getTranslatePromptTxt(input) {
    var text = input.text, options = input.options;
    var sourceLanguage = options.sourceLanguage, targetLanguage = options.targetLanguage, style = options.style;
    var taskDescription = "Translate the provided text to ".concat(targetLanguage, ".");
    if (sourceLanguage) {
        taskDescription = "Translate the provided text from ".concat(sourceLanguage, " to ").concat(targetLanguage, ".");
    }
    var formatInstructions = "Provide the translated text in ".concat(targetLanguage, " only. Do not include the original text or any explanations.");
    if (style) {
        formatInstructions += " The translation should be in a ".concat(style, " style.");
    }
    var additionalInstructions = 'Maintain the original meaning and context as accurately as possible.';
    if (style) {
        additionalInstructions += " Adapt the tone and word choice to fit a ".concat(style, " style.");
    }
    if (!sourceLanguage) {
        additionalInstructions +=
            ' If the source language is ambiguous, choose the most likely one and proceed with the translation.';
    }
    return (0, applyTemplate_1.applyTemplate)(templates_1.STANDARD_PROMPT_TEMPLATE, {
        role: 'Expert Translator',
        task_description: taskDescription,
        format_instructions: formatInstructions,
        input_content: text,
        additional_instructions: additionalInstructions,
    });
}
var DEFAULT_TRANSLATE_TOKEN_LEN = 10000; // Reasonable default for translations
/**
 * Generates a prompt for translating text.
 * @param text The text to translate.
 * @param options Options including source and target languages.
 * @returns A prompt string for the LLM, or an empty string if it exceeds token limits.
 */
exports.genTranslatePrompt = (0, generator_1.createPromptGenerator)({ maxTokenLength: DEFAULT_TRANSLATE_TOKEN_LEN }, getTranslatePromptTxt);
