/**
 * @fileoverview Logging utilities for image processing operations
 * @description Provides structured logging with timestamps for tracking image processing
 * operations, errors, and success messages during batch processing workflows.
 * @since 1.0.0
 */

/**
 * @description Logging utility object with timestamped message formatting
 * @namespace log
 * @example
 * // Log processing information
 * log.info('Starting image conversion batch');
 *
 * @example
 * // Log errors during processing
 * try {
 *   await processImage();
 * } catch (error) {
 *   log.error(error);
 * }
 *
 * @example
 * // Log successful operations
 * log.success('All images converted successfully');
 */
export default {
  /**
   * @description Log informational messages with timestamp
   * @param {string} message - Information message to log
   * @returns {void}
   * @example
   * log.info('Processing 15 images in batch');
   * log.info(`Converting ${filename} to WebP format`);
   */
  info: (message: string): void => {
    console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
  },

  /**
   * @description Log error messages with timestamp and proper error handling
   * @param {string | Error} message - Error message or Error object to log
   * @returns {void}
   * @example
   * // Log string error message
   * log.error('Failed to read image directory');
   *
   * @example
   * // Log Error object
   * try {
   *   await processImage();
   * } catch (err) {
   *   log.error(err); // Automatically extracts error message
   * }
   */
  error: (message: string | Error): void => {
    console.error(
      `[ERROR] ${new Date().toISOString()}: ${message instanceof Error ? message.message : message}`
    );
  },

  /**
   * @description Log success messages with timestamp
   * @param {string} message - Success message to log
   * @returns {void}
   * @example
   * log.success('Image converted successfully to WebP');
   * log.success(`Generated 1x image: ${outputPath}`);
   */
  success: (message: string): void => {
    console.log(`[SUCCESS] ${new Date().toISOString()}: ${message}`);
  },
};
