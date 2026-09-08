/**
 * menu side controller
 * @author Wayne
 * @Date 2020-12-07 20:34:30
 * @LastEditTime 2023-07-22 15:18:58
 */

importScripts('message-contract.js');
importScripts('codex-quota-runtime.js');
importScripts('codex-quota-notifications.js');

const MAIN_MENU_ID = 'fe-tools-main';
const CODEX_QUOTA_ALARM = 'codex-quota-monitor';
const CODEX_QUOTA_ALARM_MINUTES = 10;
const CODEX_QUOTA_CACHE_KEY = 'codex-quota-snapshot-v1';
const CODEX_QUOTA_NOTIFICATION_STATE_KEY = 'codex-quota-notification-state-v1';
const CODEX_QUOTA_DASHBOARD_URL = 'https://chatgpt.com/codex/settings/usage';

let codexQuotaRequest = null;

const isChatGptTab = tab => {
  const tabUrl = tab?.url || tab?.pendingUrl;
  if (!tabUrl) return false;
  try {
    const { hostname } = new URL(tabUrl);
    return hostname === 'chatgpt.com' || hostname === 'chat.openai.com';
  } catch {
    return false;
  }
};

/**
 * Runs in ChatGPT's page world so the page can obtain an ephemeral session bearer token
 * and use it for this fixed endpoint. Only allowlisted quota values cross back to the
 * extension; the session response and bearer token stay inside this function.
 */
