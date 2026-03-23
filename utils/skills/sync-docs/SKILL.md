---
name: sync-docs
description: "Regenerate or verify documentation for fe-tools. Generates API reference from TypeDoc comments, checks for missing documentation, and validates code-doc alignment. Use when the user asks to update docs, generate TypeDoc output, or verify documentation alignment."
---
# Sync Docs

## Workflow
1. Ensure exported APIs are correct in `packages/*/src/index.ts`. Each public function should have a corresponding `export` statement:
   ```ts
   export { isValidEmail } from './validators';
   export { formatDate, parseDate } from './date';
   ```
2. Run `npm run docs` to generate TypeDoc output.
3. If doc errors occur, fix the first reported issue and re-run. Common issues:
   - Missing JSDoc on an exported function — add bilingual JSDoc (use `bilingual-jsdoc` skill)
   - Type reference not found — check import paths
4. Verify docs generated successfully by confirming the output directory exists and contains updated files.
