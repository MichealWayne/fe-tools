/**
 * @fileoverview Core image processing and manipulation functions
 * @description Provides comprehensive image processing capabilities using GraphicsMagick including
 * format conversion, resizing, blurring, and retina image generation. Supports all major image
 * formats with quality optimization and error handling.
 * @author Wayne
 * @since 1.0.0
 */

import path from 'path';
import fs from 'fs';
import gmConstructor from 'gm';

import config from './config';
import log from './log';

/** @description GraphicsMagick instance configured to use ImageMagick backend */
const gm = gmConstructor.subClass({ imageMagick: true });

/**
 * @description Configuration options for image blur effects
 * @interface BlurOptions
 */
export interface BlurOptions {
  /**
   * @description Number of colors to preserve in the blurred image (1-256)
   * Lower values create more posterized effects, higher values preserve detail
   * @default 8
   */
  color?: number;
  /**
   * @description Blur radius in pixels - controls the extent of the blur effect
   * Larger values create stronger blur but increase processing time
   * @default 7
   */
  blurRadius?: number;
  /**
   * @description Gaussian blur sigma value - controls blur intensity
   * Higher values create smoother, more pronounced blur effects
   * @default 3
   */
  blurSigma?: number;
}

/**
 * @description Configuration options for WebP format conversion
 * @interface WebpOptions
 */
export interface WebpOptions {
  /**
   * @description Quality level for WebP compression (0-100)
   * 0 = maximum compression/lowest quality, 100 = minimum compression/highest quality
   * WebP typically achieves good results at 80-90% quality
   * @default 80
   */
  quality?: number;
}

/**
 * @description Load an image file and create a GraphicsMagick stream for processing
 * @param {string} filePath - Directory path containing the image file
 * @param {string} imgName - Name of the image file to load
 * @returns {Promise<{data: gmConstructor.ImageInfo, gmStream: gmConstructor.State}>}
 *   Object containing image metadata and GM processing stream
 * @throws {Error} When image file is not found or cannot be processed by GraphicsMagick
 * @example
 * // Load image and get dimensions
 * const { data, gmStream } = await getGmStream('./images', 'photo.jpg');
 * console.log(`Image: ${data.size.width}x${data.size.height} pixels`);
 * console.log(`Format: ${data.format}, Quality: ${data.quality}`);
 *
 * @example
 * // Load image for further processing
 * const { gmStream } = await getGmStream('./assets', 'banner_2x.png');
 * const resized = gmStream.resize(800, 400);
 *
 * @since 1.0.0
 */
export function getGmStream(
  filePath: string,
  imgName: string
): Promise<{ data: gmConstructor.ImageInfo; gmStream: gmConstructor.State }> {
  const fullPath = path.join(filePath, imgName);

  // Check if file exists first
  if (!fs.existsSync(fullPath)) {
    return Promise.reject(new Error(`Image file not found: ${fullPath}`));
  }

  const gmInstance = gm(fullPath);

  return new Promise((resolve, reject) => {
    gmInstance.identify((err, data) => {
      if (err) {
        log.error(err);
        reject(err);
        return;
      }

      resolve({ data, gmStream: gmInstance });
    });
  });
}

/**
 * @description Convert an image to WebP format with automatic filename handling for retina images
 * @param {string} filePath - Directory path containing the source image
 * @param {string} imgName - Source image filename (supports retina '_2x.' naming)
 * @param {string} outPath - Output directory where WebP file will be saved
 * @param {WebpOptions} [options={}] - WebP conversion options including quality settings
 * @returns {Promise<string>} Promise resolving to the full path of the generated WebP file
 * @throws {Error} When source image cannot be read or WebP conversion fails
 * @example
 * // Convert regular image to WebP with default quality (80%)
 * const webpPath = await toWebpImg('./src/images', 'photo.jpg', './dist/images');
 * console.log(`WebP created: ${webpPath}`);
 *
 * @example
 * // Convert retina image with custom quality
 * await toWebpImg('./assets', 'hero_2x.png', './public', { quality: 90 });
 * // Creates: ./public/hero.webp (removes _2x from filename)
 *
 * @example
 * // Batch convert images with optimized quality for web
 * const images = ['banner.jpg', 'icon_2x.png', 'background.jpg'];
 * for (const img of images) {
 *   await toWebpImg('./src', img, './dist', { quality: 85 });
 * }
 *
 * @since 1.0.0
 */
