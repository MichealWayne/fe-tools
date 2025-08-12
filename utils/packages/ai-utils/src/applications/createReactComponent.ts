/**
 * @author Wayne
 * @Date 2025-04-06 11:23:30
 * @LastEditTime 2025-08-10 15:02:10
 */
import { createPromptGenerator } from '../utils/prompt/generator';
import { applyTemplate } from '../utils/prompt/applyTemplate';
import { STANDARD_PROMPT_TEMPLATE } from '../templates';

const MAX_TOKEN_LEN = 20000; // GPT-4o 32k, prompt text should be shorter

const REACT_COMPONENT_INSTRUCTIONS = `
1.  **Component Structure**
    - Use functional components with PascalCase naming (e.g., 'PrimaryButton').
    - Implement semantic HTML elements (article/section/header/nav preferred over div).
    - Enable default export.

2.  **Styling Requirements**
    - Prioritize TailwindCSS with responsive design:
        - Use max-w/percentage units for container widths.
        - Implement mobile-first breakpoints (sm/md/lg/xl).
        - Font sizes in px units (no custom font families).
    - For style logic: Pre-process dynamic class combinations.
    - Ensure cross-device compatibility.

3.  **Props Design**
    - Use semantic prop names (avoid generic terms like 'data'/'value').
    - Externalize static text via props with default values.
    - Include TypeScript type definitions for props.
    - Add PropTypes validation.

4.  **Code Quality**
    - Add comprehensive JSDoc comments covering: Component name, Functionality, Tech stack, Usage scenarios, Example implementation.
    - Follow Airbnb JavaScript Style Guide.
    - Add internal logic comments for complex operations.
    - Implement error boundaries where appropriate.

5.  **Special Requirements**
    - Ensure SEO-optimized markup structure.
    - Comply with accessibility standards (ARIA labels/roles).
    - Provide pure CSS fallbacks for critical layouts.
    - Manage component lifecycle for side effects.
`.trim();

/**
 * @function getCreateReactComponentPromptTxt
 * @description 获取创建react组件的prompt (内部使用)
 * @param {string} userDescription
 * @returns {string}
 */
function getCreateReactComponentPromptTxt(userDescription: string): string {
  return applyTemplate(STANDARD_PROMPT_TEMPLATE, {
    role: 'Professional React Developer (React 18.2) with expertise in TailwindCSS',
    task_description:
      "Generate a high-quality, well-structured React component based on the user's description.",
    format_instructions:
      'Provide the complete React component implementation in TypeScript. Include JSDoc comments, prop types, default props, and usage examples.',
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
