/**
 * @module aiUtils
 * @author Wayne
 * @Date 2025-08-10
 * @LastEditTime 2025-08-10 15:02:13
 */

// In a real-world scenario, this might be loaded from a file or a more dynamic source.
// For simplicity in this utility library, we'll define it as a constant string.
// Placeholders like {{role}}, {{task_description}} are used for easy replacement.

export const STANDARD_PROMPT_TEMPLATE = `### Role ###
You are a {{role}}.

### Task ###
{{task_description}}

### Format ###
{{format_instructions}}

### Input ###
<input>
{{input_content}}
</input>

### Instructions ###
{{additional_instructions}}`;
