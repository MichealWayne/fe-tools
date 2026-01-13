"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCreateReactComponentPrompt = exports.genCreateReactComponentPrompt = void 0;
/**
 * @fileoverview AI-powered React component generation utilities with TailwindCSS integration and best practices enforcement.
 *
 * This module provides intelligent React component generation using AI language models.
 * It includes comprehensive component creation with TypeScript support, TailwindCSS styling,
 * responsive design patterns, and adherence to modern React development best practices.
 *
 * @module CreateReactComponent
 * @author Wayne
 * @since 1.0.0
 */
var generator_1 = require("../utils/prompt/generator");
var applyTemplate_1 = require("../utils/prompt/applyTemplate");
var templates_1 = require("../templates");
var MAX_TOKEN_LEN = 20000; // GPT-4o 32k, prompt text should be shorter
var REACT_COMPONENT_INSTRUCTIONS = "\n1.  **Component Structure**\n    - Use functional components with PascalCase naming (e.g., 'PrimaryButton').\n    - Implement semantic HTML elements (article/section/header/nav preferred over div).\n    - Enable default export.\n\n2.  **Styling Requirements**\n    - Prioritize TailwindCSS with responsive design:\n        - Use max-w/percentage units for container widths.\n        - Implement mobile-first breakpoints (sm/md/lg/xl).\n        - Font sizes in px units (no custom font families).\n    - For style logic: Pre-process dynamic class combinations.\n    - Ensure cross-device compatibility.\n\n3.  **Props Design**\n    - Use semantic prop names (avoid generic terms like 'data'/'value').\n    - Externalize static text via props with default values.\n    - Include TypeScript type definitions for props.\n    - Add PropTypes validation.\n\n4.  **Code Quality**\n    - Add comprehensive JSDoc comments covering: Component name, Functionality, Tech stack, Usage scenarios, Example implementation.\n    - Follow Airbnb JavaScript Style Guide.\n    - Add internal logic comments for complex operations.\n    - Implement error boundaries where appropriate.\n\n5.  **Special Requirements**\n    - Ensure SEO-optimized markup structure.\n    - Comply with accessibility standards (ARIA labels/roles).\n    - Provide pure CSS fallbacks for critical layouts.\n    - Manage component lifecycle for side effects.\n".trim();
/**
 * @function getCreateReactComponentPromptTxt
 * @description 获取创建react组件的prompt (内部使用)
 * @param {string} userDescription
 * @returns {string}
 */
function getCreateReactComponentPromptTxt(userDescription) {
    return (0, applyTemplate_1.applyTemplate)(templates_1.STANDARD_PROMPT_TEMPLATE, {
        role: 'Professional React Developer (React 18.2) with expertise in TailwindCSS',
        task_description: "Generate a high-quality, well-structured React component based on the user's description.",
        format_instructions: 'Provide the complete React component implementation in TypeScript. Include JSDoc comments, prop types, default props, and usage examples.',
        input_content: userDescription,
        additional_instructions: REACT_COMPONENT_INSTRUCTIONS,
    });
}
/**
 * @function genCreateReactComponentPrompt
 * @description 生成用于创建React组件的Prompt
 * @param {string} description 用户对组件的描述
 * @param {number} maxLen token最大长度, 默认20000
 * @returns {string} 符合要求的Prompt文本，如果超过长度限制则返回空字符串
 */
exports.genCreateReactComponentPrompt = (0, generator_1.createPromptGenerator)({ maxTokenLength: MAX_TOKEN_LEN }, getCreateReactComponentPromptTxt);
exports.getCreateReactComponentPrompt = exports.genCreateReactComponentPrompt;
