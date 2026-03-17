---
name: add-utils-function
description: Add or modify utility functions in fe-tools. Use when the user asks to add a new utility/helper/validator (e.g., "新增utils函数", "add utility function", "新增SQL语句校验功能") or to extend existing utils in @fe-tools/utils, @fe-tools/web-utils, @fe-tools/node-utils, @fe-tools/canvas-utils, or @fe-tools/ai-utils.
---
# Add Utils Function

## Workflow
1. Identify the target package based on function scope, defaulting to `packages/utils` for general-purpose helpers. If unsure, use the `select-package` skill.
   - Environment-agnostic, broadly useful helpers -> `packages/utils`
   - Browser-only APIs or DOM usage -> `packages/web-utils`
   - Node-only APIs (fs, process, path, http) -> `packages/node-utils`
   - Canvas 2D rendering or canvas math helpers -> `packages/canvas-utils`
   - AI/ML-related helpers (prompting, model utilities) -> `packages/ai-utils`
2. Search existing modules to avoid duplication (`rg <keyword> packages`).
3. If an existing exported function already satisfies the request or differs only by naming/minor boundary behavior, do not create a new function. Reuse the existing function and respond with the current API name, file location, and any relevant behavior notes instead of adding duplicate functionality.
4. Only when no suitable existing function exists, choose the most appropriate module file (e.g., `array.ts`, `validators.ts`) or create a new focused file. If creating a new file, use the `create-module-file` skill.
5. Implement the function with explicit types and no `any`.
6. Add bilingual JSDoc (Chinese + English), parameter/return docs, and at least two examples. Use the `bilingual-jsdoc` skill if needed.
7. Export the function from the package `src/index.ts`. Use the `update-index-exports` skill if needed.
8. Add unit tests in the package `__tests__` directory. Use the `add-tests` skill if needed.
9. Suggest verification commands:
   - `TEST_API=<package> npm run test`
   - `npm run build`
