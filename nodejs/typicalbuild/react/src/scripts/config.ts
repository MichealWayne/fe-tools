import { getCurrentEnv } from "./fn.business";

interface iConfig {
    // 下载地址
    download: {
        ths: string,
        ijijin: string
    },
    isSharePage: boolean, // 是否是分享环境
    pageId: string, // 页面id
    urlVer: string, // 任务号
    localDev: boolean, // 是否是本地环境
    openMock: boolean, // 是否开启mock
    env: string, // 当前环境
    prefix: string, // 接口前缀
    testDev: boolean, // 正式测试环境判断
    [propsName: string]: any
}

const hostname = location.hostname;
const config: iConfig = {
    download: {
        ths: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.hexin.plat.android',
        ijijin: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.hexin.android.bank'
    },
    isSharePage: !!_.fn.getUrlParam('share'),
    pageId: '--',
    urlVer: '--',
    openMock: _.urlInfo.test || hostname === 'localhost',
    prefix: hostname === 'trade.5ifund.com' ? 'tohangqing' : '',
    localDev: hostname == 'localhost',
    testDev: hostname === 'localhost' || !!_.urlInfo.test,
    env: getCurrentEnv()
};
export default config