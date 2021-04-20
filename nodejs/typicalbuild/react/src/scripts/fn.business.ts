import Config from './config';
import ajax from './http'

/**
 * 检查登录
 * @param fn1 登录的回调
 * @param fn2 未登录的回调
 */
export let isLogin = (fn1?: any, fn2?: any) => {
    if (window.location.hostname === 'localhost') {
        _.urlInfo.sys = 'ths';
        window.getUserid = function () {
            return '602563878'
        };
        let custId = 100110015537;
        window.userinfo = {
            custId: custId,
            encryptionCustId: custId * 59 + 101
        };
        return fn1 && fn1()
    }
    if (_.urlInfo.sys === 'ths') {
        isLogin = (fn1, fn2) => {
            if (getAccount() === 0) {
                if (fn2 && fn2() === false) {
                    return;
                }
                let timer = setInterval(function () {
                    //手炒登录以后刷新页面
                    if (getAccount() !== 0) {
                        clearInterval(timer);
                        window.location.reload();
                    }
                }, 500);
                window.location.href = "http://eqhexin/changeUser";
            } else {
                fn1 && fn1();
            }
        };
        isLogin(fn1, fn2);
    } else {
        isLogin = (fn1, fn2) => {
            if (fn2) {
                _.getUserinfo(() => {
                    fn1 && fn1();
                }, () => {
                    fn2 && fn2();
                });
            } else {
                _.getUserinfo(() => {
                    fn1 && fn1();
                });
            }
        };
        isLogin(fn1, fn2);
    }
};
/**
 * 去绑定页面
 * @param url 绑定成功跳转的url
 */
export const toBind = (url = location.href): void => {
    let second = new Date().getSeconds();
    // 奇数秒进来活动页面的用户跳转老版网页开户流程
    // 偶数秒进来活动页面的用户跳转新版网页开户流程
    if (second % 2) {
        // alert(`https://${_.urlInfo.test ? `testm.10jqka.com.cn/eq` : `eq.10jqka.com.cn`}/iFundOpenAccount/index.html#/center?redir=${decodeURIComponent(url)}&source=1`);
        window.location.href = `https://${_.urlInfo.test ? `testm.10jqka.com.cn/eq` : `eq.10jqka.com.cn`}/iFundOpenAccount/index.html#/center?redir=${decodeURIComponent(url)}&source=1`
    } else {
        let setCookie = (name: string, value: string, expires: any, path: string, domain: string, secure?: string): void | boolean => {
            if (!name) {
                return false;
            }
            expires = expires ? '; expires=' + new Date(expires * 10000).toUTCString() : "";
            document.cookie = name + "=" + escape(value) + expires + (path ? "; path=" + path : "") + (domain ? "; domain=" + domain : "") + (secure ? "; secure" : "");
        };
        let bindUrl: string = '';
        if (_.urlInfo.test) {
            // 测试环境
            bindUrl = "//testm.10jqka.com.cn/tg_templates/doubleone/2018/fundBind/index.html";
        } else {
            bindUrl = "//ozone.10jqka.com.cn/tg_templates/doubleone/2018/fundBind/index.html"
        }
        // 存标识
        setCookie("pushbackUrl", url, 1576800000, '/', '10jqka.com.cn');
        setCookie("from", "push", 1576800000, '/', '10jqka.com.cn');
        // 跳转到绑定页
        window.location.href = bindUrl;
    }

};

/**
 * 获取用户自选列表
 */
export const getOptional = () => {
    return new Promise((resolve, reject) => {
        if (Config.localDev) {
            resolve(["540009", "210008"]);
        } else {
            _.ijijinVerControl('5.77.01', () => {
                reject();
            }, () => {
                callNativeHandler("getAllMyFund", {}, (data) => {
                    if (typeof data === "string") data = JSON.parse(data);
                    let result: Array<any> = [];
                    if (data[0]){
                        result = result.concat(data[0]);
                    }
                    if (data[1]){
                        result = result.concat(data[1]);
                    }
                    resolve(result);
                });
            });
        }
    });
};
/**
 * 添加自选
 * @param code 基金代码
 * @param name 基金名
 * @param type 基金类型 1-货币 0-普通
 */
export const addOptional = (code: string, name: string, type: number) => {
    return new Promise((resolve, reject) => {
        if (Config.localDev) {
            resolve();
        } else {
            _.ijijinVerControl('5.77.01', () => {
                _.jump().outpage(Config.download['ijijin']);
                reject();
            }, () => {
                callNativeHandler("addMyFund", {code: code, name: name, type: type}, (data) => {
                    if (data === "YES") {
                        resolve();
                    } else {
                        reject();
                    }
                });
            });
        }
    });
};
/**
 * 删除自选
 * @param code 基金代码
 */
