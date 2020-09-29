import Config from './config'

interface iINTERFACE {
    [propName: string]: string
}

const INTERFACE: iINTERFACE = {
    'fetchNowTime': `get ${Config.prefix}/getNowTime`, // 获取当前时间
    'fetchWeChatAuthUrl': 'get /rs/wxapi/oauth/init/default', // 获取微信授权链接
    'fetchWeChatUserInfo': 'get /rs/wxapi/oauth/result/default', // 获取微信用户信息
    'checkSubscribe': 'get /rs/wxapi/oauth/checksubscribe' // 检查是否关注公众号
};

// mock请求地址
const mockUrl = Config.openMock ? `https://testfund.10jqka.com.cn/moocss/mock/entry/${Config.urlVer}` : '';

export default function (Interface: string, data = {}) {
    const requestInfo = INTERFACE[Interface] || Interface;
    const requestInfoArr: Array<string> = requestInfo.split(' ');
    let url: string = requestInfoArr[1];
    let method: string = requestInfoArr[0];
    // _.fundLoading()
    return new Promise(resolve => {
        _[method](`${mockUrl}${url}`, data).then((data: any) => {
            resolve(data);
            // _.hideFundLoading()
        })
    })
}