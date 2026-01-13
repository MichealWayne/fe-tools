export {};

declare global {
  interface Navigator {
    wakeLock?: {
      request: (type: "screen") => Promise<unknown>;
    };
  }
}
