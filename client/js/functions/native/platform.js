/*
* 平台信息
* @author: Micheal Wang
* @build time: 2017.11.15
*/

/*
 * 是否是pc环境
 * @return {Boolean}
 */
export function isPC () {
    let Agents = [
        'android', 
        'iphone', 
        'symbianos', 
        'windows phone', 
        'windows mobile', 
        'windows ce', 
        'ipad', 
        'ipod'
    ];
    let flag = true;
    for (let i in Agents) {
        if (~ua.indexOf(Agents[i])) {
            flag = false;
            break;
        }
    }
    return flag;
}


/*
* PC
* 获取浏览器类型和版本
* @return {String} 
*/
export function getExplore() {
    var sys = {},
        ua = navigator.userAgent.toLowerCase(),
        s;

    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
        (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
        (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
        (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
        (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
        (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
        (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] :
        0;

    // 根据关系进行判断 
    if (sys.ie) return ('IE: ' + sys.ie)
    if (sys.edge) return ('EDGE: ' + sys.edge)
    if (sys.firefox) return ('Firefox: ' + sys.firefox)
    if (sys.chrome) return ('Chrome: ' + sys.chrome)
    if (sys.opera) return ('Opera: ' + sys.opera)
    if (sys.safari) return ('Safari: ' + sys.safari)
    return 'Unkonwn'
}

/*
* 获取操作系统类型
* @return {String} 
*/
export function getOS() {
    var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
    var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
    var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

    if (/mac/i.test(appVersion)) return 'MacOSX'
    if (/win/i.test(appVersion)) return 'windows'
    if (/linux/i.test(appVersion)) return 'linux'
    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
    if (/android/i.test(userAgent)) return 'android'
    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
}

/*
* mobile
* 获取手机信息
* @return {String}
*/
export function getPlatform() {
    var info = {
        versions: function() {
            {
                var ua = navigator.userAgent;
                navigator.appVersion
            }
            return {
                iPhone: ua.indexOf("iPhone") > -1 || ua.indexOf("Mac") > -1,
                iPad: ua.indexOf("iPad") > -1
            }
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };

    return (info.versions.iPhone || info.versions.iPad) ? 'iphone' : 'gphone'
}

/*
* mobile
* 获取手机系统版本（ios，android）
* @return {Object} 系统信息
*/
export function getMobileOS() {
    var _os = {
        android: '',
        ios: ''
    };

    try {
        var ua = navigator.userAgent, 
            _android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
            _ios = ua.match(/([iPad,iPod,iPhone]).*OS\s([\d_]+)/);

        if (_android) _os.android = +_android[2] || '';
        if (_ios) _os.ios = +_ios[2].replace(/_/g, '.') || '';
    } catch (e) {}
    return _os
}