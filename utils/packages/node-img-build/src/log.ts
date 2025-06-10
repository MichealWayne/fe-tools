/**
 * Log message with timestamp
 */
export default {
  info: (message: string): void => {
    console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
  },
  error: (message: string | Error): void => {
    console.error(
      `[ERROR] ${new Date().toISOString()}: ${message instanceof Error ? message.message : message}`
    );
  },
  success: (message: string): void => {
    console.log(`[SUCCESS] ${new Date().toISOString()}: ${message}`);
  },
};
