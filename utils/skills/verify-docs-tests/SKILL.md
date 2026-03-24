---
name: verify-docs-tests
description: "Verify documentation and tests in fe-tools. Checks that exported functions have corresponding documentation and test coverage, validates JSDoc presence, and identifies missing tests. Use when the user asks to verify docs/tests, or ensure exports and docs are aligned across utils, web-utils, node-utils, canvas-utils, or ai-utils."
---
# Verify Docs and Tests

## Workflow
1. Check that exported APIs in `packages/<pkg>/src/index.ts` match documentation expectations. Compare exports against JSDoc coverage:
   ```bash
   # List exports to check for JSDoc
   grep -n "^export" packages/<pkg>/src/index.ts
   ```
   Use the `update-index-exports` skill if exports are missing.
2. Verify new or changed functions have tests in `packages/<pkg>/__tests__/`. A function is untested if no `describe('functionName')` or `it('...functionName...')` block exists for it.
3. Run tests and confirm they pass:
   - `npm run test` for all packages
   - `TEST_API=<package> npm run test` for a specific package
4. If docs output is required, suggest `npm run docs` or use the `sync-docs` skill.
