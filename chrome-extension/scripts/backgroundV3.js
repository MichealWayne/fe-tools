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

chrome.contextMenus.create({
  id: MAIN_MENU_ID,
  title: 'fe tools',
  contexts: ['all'],
  documentUrlPatterns: ['http://*/*', 'https://*/*', 'file://*/*']
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
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'handleTabCreate') {
    handleTabCreate(message.url);
  }
});
