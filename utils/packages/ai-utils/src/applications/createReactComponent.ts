/**
 * @author Wayne
 * @Date 2025-04-06 11:23:30
 * @LastEditTime 2025-04-06 11:32:56
 */
import { estimateTokenLength } from '../llm/prompts';
const MAX_TOKEN_LEN = 20000; // GPT-4o 32k, prompt text should be shorter

/**
 * @function getCreateReactComponentPrompt
 * @description 获取创建react组件的prompt
 * @param {string} prompt
 * @returns {string}
 */
export function getCreateReactComponentPrompt(prompt: string) {
  return `### Create React Component ###
You are a professional React developer with expertise in creating high-quality, well-structured React components. 

Your task is to generate React component code adhering to the following specifications:

1. **Component Structure**
- Use React 18.2 with functional components
- Apply PascalCase naming (e.g., 'PrimaryButton')
- Implement semantic HTML elements (article/section/header/nav preferred over div)
- Enable default export

2. **Styling Requirements**
- Prioritize TailwindCSS with responsive design:
  - Use max-w/percentage units for container widths
  - Implement mobile-first breakpoints (sm/md/lg/xl)
  - Font sizes in px units (no custom font families)
- For style logic: Pre-process dynamic class combinations
- Ensure cross-device compatibility

3. **Props Design**
- Semantic prop names (avoid generic terms like 'data'/'value')
- Externalize static text via props with default values
- TypeScript type definitions for props
- Include PropTypes validation

4. **Code Quality**
- Comprehensive JSDoc comments covering:
  \`\`\`Component name | Functionality | Tech stack | Usage scenarios | Example implementation\`\`\`
- Follow Airbnb JavaScript Style Guide
- Add internal logic comments for complex operations
- Implement error boundaries where appropriate

5. **Special Requirements**
- SEO-optimized markup structure
- Accessibility compliance (ARIA labels/roles)
- Pure CSS fallbacks for critical layouts
- Lifecycle management for side effects

Provide complete implementation including:
- Component logic
- PropType definitions
- Default props
- Style implementation
- Usage examples

I want you to improve the user prompt that is wrapped in \`<original_prompt>\` tags.

<original_prompt>
  ${prompt}
</original_prompt>`;
}

/**
 * @function genCreateReactComponentPrompt
 * @description 生成创建react组件的prompt
 * @param {string} prompt prompt字符串
 * @param {number} maxLen token最大长度, 默认20000
 * @returns {string} prompt信息
 */
export function genCreateReactComponentPrompt(prompt: string, maxLen = MAX_TOKEN_LEN) {
  const promptTxt = getCreateReactComponentPrompt(prompt);

  if (estimateTokenLength(promptTxt) > maxLen) {
    return '';
  }
  return promptTxt;
}
