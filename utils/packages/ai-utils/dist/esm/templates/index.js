/**
 * @fileoverview Standard prompt templates for AI language model interactions with structured formatting and placeholder support.
 *
 * This module provides reusable prompt templates for consistent AI interactions.
 * It includes standardized templates with placeholder variables for role-based prompts,
 * task descriptions, format instructions, and input content organization.
 *
 * @module Templates
 * @author Wayne
 * @since 1.0.0
 */
// In a real-world scenario, this might be loaded from a file or a more dynamic source.
// For simplicity in this utility library, we'll define it as a constant string.
// Placeholders like {{role}}, {{task_description}} are used for easy replacement.
export var STANDARD_PROMPT_TEMPLATE = "### Role ###\nYou are a {{role}}.\n\n### Task ###\n{{task_description}}\n\n### Format ###\n{{format_instructions}}\n\n### Input ###\n<input>\n{{input_content}}\n</input>\n\n### Instructions ###\n{{additional_instructions}}";
