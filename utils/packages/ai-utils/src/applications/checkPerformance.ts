/**
 * @fileoverview AI-powered frontend performance audit prompt generators for runtime and delivery bottlenecks.
 *
 * This module provides prompt generators for inspecting frontend performance risks in
 * components, pages, rendering flows, and loading strategies. It is aimed at developer
 * workflows such as finding costly rendering patterns or slow-loading page structures.
 *
 * @module CheckPerformance
 * @author Wayne
 * @since 1.0.0
 */
import { createPromptGenerator } from '../utils/prompt/generator';
import { applyTemplate } from '../utils/prompt/applyTemplate';
import { STANDARD_PROMPT_TEMPLATE } from '../templates';

const MAX_TOKEN_LEN = 20000;

/**
 * 前端性能检查输入。
 *
 * Frontend performance audit input for pages, components, or loading flows.
 */
export interface FrontendPerformanceAuditInput {
  /**
   * 待检查的代码、页面结构、性能日志或场景描述。
   *
   * Code, page structure, performance log, or scenario description to analyze.
   */
  content: string;
  /**
   * 可选性能目标或关注指标。
   *
   * Optional performance goals or metrics of interest.
   */
  goals?: string[];
}

/**
 * 获取前端性能检查 prompt 文本（内部使用）。
 *
 * Generates a structured prompt for frontend performance audits.
 *
 * @param {FrontendPerformanceAuditInput} input - 前端性能检查输入。Frontend performance audit input.
 * @returns {string} 前端性能检查 Prompt 文本。Frontend performance audit prompt text.
 *
 * @example
 * genFrontendPerformanceAuditPrompt({
 *   content: 'A product page loads a 5MB hero image and renders a 3000-row table on mount.'
 * });
 *
 * @example
 * genFrontendPerformanceAuditPrompt({
 *   content: 'React component rerenders on every keypress because a parent object is recreated.',
 *   goals: ['reduce LCP', 'avoid unnecessary rerenders']
 * });
 */
function getFrontendPerformanceAuditPromptTxt(
  input: FrontendPerformanceAuditInput
): string {
  const goalContext =
    input.goals && input.goals.length > 0 ? `Performance goals: ${input.goals.join(', ')}\n` : '';

  return applyTemplate(STANDARD_PROMPT_TEMPLATE, {
    role: 'Senior frontend performance engineer focused on rendering, loading, and Web Vitals',
    task_description:
      'Audit the provided frontend content for performance risks. Evaluate rendering cost, hydration or client-side execution concerns, bundle delivery, media loading, network usage, caching opportunities, and Web Vitals implications.',
    format_instructions:
      'Return only JSON with this shape: {"summary":"...","priorities":[{"severity":"high|medium|low","category":"rendering|bundle|network|media|caching|web-vitals","issue":"...","recommendation":"...","expectedImpact":"..."}]}.',
    input_content: `${goalContext}${input.content}`,
    additional_instructions:
      '- Prioritize issues by user-visible impact and engineering value.\n' +
      '- Focus on concrete frontend fixes such as code splitting, lazy loading, memoization only when justified, virtualization, asset compression, caching, and render path simplification.\n' +
      '- Mention uncertainty when metrics are missing rather than inventing numbers.\n' +
      '- Keep recommendations practical for application code, build configuration, or page structure.',
  });
}

/**
 * 生成用于前端性能检查的 Prompt。
 *
 * Generates a prompt for frontend performance audits.
 *
 * @param {FrontendPerformanceAuditInput} input - 前端性能检查输入。Frontend performance audit input.
 * @returns {string} 前端性能检查 Prompt；超长时返回空字符串。Frontend performance audit prompt or an empty string when it exceeds the token limit.
 *
 * @example
 * genFrontendPerformanceAuditPrompt({
 *   content: 'The landing page blocks on multiple third-party scripts before rendering.'
 * });
 *
 * @example
 * genFrontendPerformanceAuditPrompt({
 *   content: 'This grid renders 10000 cells in one pass and recalculates filters on every state update.',
 *   goals: ['improve INP']
 * });
 */
export const genFrontendPerformanceAuditPrompt = createPromptGenerator(
  { maxTokenLength: MAX_TOKEN_LEN },
  getFrontendPerformanceAuditPromptTxt
);
