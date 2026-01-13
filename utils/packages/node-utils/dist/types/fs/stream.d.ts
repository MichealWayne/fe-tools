/// <reference types="node" />
import { Transform } from 'stream';
/**
 * @function copyStream
 * @description Asynchronously copies a file using streams with optional transformation. Copies a file from source to target using streams for memory-efficient handling of large files, with optional data transformation during the copy process.
 * @param {string} source - The source file path to copy from. Source file path for the copy operation
 * @param {string} target - The target file path to copy to. Target file path for the copy operation
 * @param {object} [options] - Optional configuration for the copy operation. Configuration options for the copy operation
 * @param {Transform} [options.transform] - Optional transform stream to modify data during copy. Transform stream to modify data during copy process
 * @param {string} [options.flags='w'] - File system flags for the write stream. File system flags for the write stream (default: 'w')
 * @param {number} [options.mode=0o666] - File permissions for the target file. File permissions for the target file (default: 0o666)
 * @returns {Promise<void>} Promise that resolves when copy operation completes. Promise that resolves when the copy operation completes successfully
 * @throws {Error} Throws if source file doesn't exist or copy operation fails. Error if source file doesn't exist or copy operation fails
 * @example
 * // Simple file copy
 * await copyStream('./source.txt', './backup/source.txt');
 * console.log('File copied successfully');
 *
 * @example
 * // Copy with transformation (uppercase content)
 * import { Transform } from 'stream';
 * const upperTransform = new Transform({
 *   transform(chunk, encoding, callback) {
 *     callback(null, chunk.toString().toUpperCase());
 *   }
 * });
 * await copyStream('./input.txt', './output.txt', { transform: upperTransform });
 *
 * @example
 * // Copy with custom permissions
 * await copyStream('./script.sh', './bin/script.sh', {
 *   mode: 0o755, // Make executable
 *   flags: 'w'
 * });
 *
 * @example
 * // Copy large files efficiently
 * try {
 *   await copyStream('./large-video.mp4', './backup/large-video.mp4');
 *   console.log('Large file copied using streams');
 * } catch (error) {
 *   console.error('Copy failed:', error.message);
 * }
 *
 * @since 1.0.0
 * @see {@link https://nodejs.org/api/stream.html#stream_stream_pipeline_source_transforms_destination_callback} - Node.js pipeline documentation
 */
export declare function copyStream(source: string, target: string, options?: {
    transform?: Transform;
    flags?: string;
    mode?: number;
}): Promise<void>;
