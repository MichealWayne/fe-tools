/**
 * @fileoverview Configuration settings for image processing operations
 * @description Provides default settings for image quality, blur effects, and processing parameters.
 * These settings can be modified at runtime to customize image processing behavior.
 * @author Wayne
 * @since 1.0.0
 */

/**
 * @description Configuration interface for image processing settings
 * @interface ImageConfig
 */
export interface ImageConfig {
  /**
   * @description Default blur effect settings for image processing
   * @property {number} color - Number of colors to preserve in blurred image (1-256, default: 8)
   * @property {number} radius - Blur radius in pixels (default: 7)
   * @property {number} sigma - Blur sigma value for Gaussian blur (default: 3)
   */
  blur: {
    color: number;
    radius: number;
    sigma: number;
  };
  /**
   * @description Default image quality for JPEG and similar formats (0-100, default: 90)
   * Higher values produce better quality but larger file sizes
   */
  quality: number;
  /**
   * @description Default WebP output quality (0-100, default: 80)
   * WebP typically achieves good quality at lower values than JPEG
   */
  webpQuality: number;
  /**
   * @description Base directory path for image operations
   * Used as fallback when relative paths are provided
   */
  dirname: string;
}

/**
 * @description Default configuration object for image processing operations
 * @type {ImageConfig}
 * @example
 * // Use default settings
 * import config from './config';
 * console.log(config.quality); // 90
 *
 * @example
 * // Modify settings at runtime
 * config.quality = 95; // Higher quality output
 * config.webpQuality = 85; // Better WebP quality
 * config.blur.radius = 10; // Stronger blur effect
 *
 * @example
 * // Custom blur settings for artistic effects
 * config.blur = {
 *   color: 16,    // More colors preserved
 *   radius: 15,   // Larger blur radius
 *   sigma: 8      // Stronger blur intensity
 * };
 */
const config: ImageConfig = {
  blur: {
    color: 8, // Preserve 8 colors in blur effect
    radius: 7, // 7-pixel blur radius
    sigma: 3, // Gaussian blur sigma
  },
  quality: 90, // 90% quality for standard formats
  webpQuality: 80, // 80% quality for WebP (good balance)
  dirname: __dirname, // Current module directory
};

export default config;
