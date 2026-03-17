/**
 * @fileoverview AI-powered frontend SEO audit prompt generators for page structure, metadata, and crawlability checks.
 *
 * This module provides focused prompt generation for SEO reviews in frontend projects.
 * It helps analyze rendered HTML, component output, routing metadata, and other page content
 * from a developer perspective with structured, actionable recommendations.
 *
 * @module CheckSEO
 * @author Wayne
 * @since 1.0.0
 */
import { createPromptGenerator } from '../utils/prompt/generator';
import { applyTemplate } from '../utils/prompt/applyTemplate';
import { STANDARD_PROMPT_TEMPLATE } from '../templates';

const MAX_TOKEN_LEN = 20000;

/**
 * SEO 检查输入。
 *
 * SEO audit input for frontend pages or page fragments.
 */
export interface FrontendSeoAuditInput {
  /**
   * 待检查的页面代码、HTML、组件输出或页面描述。
   *
   * Page source, rendered HTML, component output, or page description to audit.
   */
  content: string;
  /**
   * 可选页面 URL，用于帮助模型理解页面定位。
   *
   * Optional page URL to help the model understand the page context.
   */
  pageUrl?: string;
  /**
   * 可选目标关键词列表。
   *
   * Optional target keywords for relevance evaluation.
   */
  targetKeywords?: string[];
}

/**
 * 获取 SEO 检查 prompt 文本（内部使用）。
 *
 * Generates a structured prompt for frontend SEO auditing.
 *
 * @param {FrontendSeoAuditInput} input - SEO 检查输入。SEO audit input data.
 * @returns {string} SEO 检查 Prompt 文本。SEO audit prompt text.
 *
 * @example
 * const prompt = genFrontendSeoAuditPrompt({
 *   content: '<html><head><title>Home</title></head><body><h1>Landing</h1></body></html>',
 *   pageUrl: 'https://example.com/'
 * });
 *
 * @example
 * const prompt = genFrontendSeoAuditPrompt({
 *   content: '<main><h1>AI Toolkit</h1><p>Build faster</p></main>',
 *   targetKeywords: ['AI toolkit', 'frontend developer tools']
 * });
 */
function getFrontendSeoAuditPromptTxt(input: FrontendSeoAuditInput): string {
  const pageContext = input.pageUrl ? `Page URL: ${input.pageUrl}\n` : '';
  const keywordContext =
    input.targetKeywords && input.targetKeywords.length > 0
      ? `Target keywords: ${input.targetKeywords.join(', ')}\n`
      : '';

  return applyTemplate(STANDARD_PROMPT_TEMPLATE, {
    role: 'Senior Technical SEO consultant for modern frontend applications',
    task_description:
      'Audit the provided frontend page content for SEO quality. Evaluate metadata, heading hierarchy, semantic structure, crawlability, internal discoverability, structured data opportunities, and content-to-keyword alignment.',
    format_instructions:
      'Return only JSON with this shape: {"summary":"...","score":0-100,"checks":[{"category":"metadata|semantics|crawlability|structured-data|content","status":"pass|warning|fail","issue":"...","recommendation":"..."}]}.',
    input_content: `${pageContext}${keywordContext}${input.content}`,
    additional_instructions:
      '- Focus on developer-actionable issues instead of generic SEO theory.\n' +
      '- Call out missing or weak title, meta description, canonical, robots, hreflang, Open Graph, or Twitter metadata when relevant.\n' +
      '- Inspect heading structure, landmark usage, link quality, duplicate or thin content signals, and structured data opportunities.\n' +
      '- Prefer concrete fixes that a frontend engineer can implement in code or page templates.\n' +
      '- If some evidence is unavailable, say so in the issue wording instead of inventing facts.',
  });
}

/**
 * 生成用于前端 SEO 检查的 Prompt。
 *
 * Generates a prompt for frontend SEO audits.
 *
 * @param {FrontendSeoAuditInput} input - SEO 检查输入。SEO audit input.
 * @returns {string} SEO 检查 Prompt；超长时返回空字符串。SEO audit prompt or an empty string when it exceeds the token limit.
 *
 * @example
 * genFrontendSeoAuditPrompt({
 *   content: '<head><title>Docs</title></head><main><h1>Docs</h1></main>'
 * });
 *
 * @example
 * genFrontendSeoAuditPrompt({
 *   content: '<main><h1>Product</h1><p>Fast delivery</p></main>',
 *   targetKeywords: ['delivery platform']
 * });
 */
export const genFrontendSeoAuditPrompt = createPromptGenerator(
  { maxTokenLength: MAX_TOKEN_LEN },
  getFrontendSeoAuditPromptTxt
);