export function toWebpImg(
  filePath: string,
  imgName: string,
  outPath: string,
  options: WebpOptions = {}
): Promise<string> {
  const { quality = config.webpQuality } = options;
  const webpPath = path.join(outPath, `${imgName.replace('_2x.', '.').split('.')[0]}.webp`);

  // Ensure output directory exists
  if (!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    gm(path.join(filePath, imgName))
      .setFormat('webp')
      .quality(quality)
      .write(webpPath, err => {
        if (err) {
          log.error(err);
          reject(err);
          return;
        }

        log.success(`Generated ${webpPath}`);
        resolve(webpPath);
      });
  });
}

/**
 * @description Apply blur effect to an image using GraphicsMagick processing
 * @param {gmConstructor.State} gmStream - GraphicsMagick image stream to process
 * @param {BlurOptions} [options={}] - Blur effect configuration options
 * @returns {gmConstructor.State | false} Modified GM stream with blur applied, or false if processing fails
 * @example
 * // Apply default blur effect
 * const { gmStream } = await getGmStream('./images', 'photo.jpg');
 * const blurred = toBlurImg(gmStream);
 *
 * @example
 * // Custom blur with artistic effect
 * const artisticBlur = toBlurImg(gmStream, {
 *   color: 16,        // Preserve more colors
 *   blurRadius: 15,   // Stronger blur
 *   blurSigma: 8      // Smoother effect
 * });
 *
 * @example
 * // Subtle blur for background images
 * const subtleBlur = toBlurImg(gmStream, {
 *   color: 32,        // High color preservation
 *   blurRadius: 3,    // Light blur
 *   blurSigma: 1      // Minimal sigma
 * });
 *
 * @since 1.0.0
 */
export function toBlurImg(
  gmStream: gmConstructor.State,
  options: BlurOptions = {}
): gmConstructor.State | false {
  if (!gmStream) {
    log.error('Invalid GM stream provided');
    return false;
  }

  const {
    color = config.blur.color,
    blurRadius = config.blur.radius,
    blurSigma = config.blur.sigma,
  } = options;

  return gmStream.colors(color).blur(blurRadius, blurSigma);
}

/**
 * @description Convert an image to base64 data URI string for embedding in HTML/CSS
 * @param {gmConstructor.State} gmStream - GraphicsMagick image stream to convert
 * @param {string} [type='jpg'] - Output image format (jpg, png, webp, gif, etc.)
 * @returns {Promise<string>} Promise resolving to base64 data URI string
 * @throws {Error} When GM stream is invalid or format conversion fails
 * @example
 * // Convert to base64 JPEG (default)
 * const { gmStream } = await getGmStream('./images', 'photo.jpg');
 * const dataUri = await toBase64(gmStream);
 * // Returns: "data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
 *
 * @example
 * // Convert to base64 PNG for transparency support
 * const pngDataUri = await toBase64(gmStream, 'png');
 * document.getElementById('img').src = pngDataUri;
 *
 * @example
 * // Convert processed image to base64 for CSS background
 * const resized = resizeImg(gmStream, 100, 100);
 * const base64 = await toBase64(resized, 'webp');
 * const css = `background-image: url(${base64})`;
 *
 * @since 1.0.0
 */
export function toBase64(gmStream: gmConstructor.State, type = 'jpg'): Promise<string> {
  if (!gmStream) {
    return Promise.reject(new Error('Invalid GM stream provided'));
  }

  return new Promise((resolve, reject) => {
    gmStream.toBuffer(type, (err, buffer) => {
      if (err) {
        log.error(err);
        reject(err);
        return;
      }

      const dataUri = `data:image/${type};base64,${buffer.toString('base64')}`;
      resolve(dataUri);
    });
  });
}

