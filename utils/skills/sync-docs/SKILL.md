---
name: sync-docs
description: Regenerate or verify documentation for fe-tools. Use when the user asks to update docs, generate TypeDoc output, or verify documentation alignment.
---
# Sync Docs

## Workflow
1. Ensure exported APIs are correct in `packages/*/src/index.ts`.
2. Run `npm run docs` to generate TypeDoc output.
3. If docs errors occur, fix the first reported issue and re-run.
