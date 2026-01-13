/**
 * @fileoverview Terminal color utilities for Node.js console output, providing ANSI color codes and formatting functions for enhanced terminal display.
 *
 * This module provides comprehensive terminal color support using ANSI escape codes.
 * It includes foreground colors, background colors, text formatting options, and utility functions
 * for creating colored console output in Node.js applications.
 *
 * @module Colors
 * @author Wayne
 * @since 1.0.0
 */
declare const _default: {
    colors: {
        end: string;
        Reset: string;
        Bright: string;
        Dim: string;
        Underscore: string;
        Blink: string;
        Reverse: string;
        Hidden: string;
        FgBlack: string;
        FgRed: string;
        FgGreen: string;
        FgYellow: string;
        FgBlue: string;
        FgMagenta: string;
        FgCyan: string;
        FgWhite: string;
        BgBlack: string;
        BgRed: string;
        BgGreen: string;
        BgYellow: string;
        BgBlue: string;
        BgMagenta: string;
        BgCyan: string;
        BgWhite: string;
    };
    get: (type: string) => string;
};
export default _default;
