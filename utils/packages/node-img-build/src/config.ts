/**
 * @author Wayne
 * @Date 2021-04-27 14:47:13
 * @LastEditTime 2022-07-05 10:19:01
 */

export interface ImageConfig {
  /** Default blur settings */
  blur: {
    color: number;
    radius: number;
    sigma: number;
  };
  /** Default image quality */
  quality: number;
  /** Output webp quality */
  webpQuality: number;
  /** Base directory */
  dirname: string;
}

const config: ImageConfig = {
  blur: {
    color: 8,
    radius: 7,
    sigma: 3,
  },
  quality: 90,
  webpQuality: 80,
  dirname: __dirname,
};

export default config;
