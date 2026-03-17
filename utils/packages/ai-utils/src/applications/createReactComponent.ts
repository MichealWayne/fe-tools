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
import { createPromptGenerator } from '../utils/prompt/generator';
import { applyTemplate } from '../utils/prompt/applyTemplate';
import { STANDARD_PROMPT_TEMPLATE } from '../templates';

const MAX_TOKEN_LEN = 20000; // GPT-4o 32k, prompt text should be shorter

const REACT_COMPONENT_INSTRUCTIONS = `
1. **Component Structure**
   - Use React functional components with TypeScript and PascalCase naming.
   - Prefer semantic HTML and keep the DOM structure minimal and meaningful.
   - Export a single ready-to-use component.

2. **Props Design**
   - Define an explicit props interface with clear semantic names.
   - Provide sensible optional props or defaults when the UI copy can vary.
   - Avoid unnecessary abstractions, global dependencies, and hidden magic values.

3. **Styling Requirements**
   - Prefer TailwindCSS utility classes and mobile-first responsive behavior.
   - Keep dynamic class logic readable and avoid duplicated class fragments.
   - Ensure the component remains practical in a real product codebase instead of a demo-only snippet.

4. **Quality Requirements**
   - Include concise JSDoc for the exported component and comments only where logic is non-obvious.
   - Follow modern React patterns compatible with React 18 and TypeScript.
   - Build in accessibility by default, including labels, roles, and keyboard expectations where relevant.

5. **Output Discipline**
   - If the request is ambiguous, make minimal reasonable assumptions inside the code rather than writing a long explanation.
   - Keep the output self-contained and production-oriented.
`.trim();

/**
 * @function getCreateReactComponentPromptTxt
 * @description 获取创建react组件的prompt (内部使用)
 * @param {string} userDescription
 * @returns {string}
 */
function getCreateReactComponentPromptTxt(userDescription: string): string {
  return applyTemplate(STANDARD_PROMPT_TEMPLATE, {
    role: 'Senior React and TypeScript frontend engineer with strong TailwindCSS experience',
    task_description:
      "Generate a production-ready React component based on the user's description.",
    format_instructions:
      'Return only the complete component implementation in TSX. Do not include markdown code fences or explanatory prose.',
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
export const genCreateReactComponentPrompt = createPromptGenerator(
  { maxTokenLength: MAX_TOKEN_LEN },
  getCreateReactComponentPromptTxt
);

// For backward compatibility, alias the old function name
export { genCreateReactComponentPrompt as getCreateReactComponentPrompt };
