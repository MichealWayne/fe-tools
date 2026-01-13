/**
 * @description 彩色日志记录函数集合，用于不同类型的消息输出。Collection of colored logging functions for different message types with enhanced terminal output formatting.
 * @example
 * // Success messages (green)
 * Tip.safe('Operation completed successfully');
 * Tip.success('File uploaded successfully');
 *
 * @example
 * // Information messages (default color)
 * Tip.log('Processing file...');
 * Tip.info('Server configuration loaded');
 *
 * @example
 * // Error messages (red)
 * Tip.error('Failed to connect to database');
 * Tip.err('Invalid input provided');
 *
 * @example
 * // Strong error messages (red background)
 * Tip.strongError('Critical system failure!');
 *
 * @example
 * // Warning messages (yellow)
 * Tip.warn('Deprecated function used');
 *
 * @example
 * // Strong warning messages (yellow background)
 * Tip.strongWarn('Memory usage approaching limit');
 *
 * @example
 * // With timestamps
 * Tip.error('Connection failed', true);
 * // Output: "2024/03/15 14:30:25:Connection failed"
 */
declare const Tip: {
    safe: (info: string | Error, timeFlag?: boolean) => void;
    success: (info: string | Error, timeFlag?: boolean) => void;
    log: (info: string | Error, timeFlag?: boolean) => void;
    info: (info: string | Error, timeFlag?: boolean) => void;
    err: (info: string | Error, timeFlag?: boolean) => void;
    error: (info: string | Error, timeFlag?: boolean) => void;
    strongError: (info: string | Error, timeFlag?: boolean) => void;
    warn: (info: string | Error, timeFlag?: boolean) => void;
    strongWarn: (info: string | Error, timeFlag?: boolean) => void;
};
export default Tip;