export const deleteOptional = (code: string) => {
    return new Promise((resolve, reject) => {
        if (Config.localDev) {
            resolve();
        } else {
            _.ijijinVerControl('5.77.01', () => {
                _.jump().outpage(Config.download['ijijin']);
                reject();
            }, () => {
                callNativeHandler("deleteMyFund", {code: code}, (data) => {
                    if (data === "YES") {
                        resolve();
                    } else {
                        reject();
                    }
                });
            });
        }
    });
};
/**
 * 跳转至股票页面
 * @param code 股票代码
 */
export const toStockInfo = (code: string) => {
    return new Promise((resolve, reject) => {
        if (_.urlInfo.sys === 'ijijin') {
            if (_.platform.osInfo === 'iphone') {
                callNativeHandler('canOpenApp', {
                    appName: ['AMIHexin', 'AMIHexinpro'],
                    url: `command=gotoHQ&action=GGFS&stockcode=${code}&appName=爱基金&version=1`
                }, function (data) {
                    // 如果没有手抄APP 返回 false(boolean)
                    resolve(data);
                });
            } else {
                window.location.href = `client.html?action=gotoStockIndex,stockCode=${code}`;
            }
        } else {
            window.location.href = `client.html?action=ymtz^stockcode=${code}^webid=2205`; //;
        }
    });
};
/**
 * 获取倒计时时间
 * @param endTime 截止时间
 * @param startTime 开始时间
 * @returns [day,hour,minute,second]
 */
export const getCountDown = (endTime: string | Date, startTime: string | Date = new Date()) => {
    let endDate = endTime instanceof Date ? endTime : new Date(endTime);
    let startDate = startTime instanceof Date ? startTime : new Date(startTime);
    let t = endDate.getTime() - startDate.getTime();
    let day = 0, hour = 0, minute = 0, second = 0;
    if (t >= 0) {
        day = Math.floor(t / 1000 / 3600 / 24);
        hour = Math.floor(t / 1000 / 60 / 60 % 24);
        minute = Math.floor(t / 1000 / 60 % 60);
        second = Math.floor(t / 1000 % 60);
    }
    return [day, hour, minute, second];
};

/**
 * 写入粘贴板
 * @param data 要复制的值
 * @param successCallback 成功回调
 * @param errorCallback 失败回调
 */
export const clipboard = (data: string, successCallback: () => void, errorCallback: () => void) => {
    try {
        let input = document.createElement('input');
        input.value = data;
        input.setAttribute('readonly', 'readonly');
        let dialog = document.createElement('div');
        dialog.style.position = 'fixed';
        dialog.style.top = '0';
        dialog.style.left = '0';
        dialog.style.bottom = '0';
        dialog.style.right = '0';
        document.body.appendChild(dialog);
        dialog.appendChild(input);
        input.focus();
        input.setSelectionRange(0, input.value.length);
        let copyResult = document.execCommand('copy');
        if (copyResult) {
            successCallback && successCallback()
        } else {
            errorCallback && errorCallback()
        }
        document.body.removeChild(dialog);
    } catch (e) {
        console.error('copy to clipboard fail' + e)
    }
};

/**
 * 改变标题栏颜色
 * @param color 16进制颜色
 *
 */
export const changeTitleBar = (color: string) => {
    // 标题栏颜色
    if (_.urlInfo.sys === 'ths') {
        callNativeHandler("changeWebViewTitleColor", {
            "data": {
                "status": "change",
                "color": color
            }
        }, function () {

        });
    }
};

/**
 * 跳转至下载页
 */
export const toDownLoadApp = () => {
    location.href = Config.download[_.urlInfo.sys];
};

/**
 * 检测授权码
 * @param callback1 有授权码回调
 * @param callback2 无授权码回调
 */
export const checkWeChatCode = (callback1: (code: string, state: string | null) => void, callback2: () => void) => {
    // 检查是否有授权码
    let code = _.fn.getUrlParam('code');
    let state = _.fn.getUrlParam('state');
    if (code) { // 如果有code则吊起授权登录
        callback1(code, state);
    } else {
        callback2()
    }
};

/**
 * 获取授权链接
 */
