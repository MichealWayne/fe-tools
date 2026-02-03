---
name: add-utils-function
description: Add or modify utility functions in fe-tools. Use when the user asks to add a new utility/helper/validator (e.g., "新增utils函数", "add utility function", "新增SQL语句校验功能") or to extend existing utils in @fe-tools/utils, @fe-tools/web-utils, or @fe-tools/node-utils.
---
# Add Utils Function

## Workflow
1. Identify the target package based on environment needs:
   - Environment-agnostic logic -> `packages/utils`
   - Browser-only APIs -> `packages/web-utils`
   - Node-only APIs -> `packages/node-utils`
2. Search existing modules to avoid duplication (`rg <keyword> packages`).
3. Choose the most appropriate module file (e.g., `array.ts`, `validators.ts`) or create a new focused file.
4. Implement the function with explicit types and no `any`.
5. Add bilingual JSDoc (Chinese + English), parameter/return docs, and at least two examples. Use the `bilingual-jsdoc` skill if needed.
6. Export the function from the package `src/index.ts`.
7. Add unit tests in the package `__tests__` directory. Use the `add-tests` skill if needed.
8. Suggest verification commands:
   - `TEST_API=<package> npm run test`
   - `npm run build`