const readCodexQuotaInPageWorld = async () => {
  const endpoint = 'https://chatgpt.com/backend-api/wham/usage';
  const sessionEndpoint = 'https://chatgpt.com/api/auth/session';
  const maxResponseBytes = 262144;
  const requestTimeoutMs = 10000;
  const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  const pick = (record, keys) => {
    if (!isRecord(record)) return undefined;
    for (const key of keys) if (record[key] !== undefined) return record[key];
    return undefined;
  };
  const normalizeWindow = (value, fallbackId) => {
    if (!isRecord(value)) return undefined;
    const usedPercent = Number(pick(value, ['used_percent', 'usedPercent']));
    const directMinutes = Number(
      pick(value, ['window_duration_mins', 'windowDurationMins', 'limit_window_minutes'])
    );
    const seconds = Number(pick(value, ['limit_window_seconds', 'window_seconds', 'windowSeconds']));
    const durationMinutes =
      Number.isFinite(directMinutes) && directMinutes > 0 ? directMinutes : seconds / 60;
    const resetValue = pick(value, ['reset_at', 'resetAt', 'resets_at', 'resetsAt']);
    const resetNumber = Number(resetValue);
    const resetAt = Number.isFinite(resetNumber)
      ? resetNumber > 100000000000
        ? resetNumber
        : resetNumber * 1000
      : Date.parse(String(resetValue));
    if (
      !Number.isFinite(usedPercent) ||
      usedPercent < 0 ||
      usedPercent > 100 ||
      !Number.isFinite(durationMinutes) ||
      durationMinutes <= 0 ||
      !Number.isFinite(resetAt)
    ) {
      return undefined;
    }
    const roundedMinutes = Math.round(durationMinutes);
    const kind =
      roundedMinutes === 300 ? 'five-hour' : roundedMinutes === 10080 ? 'weekly' : 'additional';
    return {
      id: kind === 'additional' ? fallbackId : kind,
      kind,
      usedPercent,
      remainingPercent: Math.min(100, Math.max(0, 100 - usedPercent)),
      durationMinutes: roundedMinutes,
      resetAt,
    };
  };

  const mapHttpError = status =>
    status === 401 ? 'signed_out' : status === 403 ? 'forbidden' : 'upstream_rejection';
  const readSmallJson = async response => {
    const body = await response.text();
    if (new TextEncoder().encode(body).byteLength > maxResponseBytes) {
      return { ok: false, error: 'response_too_large' };
    }
    try {
      return { ok: true, value: JSON.parse(body) };
    } catch {
      return { ok: false, error: 'incompatible_response' };
    }
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), requestTimeoutMs);
  let sessionToken = '';
  try {
    const sessionResponse = await fetch(sessionEndpoint, {
      method: 'GET',
      credentials: 'include',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!sessionResponse.ok) return { ok: false, error: mapHttpError(sessionResponse.status) };
    const session = await readSmallJson(sessionResponse);
    if (!session.ok || !isRecord(session.value)) return session;
    const tokenValue = pick(session.value, ['accessToken', 'access_token']);
    if (typeof tokenValue !== 'string' || !tokenValue.trim()) {
      return { ok: false, error: 'signed_out' };
    }
    sessionToken = tokenValue;

    const response = await fetch(endpoint, {
      method: 'GET',
      credentials: 'include',
      headers: { Accept: 'application/json', Authorization: `Bearer ${sessionToken}` },
      signal: controller.signal,
    });
    if (!response.ok) return { ok: false, error: mapHttpError(response.status) };
    const quota = await readSmallJson(response);
    if (!quota.ok || !isRecord(quota.value)) return quota;
    const payload = quota.value;
    const rateLimit = pick(payload, ['rate_limit', 'rate_limits', 'rateLimit', 'rateLimits']);
    if (!isRecord(rateLimit)) return { ok: false, error: 'incompatible_response' };
    const candidates = [
      ['primary', pick(rateLimit, ['primary_window', 'primaryWindow', 'primary'])],
      ['secondary', pick(rateLimit, ['secondary_window', 'secondaryWindow', 'secondary'])],
    ];
    const additional = pick(payload, ['additional_rate_limits', 'additionalRateLimits']);
    if (Array.isArray(additional)) {
      additional.forEach((entry, index) => {
        candidates.push([
          `additional-${index + 1}`,
          pick(entry, ['primary_window', 'primaryWindow', 'primary', 'window']) || entry,
        ]);
      });
    }
    const seen = new Set();
    const windows = candidates.flatMap(([id, value]) => {
      const normalized = normalizeWindow(value, id);
      if (!normalized || seen.has(`${normalized.id}:${normalized.durationMinutes}`)) return [];
      seen.add(`${normalized.id}:${normalized.durationMinutes}`);
      return [normalized];
    });
    if (!windows.length) return { ok: false, error: 'empty_data' };
    return { ok: true, snapshot: { version: 1, windows, fetchedAt: Date.now() } };
  } catch (error) {
    return { ok: false, error: error?.name === 'AbortError' ? 'timeout' : 'network' };
  } finally {
    sessionToken = '';
    clearTimeout(timer);
  }
};

const readCodexQuotaFromMainWorld = async tabId => {
  const results = await chrome.scripting.executeScript({
    target: { tabId },
    world: 'MAIN',
    func: readCodexQuotaInPageWorld,
  });
  return results?.[0]?.result || { ok: false, error: 'unavailable' };
};

