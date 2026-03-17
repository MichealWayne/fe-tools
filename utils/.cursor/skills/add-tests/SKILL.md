---
name: add-tests
description: Add or update Jest unit tests for fe-tools utilities. Use when new functions are added, existing behavior changes, or the user asks to补测试/add tests across utils, web-utils, node-utils, canvas-utils, or ai-utils.
---
# Add Tests

## Workflow
1. Identify the target package under `packages/`:
   - General-purpose helpers -> `packages/utils`
   - Browser-only APIs -> `packages/web-utils`
   - Node-only APIs -> `packages/node-utils`
   - Canvas helpers -> `packages/canvas-utils`
   - AI/ML helpers -> `packages/ai-utils`
2. Find or create a test file in `packages/<pkg>/__tests__/`.
3. Follow the naming pattern:
   - `describe('functionName', () => { it('should ...') })`
4. Cover at least:
   - Common expected behavior
   - Edge cases / boundary values
   - Error or invalid input behavior (if applicable)
5. Use deterministic inputs and avoid external I/O unless required.
6. Suggest running focused tests:
   - `TEST_API=<package> npm run test`
