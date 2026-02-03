---
name: verify-docs-tests
description: Verify documentation and tests in fe-tools. Use when the user asks to检查文档和测试, verify docs/tests, or ensure exports and docs are aligned.
---
# Verify Docs and Tests

## Workflow
1. Check that exported APIs in `packages/*/src/index.ts` match documentation expectations.
2. Verify new or changed functions have tests in `packages/*/__tests__/`.
3. Suggest running tests:
   - `npm run test` for all packages
   - `TEST_API=<package> npm run test` for a specific package
4. If docs output is required, suggest `npm run docs`.
