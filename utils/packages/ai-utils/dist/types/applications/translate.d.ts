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
interface TranslateInput {
    text: string;
    options: TranslateOptions;
}
/**
 * Generates a prompt for translating text.
 * @param text The text to translate.
 * @param options Options including source and target languages.
 * @returns A prompt string for the LLM, or an empty string if it exceeds token limits.
 */
export declare const genTranslatePrompt: (input: TranslateInput) => string;
export {};
