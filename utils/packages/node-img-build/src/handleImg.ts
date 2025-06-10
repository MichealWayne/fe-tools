/**
 * @author Wayne
 * @Date 2021-04-27 14:47:13
 * @LastEditTime 2025-06-08 15:48:52
 */
import path from 'path';
import fs from 'fs';
import gmConstructor from 'gm';

import config from './config';
import log from './log';

const gm = gmConstructor.subClass({ imageMagick: true });

/**
 * Options for blur image
 */
export interface BlurOptions {
  /** Colors to keep in the blur image (default: 8) */
  color?: number;
  /** Blur radius (default: 7) */
  blurRadius?: number;
  /** Blur sigma (default: 3) */
  blurSigma?: number;
}

/**
 * Options for webp conversion
 */
export interface WebpOptions {
  /** Quality of the webp image (0-100) */
  quality?: number;
}

/**
 * @function getGmStream
 * @description Get image as GM stream
 * @param {String} filePath - Directory containing the image
 * @param {String} imgName - Image filename
 * @returns {Promise<{data: gmConstructor.ImageInfo, gmStream: gmConstructor.State}>}
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
 * @function toWebpImg
 * @description Convert image to webp format (replacing _2x. in filename)
 * @param {String} filePath - Directory containing the image
 * @param {String} imgName - Image filename
 * @param {String} outPath - Output directory
 * @param {WebpOptions} options - Options for webp conversion
 * @returns {Promise<string>} - Path to the generated webp file
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
 * @function toBlurImg
 * @description Generate blurred image (gm format)
 * @param {gmConstructor.State} gmStream - GM image stream
 * @param {BlurOptions} options - Blur configuration
 * @returns {gmConstructor.State | false} - Blurred GM stream or false if error
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
 * @function toBase64
 * @description Convert image to base64
 * @param {gmConstructor.State} gmStream - GM image stream
 * @param {String} type - Image format (jpg, png, etc.)
 * @returns {Promise<string>} - Base64 string with data URI prefix
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
 * @function resizeImg
 * @description Resize image
 * @param {gmConstructor.State} gmStream - GM image stream
 * @param {Number} width - Target width
 * @param {Number} height - Target height (optional)
 * @returns {gmConstructor.State | false} - Resized GM stream or false if error
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
 * @function generate1xFrom2x
 * @description Generate 1x image from 2x image
 * @param {String} filePath - Directory containing the image
 * @param {String} imgName - Image filename (must contain _2x)
 * @param {String} outPath - Output directory
 * @returns {Promise<string>} - Path to the generated 1x file
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
