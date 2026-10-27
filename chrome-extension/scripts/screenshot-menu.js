// Context-menu entrypoints bind work to the tab provided by Chrome's click event.
(function (root) {
  const definitions = [
    { id: 'screenshotElement', titleKey: 'contextMenuElementScreenshot' },
    { id: 'screenshotFullPage', titleKey: 'contextMenuFullPageScreenshot' },
  ];
  async function start(menuId, tab) {
    if (!tab?.id || !/^https?:\/\//.test(tab.url || '')) throw new Error('Unsupported page');
    if (menuId === 'screenshotElement') {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['scripts/element-screenshot.js'],
      });
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: filename => {
          window.FeToolsElementScreenshot.start({ filename }, () => undefined);
        },
        args: [`node-screenshot-${Date.now()}.png`],
      });
      return;
    }
    await chrome.tabs.create({
      windowId: tab.windowId,
      active: false,
      url: chrome.runtime.getURL(`index.html?type=page-capture&sourceTabId=${tab.id}`),
    });
  }
  root.FeToolsScreenshotMenu = {
    definitions,
    onClicked(menuId, tab) {
      if (!definitions.some(item => item.id === menuId)) return false;
      start(menuId, tab).catch(() => {
        chrome.notifications.create({
          type: 'basic', iconUrl: 'icon.png',
          title: chrome.i18n.getMessage('extensionName'),
          message: chrome.i18n.getMessage('contextMenuScreenshotError'),
        }).catch(() => undefined);
      });
      return true;
    },
  };
})(globalThis);
