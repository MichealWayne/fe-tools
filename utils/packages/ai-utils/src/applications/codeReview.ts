/**
 * @author Wayne
 * @Date 2023-07-22 11:34:04
 * @LastEditTime 2023-07-22 11:38:53
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
  As the front-end experts, please help me do a brief code review, Answer me in TypeScript/JavaScript if any bug risk and improvement suggestion are welcome(Please say chinese):
    ${patch}.
Make sure the result FORMAT is JSON data, use double quotes and property names are string literals,
strictly using this FORMAT and naming: {"score": ..,"details":[{"line":.., "column":.., "suggestion": ..}..]}, and the suggestion is tidy.`;
}

export function genCodeReviewPrompt(codeStr: string, maxLen = MAX_TOKEN_LEN) {
  const promptTxt = getCodeReviewPromptTxt(codeStr);

  if (estimateTokenLength(promptTxt) > maxLen) {
    return '';
  }
  return promptTxt;
}
