(function attachCodexQuotaRuntime(root, factory) {
  const runtime = factory();
  if (typeof module === 'object' && module.exports) module.exports = runtime;
  root.CodexQuotaRuntime = runtime;
})(typeof globalThis === 'undefined' ? self : globalThis, function createCodexQuotaRuntime() {
  'use strict';

  const ENDPOINT = 'https://chatgpt.com/backend-api/wham/usage';
  const CACHE_VERSION = 1;
  const MAX_RESPONSE_BYTES = 256 * 1024;
  const REQUEST_TIMEOUT_MS = 10000;

  const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  const firstDefined = (record, keys) => {
    if (!isRecord(record)) return undefined;
    for (const key of keys) if (record[key] !== undefined) return record[key];
    return undefined;
  };
  const finiteNumber = value => {
    const number = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(number) ? number : undefined;
  };

  const normalizeTimestamp = value => {
    const number = finiteNumber(value);
    if (number !== undefined) {
      const milliseconds = number > 100000000000 ? number : number * 1000;
      return milliseconds > 0 && Number.isFinite(milliseconds) ? milliseconds : undefined;
    }
    if (typeof value !== 'string') return undefined;
    const milliseconds = Date.parse(value);
    return Number.isFinite(milliseconds) ? milliseconds : undefined;
  };

  const normalizeWindow = (value, fallbackId) => {
    if (!isRecord(value)) return undefined;
    const used = finiteNumber(firstDefined(value, ['used_percent', 'usedPercent']));
    const minutesDirect = finiteNumber(
      firstDefined(value, ['window_duration_mins', 'windowDurationMins', 'limit_window_minutes'])
    );
    const seconds = finiteNumber(
      firstDefined(value, ['limit_window_seconds', 'window_seconds', 'windowSeconds'])
    );
    const durationMinutes = minutesDirect ?? (seconds === undefined ? undefined : seconds / 60);
    const resetAt = normalizeTimestamp(
      firstDefined(value, ['reset_at', 'resetAt', 'resets_at', 'resetsAt'])
    );
    if (
      used === undefined ||
      used < 0 ||
      used > 100 ||
      durationMinutes === undefined ||
      !Number.isFinite(durationMinutes) ||
      durationMinutes <= 0 ||
      resetAt === undefined
    ) {
      return undefined;
    }
    const roundedMinutes = Math.round(durationMinutes);
    const kind = roundedMinutes === 300 ? 'five-hour' : roundedMinutes === 10080 ? 'weekly' : 'additional';
    return {
      id: kind === 'additional' ? fallbackId : kind,
      kind,
      usedPercent: Math.min(100, Math.max(0, used)),
      remainingPercent: Math.min(100, Math.max(0, 100 - used)),
      durationMinutes: roundedMinutes,
      resetAt,
    };
  };

  const normalizeQuotaResponse = (input, fetchedAt) => {
    if (!isRecord(input)) return { ok: false, error: 'incompatible_response' };
    const rateLimit = firstDefined(input, ['rate_limit', 'rate_limits', 'rateLimit', 'rateLimits']);
    if (!isRecord(rateLimit)) return { ok: false, error: 'incompatible_response' };

    const candidates = [
      ['primary', firstDefined(rateLimit, ['primary_window', 'primaryWindow', 'primary'])],
      ['secondary', firstDefined(rateLimit, ['secondary_window', 'secondaryWindow', 'secondary'])],
    ];
    const additional = firstDefined(input, ['additional_rate_limits', 'additionalRateLimits']);
    if (Array.isArray(additional)) {
      additional.forEach((entry, index) => {
        if (!isRecord(entry)) return;
        const windowValue = firstDefined(entry, ['primary_window', 'primaryWindow', 'primary', 'window']) ?? entry;
        candidates.push([`additional-${index + 1}`, windowValue]);
        const secondaryValue = firstDefined(entry, ['secondary_window', 'secondaryWindow', 'secondary']);
        if (secondaryValue) candidates.push([`additional-${index + 1}-secondary`, secondaryValue]);
      });
    }

    const seen = new Set();
    const windows = [];
    candidates.forEach(([id, value]) => {
      const normalized = normalizeWindow(value, id);
      if (!normalized) return;
      const identity = `${normalized.id}:${normalized.durationMinutes}`;
      if (seen.has(identity)) return;
      seen.add(identity);
      windows.push(normalized);
    });

    if (!windows.length) return { ok: false, error: 'empty_data' };
    return {
      ok: true,
      snapshot: {
        version: CACHE_VERSION,
        windows,
        fetchedAt: Number.isFinite(fetchedAt) ? fetchedAt : Date.now(),
      },
    };
  };

  const mapHttpError = status => {
    if (status === 401) return 'signed_out';
    if (status === 403) return 'forbidden';
    return 'upstream_rejection';
  };

  const fetchQuota = async (fetchImpl, options) => {
    const controller = new AbortController();
    const timeoutMs = options?.timeoutMs ?? REQUEST_TIMEOUT_MS;
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetchImpl(ENDPOINT, {
        method: 'GET',
        credentials: 'include',
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });
      if (!response.ok) return { ok: false, error: mapHttpError(response.status) };
      const contentLength = finiteNumber(response.headers?.get?.('content-length'));
      if (contentLength !== undefined && contentLength > MAX_RESPONSE_BYTES) {
        return { ok: false, error: 'response_too_large' };
      }
      const text = await response.text();
      if (new TextEncoder().encode(text).byteLength > MAX_RESPONSE_BYTES) {
        return { ok: false, error: 'response_too_large' };
      }
      let input;
      try {
        input = JSON.parse(text);
      } catch {
        return { ok: false, error: 'incompatible_response' };
      }
      return normalizeQuotaResponse(input, Date.now());
    } catch (error) {
      return { ok: false, error: error?.name === 'AbortError' ? 'timeout' : 'network' };
    } finally {
      clearTimeout(timer);
    }
  };

  return {
    CACHE_VERSION,
    ENDPOINT,
    MAX_RESPONSE_BYTES,
    REQUEST_TIMEOUT_MS,
    fetchQuota,
    mapHttpError,
    normalizeQuotaResponse,
    normalizeWindow,
  };
});
