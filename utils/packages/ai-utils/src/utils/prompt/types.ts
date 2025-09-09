/**
 * @fileoverview Type definitions for prompt generation utilities and configuration interfaces.
 *
 * This module provides TypeScript type definitions for prompt generation systems.
 * It includes interfaces for prompt configuration, generator options, and various
 * utility types used throughout the AI prompt processing pipeline.
 *
 * @module PromptTypes
 * @author Wayne
 * @since 1.0.0
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
