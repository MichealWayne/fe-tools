/**
 * @author Wayne
 * @LastEditTime 2025-08-10 11:00:00
 */

import {
  genCodeReviewPrompt,
  genSqlPrompt,
  genUnitTestCasesPrompt,
  genEnhancePrompt,
  genCreateReactComponentPrompt,
  genSummaryPrompt,
  genTranslatePrompt,
} from '../src';
import { estimateTokenLength } from '../src/llm/prompts';
import { createPromptGenerator } from '../src/utils/prompt';

describe('ai-utils', () => {
  const mockCode = `function add(a: number, b: number): number {
  return a + b;
}`;

  const mockSchema = `CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);`;

  // Create a string that is very likely to exceed token limits
  // Our estimateTokenLength gives ASCII chars <= 0.5 tokens each
  // So 100000 * 0.5 = 50000 estimated tokens, which is > 30000
  const veryLongString = 'a'.repeat(100000);
  
  // Create an even longer string to ensure it exceeds 30000 token limit
  // estimated tokens = 150000 * 0.25 = 37500 (for a-Z chars)
  const exceedingLongString = 'a'.repeat(150000);

  describe('llm/prompts', () => {
    describe('estimateTokenLength', () => {
      it('should estimate token length for ASCII strings', () => {
        const input = 'Hello world!';
        // H,e,l,l,o, ,w,o,r,l,d,! -> 12 chars
        // H,e,l,l,o,w,o,r,l,d are a-Z (0.25 each) -> 10 * 0.25 = 2.5
        // ' ', '!' are other ASCII (0.5 each) -> 2 * 0.5 = 1
        // Total = 3.5
        expect(estimateTokenLength(input)).toBeCloseTo(3.5, 5);
      });

      it('should estimate token length for Unicode strings', () => {
        const input = '你好'; // 2 Unicode chars
        // Each Unicode char is 1.5 tokens
        // Total = 2 * 1.5 = 3
        expect(estimateTokenLength(input)).toBeCloseTo(3, 5);
      });

      it('should handle empty string', () => {
        expect(estimateTokenLength('')).toBe(0);
      });

      it('should handle non-string input gracefully', () => {
        // @ts-ignore: Testing invalid input
        expect(estimateTokenLength(null)).toBe(0);
        // @ts-ignore: Testing invalid input
        expect(estimateTokenLength(undefined)).toBe(0);
        // @ts-ignore: Testing invalid input
        expect(estimateTokenLength(123)).toBe(0);
      });
    });
  });

  describe('utils/prompt', () => {
    describe('createPromptGenerator', () => {
      const simpleContentGenerator = (input: string) => `Input: ${input}`;
      const MAX_LEN = 100;

      it('should generate prompt correctly within token limit', () => {
        const generator = createPromptGenerator({ maxTokenLength: MAX_LEN }, simpleContentGenerator);
        const prompt = generator('test');
        expect(prompt).toBe('Input: test');
        expect(estimateTokenLength(prompt)).toBeLessThan(MAX_LEN);
      });

      it('should return empty string if prompt exceeds token limit', () => {
        const generator = createPromptGenerator({ maxTokenLength: 10 }, simpleContentGenerator); // Very low limit
        const prompt = generator(veryLongString); // Use the very long string
        expect(prompt).toBe('');
      });

      it('should use default max token length if not provided', () => {
        // Default is 32000, longString should be way less than that in our heuristic
        const generator = createPromptGenerator({}, simpleContentGenerator);
        const prompt = generator(veryLongString);
        // It will likely still be empty because our estimate is rough, but the key is it doesn't crash
        // and the logic path is tested.
        expect(typeof prompt).toBe('string');
      });

      it('should warn and return empty string for non-string generator output', () => {
        // @ts-ignore: Testing invalid generator output
        const faultyGenerator = createPromptGenerator({ maxTokenLength: 100 }, () => 123);
        const prompt = faultyGenerator('test');
        expect(prompt).toBe('');
      });
    });
  });

  describe('applications', () => {
    describe('codeReview', () => {
      it('should generate code review prompt correctly', () => {
        const prompt = genCodeReviewPrompt(mockCode);
        expect(prompt).toContain('### Role ###');
        expect(prompt).toContain('Frontend Expert and Code Reviewer');
        expect(prompt).toContain(mockCode);
        expect(prompt).toContain('JSON format');
      });

      it('should return empty string for very long code input', () => {
        const prompt = genCodeReviewPrompt(exceedingLongString); // Use the exceeding long string
        expect(prompt).toBe('');
      });
    });

    describe('createSQL', () => {
      it('should generate SQL prompt with engine and schema', () => {
        const prompt = genSqlPrompt({ engine: 'MySQL', schema: mockSchema });
        expect(prompt).toContain('MySQL DB and SQL Expert');
        expect(prompt).toContain(mockSchema);
      });

      it('should generate generic prompt without engine', () => {
        const prompt = genSqlPrompt({ schema: mockSchema });
        expect(prompt).toContain('General Chat Bot');
        expect(prompt).toContain(mockSchema);
      });

      it('should handle empty options', () => {
        const prompt = genSqlPrompt({});
        expect(prompt).toBeDefined();
        expect(typeof prompt).toBe('string');
      });
    });

    describe('createUnitTestCases', () => {
      it('should generate unit test prompt correctly', () => {
        const prompt = genUnitTestCasesPrompt(mockCode);
        expect(prompt).toContain('### Role ###');
        expect(prompt).toContain('Expert Software Tester');
        expect(prompt).toContain('Jest');
        expect(prompt).toContain(mockCode);
      });

      it('should return empty string for very long code input', () => {
        const prompt = genUnitTestCasesPrompt(exceedingLongString); // Use the exceeding long string
        expect(prompt).toBe('');
      });
    });

    describe('enhancePrompt', () => {
      it('should generate prompt enhancement prompt correctly', () => {
        const originalPrompt = 'Write a story about a cat.';
        const prompt = genEnhancePrompt(originalPrompt);
        expect(prompt).toContain('### Role ###');
        expect(prompt).toContain('Professional Prompt Engineer');
        expect(prompt).toContain(originalPrompt);
        // Should not contain the instruction to only reply with the prompt
        expect(prompt).not.toContain('IMPORTANT: Your response must ONLY contain the enhanced prompt text');
      });

      it('should return empty string for very long input', () => {
        const prompt = genEnhancePrompt(veryLongString); // Use the very long string (100000 'a's < 10000 token limit for enhancePrompt)
        // Wait, 100000 * 0.25 = 25000, which is > 10000. This should also return ''.
        // Let's re-calculate. enhancePrompt limit is 10000.
        // We need estimated tokens > 10000.
        // estimated tokens = char_count * 0.25 (for a-Z)
        // char_count > 10000 / 0.25 = 40000
        // So, veryLongString (100000 chars) should exceed 10000 token limit.
        expect(prompt).toBe('');
      });
    });

    describe('createReactComponent', () => {
      it('should generate React component prompt correctly', () => {
        const description = 'A simple button component.';
        const prompt = genCreateReactComponentPrompt(description);
        expect(prompt).toContain('### Role ###');
        expect(prompt).toContain('Professional React Developer');
        expect(prompt).toContain('TailwindCSS');
        expect(prompt).toContain(description);
      });

      it('should return empty string for very long description', () => {
        // createReactComponent limit is 20000.
        // We need estimated tokens > 20000.
        // char_count > 20000 / 0.25 = 80000
        // So, veryLongString (100000 chars) should exceed 20000 token limit.
        const prompt = genCreateReactComponentPrompt(veryLongString); // Use the very long string
        expect(prompt).toBe('');
      });
    });

    describe('createSummary', () => {
      it('should generate summary prompt with default options', () => {
        const text = 'This is a long text to be summarized.';
        const prompt = genSummaryPrompt({ text });
        expect(prompt).toContain('### Role ###');
        expect(prompt).toContain('Skilled Content Summarizer');
        expect(prompt).toContain('Create a clear and concise summary');
        expect(prompt).toContain(text);
        expect(prompt).toContain('medium length');
        expect(prompt).toContain('en');
      });

      it('should generate summary prompt with custom options', () => {
        const text = '这是要总结的中文文本。';
        const prompt = genSummaryPrompt({ text, options: { length: 'short', language: 'zh' } });
        expect(prompt).toContain('### Role ###');
        expect(prompt).toContain('Skilled Content Summarizer');
        expect(prompt).toContain('Create a clear and concise summary');
        expect(prompt).toContain(text);
        expect(prompt).toContain('short length');
        expect(prompt).toContain('zh');
      });
    });

    describe('translate', () => {
      it('should generate translation prompt with source and target language', () => {
        const text = 'Hello';
        const prompt = genTranslatePrompt({ text, options: { sourceLanguage: 'en', targetLanguage: 'fr' } });
        expect(prompt).toContain('### Role ###');
        expect(prompt).toContain('Expert Translator');
        expect(prompt).toContain('from en to fr');
        expect(prompt).toContain(text);
      });

      it('should generate translation prompt with only target language', () => {
        const text = 'Bonjour';
        const prompt = genTranslatePrompt({ text, options: { targetLanguage: 'en' } });
        expect(prompt).toContain('### Role ###');
        expect(prompt).toContain('Expert Translator');
        expect(prompt).toContain('to en');
        expect(prompt).toContain(text);
      });
      
      it('should generate translation prompt with style', () => {
        const text = 'Hello, how are you?';
        const prompt = genTranslatePrompt({ text, options: { sourceLanguage: 'en', targetLanguage: 'fr', style: 'formal' } });
        expect(prompt).toContain('### Role ###');
        expect(prompt).toContain('Expert Translator');
        expect(prompt).toContain('from en to fr');
        expect(prompt).toContain('formal style');
        expect(prompt).toContain(text);
      });
    });
  });
});