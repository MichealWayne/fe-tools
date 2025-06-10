/**
 * @author Wayne
 * @Date 2021-04-27 14:47:13
 * @LastEditTime 2023-10-22 10:40:59
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

// Re-export all types
export { ImageListOptions, BlurOptions, WebpOptions, ImageConfig };

// Main API
export default {
  /**
   * Get a list of image files from a directory
   */
  getImgList,

  /**
   * Get image as GM stream
   */
  getGmStream,

  /**
   * Convert image to webp format
   */
  toWebpImg,

  /**
   * Generate blurred image
   */
  toBlurImg,

  /**
   * Convert image to base64
   */
  toBase64,

  /**
   * Resize image
   */
  resizeImg,

  /**
   * Generate 1x image from 2x image
   */
  generate1xFrom2x,

  /**
   * Global configuration
   */
  config,
};
