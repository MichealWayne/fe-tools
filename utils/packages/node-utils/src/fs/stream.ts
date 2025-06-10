/**
 * @author Wayne
 * @Date 2025-06-08 15:10:58
 * @LastEditTime 2025-06-08 15:11:11
 */
import fs from 'fs';
import path from 'path';
import { pipeline, Transform } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

/**
 * @function copyStream
 * @description复制文件流
 * @param {string} source 源文件路径
 * @param {string} target 目标文件路径
 * @param {object} options 选项
 */
export async function copyStream(
  source: string,
  target: string,
  options?: {
    transform?: Transform;
    flags?: string;
    mode?: number;
  }
): Promise<void> {
  const targetDir = path.dirname(target);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const readStream = fs.createReadStream(source);
  const writeStream = fs.createWriteStream(target, {
    flags: options?.flags || 'w',
    mode: options?.mode || 0o666,
  });

  if (options?.transform) {
    await pipelineAsync(readStream, options.transform, writeStream);
  } else {
    await pipelineAsync(readStream, writeStream);
  }
}
