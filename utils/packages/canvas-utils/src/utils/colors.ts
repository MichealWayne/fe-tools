/**
 * @fileoverview Color manipulation utilities for canvas applications, including hex to RGB conversion, RGBA generation, and color lightening functions.
 *
 * This module provides comprehensive color handling functions for canvas-based applications.
 * It supports both standard (#RRGGBB) and shorthand (#RGB) hexadecimal color formats,
 * and includes utilities for creating RGBA colors, detecting transparency, and generating lighter color variants.
 *
 * @module Colors
 * @author Wayne
 * @since 1.0.0
 */

/**
 * @function getColorRgbList
 * @description hex色值转rgb数组。Converts hexadecimal color strings to RGB number arrays. Supports both standard (#RRGGBB) and shorthand (#RGB) formats. Invalid color formats return an empty array.
 * @param {string} color - Hexadecimal color string (e.g., '#ff0000', '#f00')
 * @returns {number[]} Array of RGB values [red, green, blue] where each value is 0-255, or empty array if invalid
 * @example
 * // Standard hex format
 * const red = getColorRgbList('#ff0000');     // Returns [255, 0, 0]
 * const blue = getColorRgbList('#0000FF');    // Returns [0, 0, 255]
 * const custom = getColorRgbList('#aaBB99');  // Returns [170, 187, 153]
 *
 * @example
 * // Shorthand hex format
 * const red = getColorRgbList('#f00');        // Returns [255, 0, 0]
 * const green = getColorRgbList('#0f0');      // Returns [0, 255, 0]
 * const gray = getColorRgbList('#abc');       // Returns [170, 187, 204]
 *
 * @example
 * // Canvas color application
 * function setCanvasColor(ctx, hexColor) {
 *   const [r, g, b] = getColorRgbList(hexColor);
 *   if (r !== undefined) {
 *     ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
 *     ctx.fillRect(0, 0, 100, 100);
 *   } else {
 *     console.error('Invalid color format');
 *   }
 * }
 *
 * @example
 * // Error handling
 * const invalid = getColorRgbList('invalid');  // Returns []
 * const missing = getColorRgbList('#gg0000'); // Returns []
 *
 * @since 1.0.0
 * @see {@link getColorRgba} - For converting to RGBA format
 */
export function getColorRgbList(color: string): number[] {
  // 校验并处理颜色代码的正则表达式，支持简写形式
  const reg = /^#([0-9a-fA-F]{3}){1,2}$/;
  if (!reg.test(color)) {
    return [];
  }

  // 如果是简写形式，将其转换为完整形式
  const colorFormatted = color.length === 4 ? color.replace(/([0-9a-fA-F])/g, '$1$1') : color;

  // 提取并转换颜色值
  return (
    colorFormatted
      .substring(1)
      .match(/.{2}/g)
      ?.map(hex => parseInt(hex, 16)) || []
  );
}

/**
 * @function getColorRgba
 * @description 十六进制颜色转rgba。Converts hexadecimal color strings to RGBA format strings with customizable opacity. Handles both standard and shorthand hex formats, with fallback to transparent black for invalid colors.
 * @param {string} str - hex格式颜色。Hexadecimal color string (e.g., '#ff0000', '#f00')
 * @param {number} [opacity=1] - 透明度。Opacity value between 0 (transparent) and 1 (opaque)
 * @returns {string} RGBA color string in format 'rgba(r,g,b,a)' or 'rgba(0,0,0,0)' for invalid colors
 * @example
 * // Basic RGBA conversion
 * const red = getColorRgba('#f00');           // Returns 'rgba(255,0,0,1)'
 * const blue = getColorRgba('#0000FF');       // Returns 'rgba(0,0,255,1)'
 * const green = getColorRgba('#00ff00');      // Returns 'rgba(0,255,0,1)'
 *
 * @example
 * // Custom opacity
 * const semiRed = getColorRgba('#f00', 0.5);     // Returns 'rgba(255,0,0,0.5)'
 * const faintBlue = getColorRgba('#0000FF', 0.1); // Returns 'rgba(0,0,255,0.1)'
 * const transparent = getColorRgba('#fff', 0);    // Returns 'rgba(255,255,255,0)'
 *
 * @example
 * // Canvas gradient creation
 * function createGradient(ctx, startColor, endColor, opacity = 1) {
 *   const gradient = ctx.createLinearGradient(0, 0, 200, 0);
 *   gradient.addColorStop(0, getColorRgba(startColor, opacity));
 *   gradient.addColorStop(1, getColorRgba(endColor, opacity));
 *   return gradient;
 * }
 *
 * const gradient = createGradient(ctx, '#ff0000', '#0000ff', 0.8);
 * ctx.fillStyle = gradient;
 *
 * @example
 * // Animation color transitions
 * function animateColorOpacity(hexColor, progress) {
 *   const opacity = Math.sin(progress * Math.PI); // Fade in and out
 *   return getColorRgba(hexColor, opacity);
 * }
 *
 * // In animation loop
 * ctx.fillStyle = animateColorOpacity('#ff6600', animationProgress);
 *
 * @example
 * // Error handling
 * const invalid = getColorRgba('invalid');     // Returns 'rgba(0,0,0,0)'
 * const badHex = getColorRgba('#gggggg');      // Returns 'rgba(0,0,0,0)'
 *
 * @since 1.0.0
 * @see {@link getColorRgbList} - For getting RGB array values
 * @see {@link isTransparentColor} - For checking if a color is transparent
 */
