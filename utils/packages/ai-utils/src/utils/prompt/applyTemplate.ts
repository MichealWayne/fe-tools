/**
 * @module aiUtils
 * @author Wayne
 * @Date 2025-08-10
 * @LastEditTime 2025-08-10 15:02:13
 */

/**
 * Replaces placeholders in a template string with provided values.
 *
 * @param {string} template The template string containing placeholders like {{key}}.
 * @param {Record<string, string>} replacements An object mapping placeholder keys to their replacement values.
 * @returns {string} The template string with placeholders replaced by their corresponding values.
 *
 * @example
 * const template = "Hello, {{name}}!";
 * const result = applyTemplate(template, { name: "World" });
 * console.log(result); // Output: "Hello, World!"
 */
export function applyTemplate(template: string, replacements: Record<string, string>): string {
  // Basic validation
  if (typeof template !== 'string') {
    console.error('Template must be a string.');
    return '';
  }
  if (!replacements || typeof replacements !== 'object') {
    console.error('Replacements must be a valid object.');
    return template; // Return template as is if replacements are invalid
  }

  let result = template;
  for (const [key, value] of Object.entries(replacements)) {
    // Create a regex to find all instances of {{key}}
    // 'g' flag for global replacement, 's' flag for dotAll (if needed, though not critical here)
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, value);
  }
  return result;
}
