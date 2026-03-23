---
name: create-module-file
description: "Create a new module file for fe-tools utilities. Scaffolds a single-purpose TypeScript module with bilingual JSDoc, exports, and tests. Use when a new focused file under packages/utils/src/, packages/web-utils/src/, packages/node-utils/src/, packages/canvas-utils/src/, or packages/ai-utils/src/ is needed (e.g., new validators module, new string helpers)."
---
# Create Module File

## Workflow
1. Confirm the target package (`packages/utils`, `packages/web-utils`, `packages/node-utils`, `packages/canvas-utils`, `packages/ai-utils`).
2. Create a single-purpose module file under `packages/<pkg>/src/` (one module per file). Use a descriptive kebab-case name matching the module's domain (e.g., `validators.ts`, `string-helpers.ts`).
3. Add exported functions with bilingual JSDoc and explicit types. Example skeleton:
   ```ts
   /**
    * 校验邮箱格式是否合法
    * Validate whether an email address format is valid.
    * @param email - 邮箱地址 / email address to validate
    * @returns 是否合法 / whether the format is valid
    * @example
    * isValidEmail('user@example.com'); // true
    * @example
    * isValidEmail('not-an-email'); // false
    */
   export function isValidEmail(email: string): boolean {
     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
   }
   ```
4. Update `packages/<pkg>/src/index.ts` to export the new module (use `update-index-exports` skill if needed).
5. Add tests in `packages/<pkg>/__tests__/`. Verify tests pass: `TEST_API=<package> npm run test`.