export function getColorRgba(str: string, opacity = 1): string {
  const colorList = getColorRgbList(str);
  const isLegalColor = colorList.length === 3;

  return `rgba(${isLegalColor ? colorList.join(',') : '0,0,0'},${isLegalColor ? opacity : 0})`;
}

/**
 * @function isTransparentColor
 * @description 是否为透明色。Determines if a color string represents a transparent color by checking if the alpha value is 0. Works with RGBA color strings and handles various formatting.
 * @param {string} colorStr - 颜色字符串。Color string to check (typically RGBA format)
 * @returns {boolean} 返回当前颜色是否为透明色。True if the color is transparent (alpha = 0), false otherwise
 * @example
 * // Transparent colors
 * const transparent1 = isTransparentColor('rgba(255,0,0,0)');      // Returns true
 * const transparent2 = isTransparentColor('rgba(0, 255, 0, 0)');   // Returns true (with spaces)
 * const transparent3 = isTransparentColor('rgba(100,100,100,0)');  // Returns true
 *
 * @example
 * // Opaque colors
 * const opaque1 = isTransparentColor('rgba(255,0,0,1)');           // Returns false
 * const opaque2 = isTransparentColor('rgba(0,0,255,0.5)');         // Returns false
 * const opaque3 = isTransparentColor(getColorRgba('#f00'));        // Returns false
 *
 * @example
 * // Invalid or empty strings
 * const empty = isTransparentColor('');                            // Returns false
 * const invalid = isTransparentColor('not-a-color');              // Returns false
 * const rgb = isTransparentColor('rgb(255,0,0)');                 // Returns false (no alpha)
 *
 * @example
 * // Canvas rendering optimization
 * function drawElement(ctx, color, x, y, width, height) {
 *   if (isTransparentColor(color)) {
 *     console.log('Skipping transparent element');
 *     return; // Skip rendering transparent elements for performance
 *   }
 *
 *   ctx.fillStyle = color;
 *   ctx.fillRect(x, y, width, height);
 * }
 *
 * @example
 * // Layer visibility check
 * const layers = [
 *   { color: 'rgba(255,0,0,1)', visible: true },
 *   { color: 'rgba(0,255,0,0)', visible: true },
 *   { color: 'rgba(0,0,255,0.5)', visible: true }
 * ];
 *
 * const visibleLayers = layers.filter(layer =>
 *   layer.visible && !isTransparentColor(layer.color)
 * );
 *
 * @since 1.0.0
 * @see {@link getColorRgba} - For creating RGBA color strings
 */
export function isTransparentColor(colorStr: string): boolean {
  if (!colorStr) return false;
  return colorStr.replace(/\s/g, '').slice(-2) === '0)';
}

/**
 * @function getLightfulRgbList
 * @description 十六进制颜色变浅（亮色）。Creates a lighter version of a hexadecimal color by increasing the RGB values proportionally. The lightening effect is achieved by adding a percentage of each color component's current value, with a maximum cap of 255.
 * @param {string} color - hex颜色字符串。Hexadecimal color string (e.g., '#ff0000', '#f00')
 * @param {number} [weight=0] - 增量权重（0～1）。Lightening weight factor (0 = no change, 1 = maximum lightening)
 * @returns {number[]} 增量后的rgb颜色数组。Array of lightened RGB values [red, green, blue] where each value is 0-255
 * @example
 * // No lightening (weight = 0)
 * const original1 = getLightfulRgbList('#f00');        // Returns [255, 0, 0] (unchanged)
 * const original2 = getLightfulRgbList('#0000FF');     // Returns [0, 0, 255] (unchanged)
 *
 * @example
 * // Moderate lightening
 * const lighter1 = getLightfulRgbList('#f00', 0.5);    // Returns [255, 128, 128]
 * const lighter2 = getLightfulRgbList('#0066cc', 0.3); // Returns [0, 102, 224]
 *
 * @example
 * // Maximum lightening
 * const lightest = getLightfulRgbList('#800080', 1);    // Returns [255, 128, 255]
 *
 * @example
 * // Canvas hover effects
 * function drawButton(ctx, baseColor, isHovered) {
 *   const [r, g, b] = isHovered
 *     ? getLightfulRgbList(baseColor, 0.3)  // Lighter on hover
 *     : getColorRgbList(baseColor);         // Normal color
 *
 *   ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
 *   ctx.fillRect(10, 10, 100, 40);
 * }
 *
 * @example
 * // Creating color palettes
 * const baseColor = '#3366cc';
 * const palette = [0, 0.2, 0.4, 0.6, 0.8].map(weight => {
 *   const [r, g, b] = getLightfulRgbList(baseColor, weight);
 *   return `rgb(${r}, ${g}, ${b})`;
 * });
 * // Creates: ['rgb(51,102,204)', 'rgb(61,122,224)', ...]
 *
 * @example
 * // Chart series with related colors
 * const seriesColors = ['#ff0000', '#00ff00', '#0000ff'];
 * const lightVariants = seriesColors.map(color => {
 *   const [r, g, b] = getLightfulRgbList(color, 0.4);
 *   return `rgb(${r}, ${g}, ${b})`;
 * });
 *
 * @since 1.0.0
 * @see {@link getColorRgbList} - For basic hex to RGB conversion
 * @see {@link getColorRgba} - For creating RGBA strings with the lightened colors
 */
export function getLightfulRgbList(color: string, weight = 0): number[] {
  return getColorRgbList(color).map(data => Math.min(255, data + Math.round(data * weight)));
}
