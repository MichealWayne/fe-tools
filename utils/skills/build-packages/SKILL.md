---
name: build-packages
description: "Build the fe-tools monorepo packages. Runs TypeScript compilation across all packages and resolves build errors. Use when the user asks to build, compile, verify TypeScript compilation, or check for type errors."
---
# Build Packages

## Workflow
1. Run the standard build command: `npm run build`.
2. If build fails, identify the first error, summarize the cause, and propose minimal fixes. Common issues:
   - Missing export: add the missing `export` statement in `src/index.ts`
   - Type mismatch: align the function signature with its JSDoc or callers
   - Import not found: check the module path and package name spelling
3. Re-run the build after applying fixes.
4. Verify build completes with exit code 0 and no error output before considering the task complete.
