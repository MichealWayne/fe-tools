/**
 * @fileoverview Template application utilities for dynamic prompt generation with placeholder replacement and validation.
 *
 * This module provides template processing capabilities for AI prompt generation.
 * It includes functions for replacing placeholders in template strings, validating
 * template syntax, and ensuring proper formatting for AI language model interactions.
 *
 * @module ApplyTemplate
 * @author Wayne
 * @since 1.0.0
 */
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
/**
 * Replaces placeholders in a template string with provided values.
 *
 * @param {string} template The template string containing placeholders like {{key}}.
 * @param {Record<string, string>} replacements An object mapping placeholder keys to their replacement values.
 * @returns {string} The template string with placeholders replaced by their corresponding values.
 *
 * @example
 * const template = "Hello, {{name}}!";
 * const result = applyTemplate(template, { name: "World" });
 * console.log(result); // Output: "Hello, World!"
 */
export function applyTemplate(template, replacements) {
    var e_1, _a;
    // Basic validation
    if (typeof template !== 'string') {
        console.error('Template must be a string.');
        return '';
    }
    if (!replacements || typeof replacements !== 'object') {
        console.error('Replacements must be a valid object.');
        return template; // Return template as is if replacements are invalid
    }
    var result = template;
    try {
        for (var _b = __values(Object.entries(replacements)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
            // Create a regex to find all instances of {{key}}
            // 'g' flag for global replacement, 's' flag for dotAll (if needed, though not critical here)
            var regex = new RegExp("{{".concat(key, "}}"), 'g');
            result = result.replace(regex, value);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
}
