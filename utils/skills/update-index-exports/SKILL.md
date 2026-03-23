---
name: update-index-exports
description: "Update barrel exports in fe-tools package index files. Adds, removes, or reorders export statements in src/index.ts to expose the public API. Use when a new function or module is added, exports need cleanup, the user mentions barrel file, re-export, expose module, or public API for any fe-tools package."
---
# Update Index Exports

## Workflow
1. Identify the package under `packages/` that owns the new or changed module.
2. Open `packages/<pkg>/src/index.ts`.
3. Add or update exports for the new module/function. Use the existing style — typically:
   ```ts
   export { functionName } from './module';
   // or for full module re-export:
   export * from './module';
   ```
4. Avoid duplicate exports and keep ordering consistent with the file.
5. Verify the exports compile: `npm run build`.
