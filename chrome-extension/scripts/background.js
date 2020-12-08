/**
 * menu side controller
 * @author Wayne
 * @time 2020.12.02
 */

const handleTabCreate = url => {
	try {
		chrome.tabs.create({
			url
		});
	} catch (e) {
		console.warn(e);
	}
};

const CONFIG_LIST = [
	{
		title: "当前URL生成二维码",
		contexts: ['page'],
		onclick (params) {
			handleTabCreate('popup.html?search=qrcode&message=' + params.pageUrl);
		}
	},

	{
		title: "快速中英文翻译",
		contexts: ['all'],
		onclick (params) {
			try {
				chrome.tabs.executeScript( {
					code: 'window.getSelection().toString();'
				}, function (selection) {
					handleTabCreate('popup.html?type=translate&value=' + encodeURIComponent(selection));
				});
			} catch (e) {
				console.warn(e);
			}
		}
	},

	{
		title: '在FE-Tools搜索',
		contexts: ['selection'],
		onclick (params) {
			try {
				chrome.tabs.executeScript( {
					code: 'window.getSelection().toString();'
				}, function (selection) {
					handleTabCreate('popup.html?message=' + selection);
				});
			} catch (e) {
				console.warn(e);
			}
		}
	}
]

// create QRcode
CONFIG_LIST.map(item => chrome.contextMenus.create(item));
