/**
 * build qrcode
 */
chrome.contextMenus.create({
	title: "当前URL生成二维码",
	contexts: ['selection'],
	onclick: function (params) {
		window.open('https://blog.michealwayne.cn/fe-tools/chrome-extension/popup.html?search=qrcode&message=' + params.pageUrl);
	}
});