/**
 * @description Resize an image to specified dimensions with optional aspect ratio preservation
 * @param {gmConstructor.State} gmStream - GraphicsMagick image stream to resize
 * @param {number} width - Target width in pixels (must be positive integer)
 * @param {number} [height] - Target height in pixels (maintains aspect ratio if omitted)
 * @returns {gmConstructor.State | false} Resized GM stream or false if processing fails
 * @example
 * // Resize maintaining aspect ratio
 * const { gmStream } = await getGmStream('./images', 'photo.jpg');
 * const resized = resizeImg(gmStream, 800);
 * // Resizes to 800px width, height calculated proportionally
 *
 * @example
 * // Resize to exact dimensions (may distort image)
 * const exact = resizeImg(gmStream, 800, 600);
 * // Forces image to exactly 800x600 pixels
 *
 * @example
 * // Create thumbnail versions
 * const thumbnail = resizeImg(gmStream, 150, 150);
 * const medium = resizeImg(gmStream, 400);
 * const large = resizeImg(gmStream, 1200);
 *
 * @since 1.0.0
 */
export function resizeImg(
  gmStream: gmConstructor.State,
  width: number,
  height?: number
): gmConstructor.State | false {
  if (!gmStream) {
    log.error('Invalid GM stream provided');
    return false;
  }

  if (!width) {
    log.error('Width must be specified for resizing');
    return false;
  }

  if (height) {
    return gmStream.resize(width, height);
  }

  return gmStream.resize(width);
}

/**
 * @description Generate standard resolution (1x) image from retina resolution (2x) image
 * @param {string} filePath - Directory path containing the 2x source image
 * @param {string} imgName - Source image filename (must contain '_2x.' in the name)
 * @param {string} outPath - Output directory where 1x image will be saved
 * @returns {Promise<string>} Promise resolving to the full path of the generated 1x image
 * @throws {Error} When image name doesn't contain '_2x.', file not found, or processing fails
 * @example
 * // Generate 1x from retina image
 * const outputPath = await generate1xFrom2x('./assets', 'icon_2x.png', './dist');
 * // Creates: ./dist/icon.png (half the dimensions of icon_2x.png)
 *
 * @example
 * // Batch process all retina images
 * const retinaImages = getImgList('./src/images', { only2x: true });
 * for (const img of retinaImages) {
 *   await generate1xFrom2x('./src/images', img, './public/images');
 * }
 *
 * @example
 * // Process retina assets for responsive design
 * const assets = ['logo_2x.png', 'hero_2x.jpg', 'button_2x.png'];
 * const results = await Promise.all(
 *   assets.map(asset => generate1xFrom2x('./assets', asset, './dist'))
 * );
 * console.log('Generated 1x images:', results);
 *
 * @since 1.0.0
 */
export function generate1xFrom2x(
  filePath: string,
  imgName: string,
  outPath: string
): Promise<string> {
  if (!imgName.includes('_2x.')) {
    return Promise.reject(new Error('Image name must contain _2x. to generate 1x version'));
  }

  // Ensure output directory exists
  if (!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath, { recursive: true });
  }

  const outputName = imgName.replace('_2x.', '.');
  const outputPath = path.join(outPath, outputName);

  return new Promise((resolve, reject) => {
    getGmStream(filePath, imgName)
      .then(({ data, gmStream }) => {
        const width = Math.floor((data.size?.width || 0) / 2);
        const height = Math.floor((data.size?.height || 0) / 2);

        if (!width || !height) {
          reject(new Error('Could not determine image dimensions'));
          return;
        }

        gmStream
          .resize(width, height)
          .quality(config.quality)
          .write(outputPath, err => {
            if (err) {
              log.error(err);
              reject(err);
              return;
            }

            log.success(`Generated 1x image: ${outputPath}`);
            resolve(outputPath);
          });
      })
      .catch(reject);
  });
}

export default {
  getGmStream,
  toWebpImg,
  toBlurImg,
  toBase64,
  resizeImg,
  generate1xFrom2x,
};
