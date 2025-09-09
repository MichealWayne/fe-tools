/**
 * @fileoverview Image file discovery and filtering utilities
 * @description Provides functions to scan directories for image files with flexible filtering options.
 * Supports retina image detection, recursive scanning, and custom file extension filtering.
 * @author Wayne
 * @since 1.0.0
 */

import fs from 'fs';
import path from 'path';

/** @description Regular expression for detecting common image file extensions */
const IMG_REG = /\.(jpg|gif|jpeg|png|webp|bmp)+$/i;

/**
 * @description Options for configuring image list generation
 * @interface ImageListOptions
 */
export interface ImageListOptions {
  /**
   * @description Only include retina (2x) images in results
   * Files must contain '_2x.' in their filename to be included
   * @default false
   */
  only2x?: boolean;
  /**
   * @description Include all images regardless of retina status
   * Overrides the only2x option when true
   * @default false
   */
  includeAllImages?: boolean;
  /**
   * @description Array of specific file extensions to include
   * Extensions can be provided with or without leading dots
   * @example ['jpg', 'png'] or ['.jpg', '.png']
   */
  extensions?: string[];
  /**
   * @description Enable recursive search in subdirectories
   * When true, scans all nested folders for images
   * @default false
   */
  recursive?: boolean;
}

/**
 * @description Check if a file is an image based on its extension
 * @param {string} filename - File name to check for image extension
 * @param {string[]} [extensions] - Optional array of specific extensions to filter by
 * @returns {boolean} True if the file is recognized as an image format
 * @example
 * // Check with default image extensions
 * isImage('photo.jpg'); // true
 * isImage('document.pdf'); // false
 *
 * @example
 * // Check with custom extensions
 * isImage('image.tiff', ['tiff', 'raw']); // true
 * isImage('image.jpg', ['png']); // false
 */
function isImage(filename: string, extensions?: string[]): boolean {
  if (typeof filename !== 'string') {
    return false;
  }

  if (extensions && extensions.length > 0) {
    return extensions.some(ext =>
      filename
        .toLowerCase()
        .endsWith(ext.toLowerCase().startsWith('.') ? ext.toLowerCase() : `.${ext.toLowerCase()}`)
    );
  }

  return IMG_REG.test(filename);
}

/**
 * @description Check if a file is a retina (2x) image based on naming convention
 * @param {string} filename - File name to check for 2x designation
 * @returns {boolean} True if filename contains '_2x.' indicating retina resolution
 * @example
 * is2xImage('icon_2x.png'); // true
 * is2xImage('icon.png'); // false
 * is2xImage('photo_2x.jpg'); // true
 */
function is2xImage(filename: string): boolean {
  return filename.includes('_2x.');
}

/**
 * @description Get a list of image files from a directory with flexible filtering options
 * @param {string} imgFolderPath - Path to the directory containing images
 * @param {ImageListOptions} [options={}] - Configuration options for filtering and scanning
 * @returns {string[]} Array of image filenames matching the specified criteria
 * @throws {Error} Logs error to console if directory cannot be read (returns empty array)
 * @example
 * // Get all images from a directory
 * const allImages = getImgList('./assets');
 *
 * @example
 * // Get only retina (2x) images
 * const retinaImages = getImgList('./assets', { only2x: true });
 *
 * @example
 * // Recursive search with specific extensions
 * const pngImages = getImgList('./src', {
 *   recursive: true,
 *   extensions: ['png', 'webp']
 * });
 *
 * @example
 * // Complex filtering for production assets
 * const productionImages = getImgList('./assets', {
 *   recursive: true,
 *   extensions: ['jpg', 'png', 'webp'],
 *   includeAllImages: true
 * });
 */
function getImgList(imgFolderPath: string, options: ImageListOptions = {}): string[] {
  const imgArr: string[] = [];
  const { only2x = false, includeAllImages = false, extensions = [], recursive = false } = options;

  if (!imgFolderPath || !fs.existsSync(imgFolderPath)) {
    console.error(`Directory not found: ${imgFolderPath}`);
    return imgArr;
  }

  function processDirectory(dirPath: string, relativePath = '') {
    try {
      const files = fs.readdirSync(dirPath, 'utf-8');

      for (const item of files) {
        const fullPath = path.join(dirPath, item);
        const relativeItemPath = path.join(relativePath, item);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory() && recursive) {
          processDirectory(fullPath, relativeItemPath);
          continue;
        }

        if (!isImage(item, extensions)) {
          continue;
        }

        const is2x = is2xImage(item);

        if (includeAllImages || !only2x || (only2x && is2x)) {
          if (!imgArr.includes(relativeItemPath)) {
            imgArr.push(relativePath ? relativeItemPath : item);
          }
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dirPath}:`, error);
    }
  }

  processDirectory(imgFolderPath);
  return imgArr;
}

export default getImgList;