const requestCodexQuotaFromChatGptTab = async directResult => {
  const [activeTabs, allTabs] = await Promise.all([
    chrome.tabs.query({ active: true, lastFocusedWindow: true }),
    chrome.tabs.query({}),
  ]);
  const seenTabIds = new Set();
  const tabs = [...activeTabs, ...allTabs].filter(tab => {
    if (typeof tab.id !== 'number' || !isChatGptTab(tab) || seenTabIds.has(tab.id)) return false;
    seenTabIds.add(tab.id);
    return true;
  });
  const diagnostic = {
    directResult,
    activeTabCount: activeTabs.length,
    candidateTabCount: tabs.length,
    attempts: [],
  };
  const withDiagnostic = result => ({ ...result, diagnostic });
  if (!tabs.length) return withDiagnostic({ ok: false, error: 'signed_out' });
  let lastResult = { ok: false, error: 'unavailable' };
  for (const tab of tabs) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        world: 'ISOLATED',
        files: ['scripts/codex-quota-runtime.js'],
      });
      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        world: 'ISOLATED',
        func: async () => {
          if (!globalThis.CodexQuotaRuntime) return { ok: false, error: 'unavailable' };
          return globalThis.CodexQuotaRuntime.fetchQuota(fetch);
        },
      });
      lastResult = results?.[0]?.result || lastResult;
      diagnostic.attempts.push({ world: 'isolated', result: lastResult.ok ? 'ok' : lastResult.error });
      if (lastResult.ok) return withDiagnostic(lastResult);
      const mainWorldResult = await readCodexQuotaFromMainWorld(tab.id);
      lastResult = mainWorldResult || lastResult;
      diagnostic.attempts.push({ world: 'main', result: lastResult.ok ? 'ok' : lastResult.error });
      if (lastResult.ok) return withDiagnostic(lastResult);
    } catch {
      diagnostic.attempts.push({ world: 'isolated', result: 'unavailable' });
      // Continue to another ChatGPT tab before treating the session as unavailable.
    }
  }
  return withDiagnostic(lastResult);
};

const requestCodexQuota = async () => {
  const directResult = await globalThis.CodexQuotaRuntime.fetchQuota(fetch);
  if (directResult.ok || !['signed_out', 'forbidden'].includes(directResult.error)) {
    return directResult;
  }
  return requestCodexQuotaFromChatGptTab(directResult.error);
};

const getCodexQuota = () => {
  if (!codexQuotaRequest) {
    codexQuotaRequest = requestCodexQuota().finally(() => {
      codexQuotaRequest = null;
    });
  }
  return codexQuotaRequest;
};

const quotaWindowMessageKey = window => {
  if (window.kind === 'five-hour') return 'codexQuotaNotificationFiveHour';
  if (window.kind === 'weekly') return 'codexQuotaNotificationWeekly';
  return 'codexQuotaNotificationAdditional';
};

const showCodexQuotaNotification = async event => {
  const windowLabel = chrome.i18n.getMessage(quotaWindowMessageKey(event.window), [
    String(event.window.durationMinutes),
  ]);
  const isLow = event.type === 'low';
  await chrome.notifications.create(
    `codex-quota-${event.type}-${event.window.id}-${event.window.resetAt}`,
    {
      type: 'basic',
      iconUrl: 'icon.png',
      title: chrome.i18n.getMessage(
        isLow ? 'codexQuotaNotificationLowTitle' : 'codexQuotaNotificationResetTitle'
      ),
      message: chrome.i18n.getMessage(
        isLow ? 'codexQuotaNotificationLowMessage' : 'codexQuotaNotificationResetMessage',
        [windowLabel, String(Math.round(event.window.remainingPercent))]
      ),
    }
  );
};

const processCodexQuotaAlarm = async () => {
  const result = await getCodexQuota();
  // Authentication and all transport/contract failures intentionally skip state changes
  // and notification decisions. A later successful alarm can resume from the last baseline.
  if (!result.ok) return;

  const stored = await chrome.storage.local.get(CODEX_QUOTA_NOTIFICATION_STATE_KEY);
  const previousSnapshot = stored[CODEX_QUOTA_NOTIFICATION_STATE_KEY]?.snapshot || null;
  const events = globalThis.CodexQuotaNotifications.evaluate(previousSnapshot, result.snapshot);
  await Promise.allSettled(events.map(showCodexQuotaNotification));
  await chrome.storage.local.set({
    [CODEX_QUOTA_CACHE_KEY]: result.snapshot,
    [CODEX_QUOTA_NOTIFICATION_STATE_KEY]: { snapshot: result.snapshot },
  });
};

const ensureCodexQuotaAlarm = async () => {
  const alarm = await chrome.alarms.get(CODEX_QUOTA_ALARM);
  if (!alarm || alarm.periodInMinutes !== CODEX_QUOTA_ALARM_MINUTES) {
    await chrome.alarms.create(CODEX_QUOTA_ALARM, {
      delayInMinutes: CODEX_QUOTA_ALARM_MINUTES,
      periodInMinutes: CODEX_QUOTA_ALARM_MINUTES,
    });
  }
};

