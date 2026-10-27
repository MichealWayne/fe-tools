// Screenshot work survives the action popup closing. Browser-supplied sender.tab
// identifies content-script targets; callers cannot redirect those captures.
(function (root) {
  const PREFIX = 'element-screenshot:';
  const MAX_RESULT_BYTES = 8_000_000;
  const MAX_AGE_MS = 10 * 60 * 1000;

  async function handle(message, sender) {
    if (message.action === 'captureVisibleTab') {
      const extensionPage = sender.url?.startsWith(chrome.runtime.getURL(''));
      const windowId = extensionPage ? message.windowId : (sender.tab?.windowId ?? message.windowId);
      const tabId = extensionPage ? message.tabId : sender.tab?.id;
      if (!Number.isInteger(windowId)) throw new Error('Missing capture window');
      if (tabId !== undefined) {
        const tabs = await chrome.tabs.query({ active: true, windowId });
        if (tabs[0]?.id !== tabId) throw new Error('Capture tab is no longer active');
      }
      const dataUrl = await chrome.tabs.captureVisibleTab(windowId, { format: 'png' });
      return { success: true, dataUrl };
    }
    if (!sender.tab) throw new Error('Preview requires a page capture');
    if (message.dataUrl.length > MAX_RESULT_BYTES) throw new Error('Capture is too large');
    const stored = await chrome.storage.session.get(null);
    const expired = Object.keys(stored).filter(key =>
      key.startsWith(PREFIX) && Date.now() - stored[key].createdAt > MAX_AGE_MS
    );
    if (expired.length) await chrome.storage.session.remove(expired);
    const id = crypto.randomUUID();
    const key = PREFIX + id;
    const storedResult = { dataUrl: message.dataUrl, filename: message.filename, createdAt: Date.now() };
    await chrome.storage.session.set({ [key]: storedResult });
    try {
      const previewTab = await chrome.tabs.create({
        windowId: sender.tab.windowId,
        url: chrome.runtime.getURL(`index.html?type=screenshot-preview&captureId=${id}`),
        active: true,
      });
      await chrome.storage.session.set({
        [key]: { ...storedResult, previewTabId: previewTab.id },
      });
    } catch (error) {
      await chrome.storage.session.remove(key);
      throw error;
    }
    return { success: true };
  }

  chrome.tabs.onRemoved.addListener(async tabId => {
    try {
      const stored = await chrome.storage.session.get(null);
      const keys = Object.keys(stored).filter(key =>
        key.startsWith(PREFIX) && stored[key].previewTabId === tabId
      );
      if (keys.length) await chrome.storage.session.remove(keys);
    } catch {
      // Browser shutdown may invalidate the extension context.
    }
  });

  root.FeToolsScreenshotRuntime = {
    handleMessage(message, sender, sendResponse) {
      handle(message, sender).then(sendResponse).catch(() => {
        sendResponse({ success: false, error: 'Screenshot could not be completed' });
      });
      return true;
    },
  };
})(globalThis);
