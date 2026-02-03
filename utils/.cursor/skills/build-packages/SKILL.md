---
name: build-packages
description: Build the fe-tools monorepo packages. Use when the user asks to构建/build/compile, or to verify TypeScript compilation.
---
# Build Packages

## Workflow
1. Run the standard build command: `npm run build`.
2. If build fails, identify the first error, summarize the cause, and propose minimal fixes.
3. Re-run the build after applying fixes.
