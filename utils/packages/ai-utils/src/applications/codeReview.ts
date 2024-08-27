/**
 * @module promptApplications
 * @author Wayne
 * @Date 2023-07-22 11:34:04
 * @LastEditTime 2024-08-25 14:05:40
 */
import { estimateTokenLength } from '../llm/prompts';
const MAX_TOKEN_LEN = 4000; // GPT3.5 4096

/**
 * @function getCodeReviewPrompt
 * @description 获取检测的prompt
 * @param {string} patch
 * @return {string}
 */
export function getCodeReviewPromptTxt(patch: string) {
  return `### code review ###
As the front-end expert and good at front-end code reviewer, perform a brief code review on the provided patch. Respond in TypeScript/JavaScript if any bug risks or improvement suggestions are identified, and provide your analysis in Chinese.

Ensure the result uses the following JSON format:

\`\`\` json
{
  "score": ..,
  "details": [
    {
      "line": ..,
      "column": ..,
      "suggestion": ..
    }
    ...
  ]
}
\`\`\`

Your suggestions should be concise and tidy.

The code patch to be reviewed can be found below:
<input>
${patch}
</input>

Let’s work this out in a step-by-step way to be sure we have the right answer.`;
}

/**
 * @function genCodeReviewPrompt
 * @description 生成检测的prompt
 * @param {string} codeStr 代码字符串
 * @param {number} maxLen token最大长度, 默认4000
 * @returns {string} prompt信息
 */
export function genCodeReviewPrompt(codeStr: string, maxLen = MAX_TOKEN_LEN) {
  const promptTxt = getCodeReviewPromptTxt(codeStr);

  if (estimateTokenLength(promptTxt) > maxLen) {
    return '';
  }
  return promptTxt;
}
