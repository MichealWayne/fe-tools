/**
 * menu side controller
 * @author Wayne
 * @Date 2020-12-07 20:34:30
 * @LastEditTime 2023-07-22 15:18:58
 */

const MAIN_MENU_ID = 'fe-tools-main';

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
    title: '当前URL生成二维码',
    contexts: ['all'],
  },

  {
    id: 'translate',
    title: '快速翻译',
    contexts: ['all'],
  },
];

// create QRcode
chrome.runtime.onInstalled.addListener(() => {
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
      handleTabCreate('index.html?search=qrcode&message=' + tab.url);
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
  if (message.action === 'handleTabCreate') {
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
