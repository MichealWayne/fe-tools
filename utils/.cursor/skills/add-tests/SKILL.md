---
name: add-tests
description: "Add or update Jest unit tests for fe-tools utilities. Writes test cases, verifies coverage for common behavior, edge cases, and error inputs. Use when new functions are added, existing behavior changes, or the user asks to add tests across utils, web-utils, node-utils, canvas-utils, or ai-utils."
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
   ```ts
   describe('isValidEmail', () => {
     it('should return true for valid emails', () => {
       expect(isValidEmail('user@example.com')).toBe(true);
     });
     it('should return false for invalid formats', () => {
       expect(isValidEmail('not-an-email')).toBe(false);
     });
     it('should handle empty string', () => {
       expect(isValidEmail('')).toBe(false);
     });
   });
   ```
4. Cover at least:
   - Common expected behavior
   - Edge cases / boundary values
   - Error or invalid input behavior (if applicable)
5. Use deterministic inputs and avoid external I/O unless required.
6. Run tests and verify they pass before committing: `TEST_API=<package> npm run test`.
