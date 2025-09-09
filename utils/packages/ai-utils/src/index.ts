/**
 * @fileoverview Comprehensive AI utilities package providing language model interactions, prompt generation, and machine learning tools.
 *
 * This package provides a complete suite of AI utilities for modern applications.
 * It includes prompt generation, template processing, vector operations, Python integration,
 * and various AI-powered applications like code review, translation, and content generation.
 *
 * @module AIUtils
 * @author Wayne
 * @since 1.0.0
 */
// gpt application
export * from './applications/codeReview';
export * from './applications/createSQL';
export * from './applications/createUnitTestCases';
export * from './applications/enhancePrompt';
export * from './applications/createReactComponent';
export * from './applications/createSummary';
export * from './applications/translate';

// llm utils
export * from './llm/prompts';

// basic utils
export * from './utils/python';

// prompt utils
export * from './utils/prompt';
