/**
 * @fileoverview Node.js image processing utilities using GraphicsMagick
 * @description Provides comprehensive image manipulation capabilities including format conversion,
 * resizing, blurring, and retina image processing. Supports common formats like JPEG, PNG, WebP, and more.
 * @author Wayne
 * @since 1.0.0
 */

import getImgList, { ImageListOptions } from './getImgList';
import {
  getGmStream,
  toWebpImg,
  toBlurImg,
  toBase64,
  resizeImg,
  generate1xFrom2x,
  BlurOptions,
  WebpOptions,
} from './handleImg';
import config, { ImageConfig } from './config';

// Re-export all types for external use
export { ImageListOptions, BlurOptions, WebpOptions, ImageConfig };

/**
 * @description Main image processing API providing comprehensive image manipulation utilities
 * @example
 * // Basic usage - get image list and convert to WebP
 * import imageUtils from '@i-utils/node-img-build';
 *
 * const images = imageUtils.getImgList('./images', { only2x: true });
 * await imageUtils.toWebpImg('./images', 'photo_2x.jpg', './output', { quality: 85 });
 *
 * @example
 * // Generate 1x images from 2x retina images
 * const images = imageUtils.getImgList('./assets', { only2x: true });
 * for (const img of images) {
 *   await imageUtils.generate1xFrom2x('./assets', img, './output');
 * }
 */
export default {
  /**
   * @description Get a list of image files from a directory with flexible filtering options
   * @param {string} imgFolderPath - Path to the directory containing images
   * @param {ImageListOptions} [options] - Options for filtering and processing images
   * @returns {string[]} Array of image filenames matching the specified criteria
   * @example
   * // Get all 2x retina images
   * const retina = getImgList('./images', { only2x: true });
   *
   * // Get all images recursively with specific extensions
   * const pngs = getImgList('./assets', {
   *   recursive: true,
   *   extensions: ['png', 'jpg']
   * });
   */
  getImgList,

  /**
   * @description Get image as GraphicsMagick stream for advanced processing
   * @param {string} filePath - Directory containing the image
   * @param {string} imgName - Image filename
   * @returns {Promise<{data: gmConstructor.ImageInfo, gmStream: gmConstructor.State}>} Image info and GM stream
   * @throws {Error} When image file is not found or cannot be processed
   * @example
   * const { data, gmStream } = await getGmStream('./images', 'photo.jpg');
   * console.log(`Image size: ${data.size.width}x${data.size.height}`);
   */
  getGmStream,

  /**
   * @description Convert image to WebP format with quality optimization
   * @param {string} filePath - Directory containing the source image
   * @param {string} imgName - Source image filename
   * @param {string} outPath - Output directory for WebP file
   * @param {WebpOptions} [options] - WebP conversion options including quality settings
   * @returns {Promise<string>} Path to the generated WebP file
   * @throws {Error} When conversion fails or directories are inaccessible
   * @example
   * // Convert with default quality (80)
   * await toWebpImg('./src', 'photo_2x.jpg', './dist');
   *
   * // Convert with custom quality
   * await toWebpImg('./src', 'image.png', './dist', { quality: 90 });
   */
  toWebpImg,

  /**
   * @description Generate blurred version of image using GraphicsMagick
   * @param {gmConstructor.State} gmStream - GraphicsMagick image stream
   * @param {BlurOptions} [options] - Blur configuration including radius and sigma
   * @returns {gmConstructor.State | false} Blurred GM stream or false if processing fails
   * @example
   * const { gmStream } = await getGmStream('./images', 'photo.jpg');
   * const blurred = toBlurImg(gmStream, { blurRadius: 10, blurSigma: 5 });
   */
  toBlurImg,

  /**
   * @description Convert image to base64 data URI string
   * @param {gmConstructor.State} gmStream - GraphicsMagick image stream
   * @param {string} [type='jpg'] - Output image format (jpg, png, webp, etc.)
   * @returns {Promise<string>} Base64 string with data URI prefix
   * @throws {Error} When conversion fails or invalid stream provided
   * @example
   * const { gmStream } = await getGmStream('./images', 'photo.jpg');
   * const dataUri = await toBase64(gmStream, 'png');
   * // Returns: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
   */
  toBase64,

  /**
   * @description Resize image to specified dimensions
   * @param {gmConstructor.State} gmStream - GraphicsMagick image stream
   * @param {number} width - Target width in pixels
   * @param {number} [height] - Target height in pixels (maintains aspect ratio if omitted)
   * @returns {gmConstructor.State | false} Resized GM stream or false if processing fails
   * @example
   * const { gmStream } = await getGmStream('./images', 'photo.jpg');
   * const resized = resizeImg(gmStream, 800, 600); // Exact dimensions
   * const proportional = resizeImg(gmStream, 800); // Maintain aspect ratio
   */
  resizeImg,

  /**
   * @description Generate standard resolution (1x) image from retina (2x) image
   * @param {string} filePath - Directory containing the 2x image
   * @param {string} imgName - 2x image filename (must contain '_2x.')
   * @param {string} outPath - Output directory for 1x image
   * @returns {Promise<string>} Path to the generated 1x image file
   * @throws {Error} When image name doesn't contain '_2x.' or processing fails
   * @example
   * // Generate 1x from 2x retina image
   * await generate1xFrom2x('./assets', 'icon_2x.png', './dist');
   * // Creates: ./dist/icon.png (half the dimensions)
   */
  generate1xFrom2x,

  /**
   * @description Global configuration object for default image processing settings
   * @type {ImageConfig} Configuration including blur settings, quality, and paths
   * @example
   * // Access default settings
   * console.log(config.quality); // 90
   * console.log(config.webpQuality); // 80
   *
   * // Modify global settings
   * config.quality = 95;
   * config.blur.radius = 10;
   */
  config,
};
