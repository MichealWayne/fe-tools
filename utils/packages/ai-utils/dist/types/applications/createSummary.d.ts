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
interface SummaryInput {
    text: string;
    options?: SummaryOptions;
}
/**
 * Generates a prompt for summarizing text.
 * @param text The text to summarize.
 * @param options Options for the summary.
 * @returns A prompt string for the LLM, or an empty string if it exceeds token limits.
 */
export declare const genSummaryPrompt: (input: SummaryInput) => string;
export {};
