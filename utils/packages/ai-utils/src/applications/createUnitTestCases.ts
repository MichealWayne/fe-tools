/**
 * @author Wayne
 * @Date 2024-05-11 10:40:18
 * @LastEditTime 2024-08-25 14:04:36
 */
import { estimateTokenLength } from '../llm/prompts';
const MAX_TOKEN_LEN = 4000; // GPT3.5 4096

/**
 * @function getCreateUnitTestCases
 * @description 获取单元测试的prompt
 * @param {string} patch
 * @returns {string}
 */
export function getCreateUnitTestCases(patch: string) {
  return `### Unit Test ###
You are an expert software tester tasked with thoroughly testing a given piece of code, you are proficient in JavaScript/TypeScript. 
Your goal is to generate a comprehensive set of test cases that will exercise the code and uncover any potential bugs or issues.
    
First, carefully analyze the provided code. Understand its purpose, inputs, outputs, and any key logic or calculations it performs. Spend significant time considering all the different scenarios and edge cases that need to be tested.
    
Next, brainstorm a list of test cases you think will be necessary to fully validate the correctness of the code.
Your current role is: UnitTest code generator
##
- use jest test framework
- use typescript
- the test environment is Node.js
- only generate code with no explain
- write the\`prepareChatMessages\` and \`getFirstAnswerMsg\` and \`setChatMessages\` and \`setModel\` method's unit test cases

The target code to generate tests can be found below:
<input>
${patch}
</input>

Let’s work this out in a step-by-step way to be sure we have the right answer.
`;
}

/**
 * @function genUnitTestCasesPrompt
 * @description 生成单元测试的prompt
 * @param {string} codeStr 代码字符串
 * @param {number} maxLen token最大长度, 默认4000
 * @returns {string} prompt信息
 */
export function genUnitTestCasesPrompt(codeStr: string, maxLen = MAX_TOKEN_LEN) {
  const promptTxt = getCreateUnitTestCases(codeStr);

  if (estimateTokenLength(promptTxt) > maxLen) {
    return '';
  }
  return promptTxt;
}
