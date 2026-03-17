/**
 * @fileoverview AI-powered accessibility audit prompt generators for frontend markup and interaction flows.
 *
 * This module provides prompt generation utilities for reviewing accessibility concerns in
 * frontend pages and components. It is intended for developer-facing checks such as missing
 * labels, keyboard traps, poor semantics, and assistive technology issues.
 *
 * @module CheckAccessibility
 * @author Wayne
 * @since 1.0.0
 */
import { createPromptGenerator } from '../utils/prompt/generator';
import { applyTemplate } from '../utils/prompt/applyTemplate';
import { STANDARD_PROMPT_TEMPLATE } from '../templates';

const MAX_TOKEN_LEN = 20000;

/**
 * 可访问性检查输入。
 *
 * Accessibility audit input for UI fragments, pages, or interaction descriptions.
 */
export interface FrontendAccessibilityAuditInput {
  /**
   * 待检查的组件代码、HTML、页面片段或交互描述。
   *
   * Component code, HTML, page fragment, or interaction description to inspect.
   */
  content: string;
  /**
   * 可选用户流程上下文。
   *
   * Optional user-flow context for the audit.
   */
  userFlow?: string;
}

/**
 * 获取可访问性检查 prompt 文本（内部使用）。
 *
 * Generates a structured prompt for frontend accessibility auditing.
 *
 * @param {FrontendAccessibilityAuditInput} input - 可访问性检查输入。Accessibility audit input.
 * @returns {string} 可访问性检查 Prompt 文本。Accessibility audit prompt text.
 *
 * @example
 * genFrontendAccessibilityAuditPrompt({
 *   content: '<button><svg></svg></button>',
 *   userFlow: 'User opens a modal and confirms deletion'
 * });
 *
 * @example
 * genFrontendAccessibilityAuditPrompt({
 *   content: '<form><input type="text" /></form>'
 * });
 */
function getFrontendAccessibilityAuditPromptTxt(
  input: FrontendAccessibilityAuditInput
): string {
  const flowContext = input.userFlow ? `User flow: ${input.userFlow}\n` : '';

  return applyTemplate(STANDARD_PROMPT_TEMPLATE, {
    role: 'Senior accessibility engineer specializing in WCAG-oriented frontend reviews',
    task_description:
      'Audit the provided frontend content for accessibility risks across semantics, keyboard support, focus management, labeling, screen reader behavior, color/contrast hints, and dynamic state announcements.',
    format_instructions:
      'Return only JSON with this shape: {"summary":"...","issues":[{"severity":"high|medium|low","category":"semantics|keyboard|focus|forms|media|dynamic-state","issue":"...","recommendation":"..."}]}.',
    input_content: `${flowContext}${input.content}`,
    additional_instructions:
      '- Focus on issues a frontend engineer can verify and fix in markup, component logic, or interaction design.\n' +
      '- Check for accessible names, label associations, button/link semantics, tab order, focus traps, modal behavior, form errors, and aria misuse.\n' +
      '- Mention uncertainty when the provided content is incomplete instead of guessing hidden behavior.\n' +
      '- Keep recommendations concrete and implementation-oriented.',
  });
}

/**
 * 生成用于前端可访问性检查的 Prompt。
 *
 * Generates a prompt for frontend accessibility audits.
 *
 * @param {FrontendAccessibilityAuditInput} input - 可访问性检查输入。Accessibility audit input.
 * @returns {string} 可访问性检查 Prompt；超长时返回空字符串。Accessibility audit prompt or an empty string when it exceeds the token limit.
 *
 * @example
 * genFrontendAccessibilityAuditPrompt({
 *   content: '<div role="button">Submit</div>'
 * });
 *
 * @example
 * genFrontendAccessibilityAuditPrompt({
 *   content: '<dialog open><button aria-label="Close"></button></dialog>',
 *   userFlow: 'Keyboard user opens and closes the dialog'
 * });
 */
export const genFrontendAccessibilityAuditPrompt = createPromptGenerator(
  { maxTokenLength: MAX_TOKEN_LEN },
  getFrontendAccessibilityAuditPromptTxt
);
