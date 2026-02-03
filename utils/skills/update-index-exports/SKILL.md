---
name: update-index-exports
description: Update package exports in fe-tools. Use when a new function/module is added and `src/index.ts` needs to expose it, or when export lists need cleanup.
---
# Update Index Exports

## Workflow
1. Identify the package under `packages/` that owns the new module.
2. Open `packages/<pkg>/src/index.ts`.
3. Add or update exports for the new module/function.
4. Avoid duplicate exports and keep ordering consistent with the file.
5. If a new module was added, ensure it has tests in `packages/<pkg>/__tests__/`.
