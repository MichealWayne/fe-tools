---
name: bilingual-jsdoc
description: Write or update bilingual (Chinese + English) JSDoc for exported functions in fe-tools. Use when the user asks for documentation updates, JSDoc fixes, or when adding/modifying utilities.
---
# Bilingual JSDoc

## Workflow
1. Open the target module file and locate the exported function.
2. Write JSDoc in the required format:
   - Chinese description, then English description
   - `@param` lines with Chinese and English descriptions
   - `@returns` line with return description
   - At least two `@example` blocks (common case + edge case)
3. Ensure types in JSDoc match the TypeScript signature.
4. Keep wording concise and consistent with existing style.
