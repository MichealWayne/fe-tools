---
name: create-module-file
description: Create a new module file for fe-tools utilities. Use when a new focused file under `packages/<pkg>/src/` is needed (e.g., new validators module).
---
# Create Module File

## Workflow
1. Confirm the target package (`packages/utils`, `packages/web-utils`, `packages/node-utils`, `packages/canvas-utils`, `packages/ai-utils`).
2. Create a single-purpose module file under `packages/<pkg>/src/` (one module per file).
3. Add exported functions with bilingual JSDoc and explicit types.
4. Update `packages/<pkg>/src/index.ts` to export the new module (use `update-index-exports` if needed).
5. Add tests in `packages/<pkg>/__tests__/`.
