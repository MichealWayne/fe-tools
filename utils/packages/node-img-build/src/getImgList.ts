/**
 * @author Wayne
 * @Date 2021-04-27 14:47:13
 * @LastEditTime 2023-10-22 10:40:59
 */
import fs from 'fs';
import path from 'path';

const IMG_REG = /\.(jpg|gif|jpeg|png|webp|bmp)+$/i;

export interface ImageListOptions {
  /** Only include 2x images */
  only2x?: boolean;
  /** Include all images (not just 2x) */
  includeAllImages?: boolean;
  /** Include specific extensions only */
  extensions?: string[];
  /** Recursive search in subdirectories */
  recursive?: boolean;
}

/**
 * Check if a file is an image based on its extension
 * @param filename - File name to check
 * @param extensions - Optional list of extensions to filter by
 * @returns boolean
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
 * Check if a file is a 2x image
 * @param filename - File name to check
 * @returns boolean
 */
function is2xImage(filename: string): boolean {
  return filename.includes('_2x.');
}

/**
 * Get a list of image files from a directory
 * @param imgFolderPath - Path to the directory containing images
 * @param options - Options for filtering images
 * @returns Array of image filenames
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
