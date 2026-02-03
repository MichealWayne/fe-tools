---
name: select-package
description: Choose the correct fe-tools package for new functionality. Use when the user asks to add a function but the target package is unclear.
---
# Select Package

## Workflow
1. Classify the requirement by runtime and domain:
   - General-purpose, environment-agnostic logic -> `packages/utils`
   - Browser-only APIs or DOM usage -> `packages/web-utils`
   - Node-only APIs (fs, process, path, http) -> `packages/node-utils`
   - Canvas 2D rendering or canvas math helpers -> `packages/canvas-utils`
   - AI/ML or prompt/model helpers -> `packages/ai-utils`
   - Node image processing workflows -> `packages/node-img-build`
2. If the request spans multiple runtimes, split into separate functions per package.
3. State the selection explicitly before coding.
