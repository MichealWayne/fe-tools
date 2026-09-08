(function attachCodexQuotaNotifications(root, factory) {
  const runtime = factory();
  if (typeof module === 'object' && module.exports) module.exports = runtime;
  root.CodexQuotaNotifications = runtime;
})(typeof globalThis === 'undefined' ? self : globalThis, function createNotifications() {
  const LOW_QUOTA_THRESHOLD = 10;

  const windowKey = window => `${window.id}:${window.durationMinutes}`;

  const evaluate = (previousSnapshot, currentSnapshot) => {
    const previousList = Array.isArray(previousSnapshot?.windows)
      ? previousSnapshot.windows
      : [];
    const previousWindows = new Map(
      previousList.map(window => [windowKey(window), window])
    );

    return currentSnapshot.windows.flatMap(window => {
      const previous = previousWindows.get(windowKey(window));
      const events = [];
      if (
        window.remainingPercent <= LOW_QUOTA_THRESHOLD &&
        (!previous || previous.remainingPercent > LOW_QUOTA_THRESHOLD)
      ) {
        events.push({ type: 'low', window });
      }
      if (
        previous &&
        window.resetAt > previous.resetAt &&
        window.remainingPercent > previous.remainingPercent
      ) {
        events.push({ type: 'reset', window });
      }
      return events;
    });
  };

  return { LOW_QUOTA_THRESHOLD, evaluate };
});
