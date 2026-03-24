---
name: bilingual-jsdoc
description: "Write or update bilingual (Chinese + English) JSDoc for exported functions in fe-tools. Use when the user asks for documentation updates, JSDoc fixes, or when adding/modifying utilities in utils, web-utils, node-utils, canvas-utils, or ai-utils."
---
# Bilingual JSDoc

## Workflow
1. Confirm which package the function belongs to (utils/web-utils/node-utils/canvas-utils/ai-utils) and open the target module file.
2. Write JSDoc in the required format:
   ```ts
   /**
    * 深拷贝对象或数组
    * Deep clone an object or array.
    * @param source - 要拷贝的源对象 / source object to clone
    * @returns 深拷贝后的新对象 / a new deep-cloned object
    * @example
    * deepClone({ a: 1, b: { c: 2 } }); // { a: 1, b: { c: 2 } }
    * @example
    * deepClone([]); // []
    */
   ```
   Rules:
   - Chinese description first, then English description
   - `@param` lines with Chinese and English descriptions separated by `/`
   - `@returns` line with return description
   - At least two `@example` blocks (common case + edge case)
3. Ensure types in JSDoc match the TypeScript signature.
4. Verify types compile: `npx tsc --noEmit --project packages/<pkg>/tsconfig.json`.