ensureCodexQuotaAlarm();

chrome.runtime.onStartup.addListener(ensureCodexQuotaAlarm);

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === CODEX_QUOTA_ALARM) processCodexQuotaAlarm().catch(() => undefined);
});

chrome.notifications.onClicked.addListener(notificationId => {
  if (notificationId.startsWith('codex-quota-')) handleTabCreate(CODEX_QUOTA_DASHBOARD_URL);
});

const handleTabCreate = url => {
  try {
    chrome.tabs.create({
      url,
    });
  } catch (e) {
    console.warn(e);
  }
};

const CONFIG_LIST = [
  {
    id: 'qrCode',
    title: chrome.i18n.getMessage('contextMenuQrCode'),
    contexts: ['all'],
  },

  {
    id: 'translate',
    title: chrome.i18n.getMessage('contextMenuTranslate'),
    contexts: ['all'],
  },
];

// create QRcode
chrome.runtime.onInstalled.addListener(() => {
  ensureCodexQuotaAlarm();
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: MAIN_MENU_ID,
      title: 'fe tools',
      contexts: ['all'],
      documentUrlPatterns: ['http://*/*', 'https://*/*', 'file://*/*'],
    });

    // 使用 `chrome.contextMenus.create` 方法替代 `chrome.contextMenus.create`
    CONFIG_LIST.forEach(item => {
      chrome.contextMenus.create({
        title: item.title,
        contexts: item.contexts,
        id: item.id,
        parentId: MAIN_MENU_ID,
      });
    });
  });
});

/**
 * 右键菜单点击事件
 */
chrome.contextMenus.onClicked.addListener((data, tab) => {
  if (data.menuItemId === 'qrCode') {
      handleTabCreate('index.html?search=qrcode&message=' + encodeURIComponent(tab.url || ''));
  } else if (data.menuItemId === 'translate') {
    // 发送消息给 content script 执行脚本
    chrome.tabs.sendMessage(tab.id, {
      action: 'executeScriptAndHandleTabCreate',
      code: 'window.getSelection().toString();',
      type: 'translate',
    });
  }
});

// 监听来自 content script 的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (sender.id !== chrome.runtime.id) return false;
  const contract = globalThis.FeToolsMessageContract;
  if (
    !contract ||
    (!contract.isRuntimeMessage(message) && !contract.isBackgroundMessage(message))
  ) {
    return false;
  }
  if (message.action === 'getCodexQuota') {
    getCodexQuota().then(sendResponse).catch(() => sendResponse({ ok: false, error: 'unavailable' }));
    return true;
  } else if (message.action === 'handleTabCreate') {
    handleTabCreate(message.url);
  } else if (message.action === 'captureVisibleTab') {
    const targetWindowId = message.windowId ?? sender?.tab?.windowId;
    chrome.tabs.captureVisibleTab(
      targetWindowId,
      {
        format: 'png',
      },
      dataUrl => {
        if (chrome.runtime.lastError) {
          sendResponse({
            success: false,
            error: chrome.runtime.lastError.message,
          });
          return;
        }
        sendResponse({
          success: true,
          dataUrl,
        });
      }
    );
    return true;
  } else if (message.action === 'downloadImage') {
    const filename = message.filename || 'page-screenshot.png';
    chrome.downloads.download(
      {
        url: message.dataUrl,
        saveAs: true,
        conflictAction: 'overwrite',
        filename,
      },
      downloadId => {
        if (chrome.runtime.lastError) {
          sendResponse({
            success: false,
            error: chrome.runtime.lastError.message,
          });
          return;
        }
        sendResponse({
          success: true,
          downloadId,
        });
      }
    );
    return true;
  }
});
