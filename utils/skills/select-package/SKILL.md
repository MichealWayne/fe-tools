---
name: select-package
description: "Choose the correct fe-tools package for new functionality. Analyzes function requirements, reviews package responsibilities, and recommends the appropriate target package. Use when the user asks to add a function, create a new feature, or is unsure which package to use, where to add code, or which fe-tools module to target."
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

### Examples
| Requirement | Package |
|---|---|
| Format a date string | `packages/utils` |
| Read a config file from disk | `packages/node-utils` |
| Detect browser viewport size | `packages/web-utils` |
| Draw a rounded rectangle on canvas | `packages/canvas-utils` |
| Tokenize a prompt for an LLM | `packages/ai-utils` |
