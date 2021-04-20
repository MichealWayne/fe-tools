/**
 * declare 
 */
interface Window {
    userinfo: any
    FundCharts: {
        line: any
    };
    component: {
        $alert: any,
        $toast: any
    },
    showKeyValuesResult: any,
    getUserid: any
}

// 爱基金全局变量
declare const _: {
    backWash: (obj: {
        url: string,
        statConfig: {
            pageId: string,
            urlVer: string
        }
    }) => void
    hdShare: (obj: {
        flag: string,
        title: string,
        shareUrl: string
        description: string
    }) => void
    urlInfo: {
        // 所在运行环境
        sys: 'ijijin' | 'ths'
        //正式测试环境区分
        test: any
    }
    // 环境信息
    platform: {
        // 手机系统
        osInfo: 'iphone' | 'gphone',
        getMobileOS: () => { android: number, ios: number }
    }
    // 获取登录信息
    // @param fn1 已登录回调
    // @param fn2 未登录回调
    getUserinfo: (fn1: any, fn2?: any) => void
    // ijijin版本信息查询
    // @param version 版本号
    // @param fn1 低版本回调
    // @param fn2 高版本回调
    ijijinVerControl: (version: string, fn1: () => any, fn2: () => any) => void
    // 获取库
    // @param library 库数组
    // @param callback 获取到之后的回调
    getResources: (library: Array<string>, callback: () => any) => void
    // get请求方法
    // @param url 请求链接
    // @param data 请求参数
    // @param successCallback 成功回调
    // @param errorCallback 失败回调
    // @return Promise
    get: (url: string, data: any, successCallback?: (data: any) => void, errorCallback?: (data: any) => void) => Promise<string>
    // post请求方法
    // @param url 请求链接
    // @param data 请求参数
    // @param successCallback 成功回调
    // @param errorCallback 失败回调
    // @return Promise
    post: (url: string, data: any, successCallback?: (data: any) => void, errorCallback?: (data: any) => void) => Promise<string>
    // 常用方法
    fn: {
        // 获取url查询字符串中的值
        // @param key 查询的key
        getUrlParam: (key: string) => string | null;
        [propName: string]: any;
    }
    // 数据缓存
    storage: {
        [propName: string]: any;
    }
    // 跳转方法
    jump: (tjid?: string) => {
        // 在外部游览器中打开指定链接
        // @param url 链接
        outpage: (url: string) => void
	// 新开webview打开链接
        // @param url 链接
        topage: (url: string) => void
        // 跳转至购买页
        // @param code 基金代码
        buy: (code: string) => void
        // 跳转至详情页
        // @param code 基金代码
        fund: (code: string) => void
    }
    // 埋点初始化方法
    statSet: (obj: { pageid: string, url_ver: string, bottom?: boolean }) => void
    // 埋点发送方法
    log: (exobj?: { [propName: string]: string }) => {
        clickStat: (stat: string) => void
        jumpPageStat: (stat: string, page?: string) => void
    }
    cookie: (name: string) => string
    hideFundLoading: () => void,
    fundLoading: () => void
    setTitle: (title: string) => void
    [propName: string]: any;
};

// 爱基金图形库
declare const FundCharts: {
    line: any
    bar: any
    scatter: any
    kline: any
    pie: any
    radar: any
};

//手炒登录判断函数
declare const getAccount: () => any;
declare const getUserid: () => string;

// 客户端协议调取函数
// @param name 协议名称
// @param data 交互数据
// @param fn1 执行完成回调
declare const callNativeHandler: (name: string, data: any, fn1?: (data: any) => void) => any;
declare const registerWebHandler: (name: string, fn1?: (data: any) => void) => any;
declare const thsencrypt: {
    encode: (data: string) => string
};

// 声明模块
declare module 'classnames';
declare module 'fundcharts';
declare module 'redux-logger';

/**
 * declare images | fonts | styles
 */
declare module '*.svg'
declare module '*.svgz'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module '*.eot'
declare module '*.ttf'
declare module '*.woff'
declare module '*.woff2'
declare module '*.less'
declare module '*.css'

