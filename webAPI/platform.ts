/**
 * @module Platform
 */

export const ua = navigator.userAgent.toLowerCase();

/**
 * @function isPC
 * @return {boolean}
 */
export function isPC () {
    return ([
        'android', 
        'iphone', 
        'symbianos', 
        'windows phone', 
        'windows mobile', 
        'windows ce', 
        'ipad', 
        'ipod'
    ]).every(agent => ua.indexOf(agent) < 0);
}


/**
 * @function getPcExplore
 * @return {string}
 */
export function getPcExplore() {
    let sys = {
        ie: null,
        edge: null,
        firefox: null,
        chrome: null,
        opera: null,
        safari: null
    }, s;

    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
        (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
        (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
        (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
        (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
        (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
        (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] :
        0;

    if (sys.ie) return ('IE: ' + sys.ie)
    if (sys.edge) return ('EDGE: ' + sys.edge)
    if (sys.firefox) return ('Firefox: ' + sys.firefox)
    if (sys.chrome) return ('Chrome: ' + sys.chrome)
    if (sys.opera) return ('Opera: ' + sys.opera)
    if (sys.safari) return ('Safari: ' + sys.safari)
    return 'Unkonwn'
}


/**
 * @function getSystemOS
 * @return {string | undefined}
 */
export function getSystemOS() {
    let userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
    let appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

    if (/mac/i.test(appVersion)) return 'MacOSX'
    if (/win/i.test(appVersion)) return 'windows'
    if (/linux/i.test(appVersion)) return 'linux'
    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
    if (/android/i.test(userAgent)) return 'android'
    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
}

/**
 * @function getPlatform
 * @return {string}
 */
export function getPlatform() {
    let info = {
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
        language: (navigator.language).toLowerCase()
    };

    return (info.versions.iPhone || info.versions.iPad) ? 'iphone' : 'gphone'
}


/**
 * @function getMobileOS
 * @return {string}
 */
export function getMobileOS() {
    let _os = {
        android: 0,
        ios: 0
    };

    try {
        let _android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
            _ios = ua.match(/([iPad,iPod,iPhone]).*OS\s([\d_]+)/);

        if (_android) _os.android = +_android[2] || 0;
        if (_ios) _os.ios = +_ios[2].replace(/_/g, '.') || 0;
    } catch (e) {}
    return _os;
}