export const fetchWeChatAuthUrl = () => {
    return new Promise((resolve, reject) => {
        let url = localStorage.getItem('authUrl');
        if (url) { // 授权后跳转指定链接 一般微信外部页面使用
            localStorage.removeItem('authUrl')
        } else if (window.location.port === '8444') { // 准生产域名无法配置授权，所以跳到生产转发一次
            url = `https://trade.5ifund.com/tohangqing/ifundapp_app/public/wzy/wecahtJump/dist/index.html?jumpUrl=${encodeURIComponent(window.location.href)}`
        } else {
            url = window.location.href
        }
        ajax('fetchWeChatAuthUrl', {
            redirecturl: url,
            scope: 'snsapi_userinfo'
        }).then((data: any) => {
            resolve(data.singleData.oauthUrl)
        })
    })
};

/**
 * 获取用户信息
 * @param code 微信授权码
 * @param state 额外参数
 */
export const fetchWeChatUserInfo = (code: string, state: string | null) => {
    return new Promise((resolve, reject) => {
        ajax(`fetchWeChatUserInfo`, {
            code: code,
            state: state
        }).then((data: any) => {
            resolve(data.singleData)
        })
    })
};

/**
 * 检查用户是否关注订阅号
 * @token 令牌
 * @checkFlag 检查状态
 */
export const checkWechatUserAttention = (token: string, checkFlag = 0) => {
    return new Promise((resolve, reject) => {
        ajax(`checkSubscribe`, {
            wxauthenticition: token,
            checkFlag: checkFlag
        }).then((data: any) => {
            resolve(data.singleData.subscribe)
        })
    })
};

/**
 * 获取基金详情信息
 */
export const fetchFundData = (codes: Array<string> | string, keys: Array<string> | string = '0') => {
    if (!codes) return;
    // 处理多个代码和查询字段的情况
    if (codes instanceof Array) {
        codes = encodeURI(codes.join('|'))
    }
    if (keys instanceof Array) {
        keys = encodeURI(keys.join('|'))
    }
    // 支持回调函数和Promise
    let _interface = `/interface/fund/multiFundInfo/${codes}_${keys}_0_0`;
    return ajax(`get ${_interface}`);
};


/**
 * 获取收益走势图链接
 * @param code 基金代码
 * @param time 时间
 */
export const getFundImg = (code: string, time = 'year') => {
    return `https://${Config.testDev ? 'test' : ''}fund.10jqka.com.cn/fundminicon/${Config.testDev ? 'dist/' : ''}${code}_${time}.jpg`
};

/**
 * 根据服务器字段自动转化为文字
 * @param value
 */
export const profitTimeToText = (value: string) => {
    switch (value) {
        case 'rate':
            return '昨日';
        case 'nowyear':
            return '今年以来';
        case 'week':
            return '近一周';
        case 'month':
            return '近一月';
        case 'tmonth':
            return '近三月';
        case 'hyear':
            return '近半年';
        case 'year':
            return '近一年';
        case 'twoyear':
            return '近两年';
        case 'tyear':
            return '近三年';
        case 'fyear':
            return '近五年';
    }
};

/**
 * 获取服务器当前时间
 */
export const fetchServeTime = () => {
    return new Promise(resolve => {
        ajax("fetchNowTime").then((data: number) => {
            resolve(data * 1000)
        })
    })
};

/**
 * 获取当前所在环境
 */
export const getCurrentEnv = (): string => {
    const ua = navigator.userAgent.toLowerCase();
    if (/bestpay/gi.test(ua) || /orange/gi.test(ua)) { // 甜橙和翼支付环境
        return 'tc'
    } else if (/micromessenger/gi.test(ua)) { // 微信环境
        return 'wechat'
    } else if (/xiaomi/gi.test(ua)) { //小米环境
        return 'xiaomi'
    } else if (/maijinwang/gi.test(ua)) { // 买金网
        return 'maijin'
    } else {
        return _.urlInfo.sys
    }
};

/**
 * 数据装填用户信息
 * @param data
 */
export const fillUserAccount = (data: any = {}): any => {
    let sendData = Object.assign({}, data);
    if (_.urlInfo.sys === 'ijijin') {
        sendData.custId = window.userinfo && window.userinfo.custId
    } else {
        sendData.thsId = getUserid() || ''
    }
    return sendData
};


/**
 * 获取账户数据
 */
export const getThsOrJijinUserId = () => {
    if (_.urlInfo.sys === 'ijijin') {
        return window.userinfo && window.userinfo.custId
    } else {
        return getUserid() || ''
    }
};

/**
 * 获取红包信息
 */
export function fetchPacketInfo(couponId) {
    return new Promise(resolve => {
        ajax('queryCoupon', {ids: couponId}).then((data: any) => {
            const couponInfo = data.data[0];
            resolve(couponInfo)
        })
    })
}