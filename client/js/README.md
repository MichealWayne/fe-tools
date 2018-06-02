# js 方法、插件
@(前端)[js|web]

## 1 functions 方法
### 1.1 dom DOM操作
#### 1.1.1 dom.js
- hasClass()：判断元素是否有某个class；
- addClass()：为元素添加class；
- removeClass()：为元素移除class；
- getElementsByClassName()：查找classElements（PC-ie8以下）；
- offset()：获取一个元素的距离文档(document)的位置，类似jQ中的offset()；
- getScrollTop()：获取滚动条距顶部的距离；
- setScrollTop()：设置滚动条距顶部的距离；
- animateScrollTo()：在duration时间内，滚动条平滑滚动到to指定位置；

### 1.2 native 验证、cookie、css、颜色/图片、平台、时间、url等方法；

#### 1.2.1 check.js
- isIdCard()：简单验证身份证；
- checkIdcard()：详细身份证校验；
- checkCertValidDate()：身份证有效期校验；
- checkEmail()：邮箱校验；
- checkPostalCode()：校验(国内)邮政编码；
- checkHometelnoAndMobiletelno()：校验手机，电话号码；
- checkMobiletelno()：简单校验手机号码；
- getPhoneNumberType()：校验手机号码（详细）；
- checkHometelno()：校验电话号码；
- isUrl()：校验是否为URL地址；
- checkpwdstrength()：前端校验密码（6~12位数字+字母/符号）；

#### 1.2.2 cookies.js
- getCookie()：获取cookie；
- setCookie()：设置cookie；
- removeCookie()：删除cookie；

#### 1.2.3 css.js
- getPrefix()：获取样式浏览器前缀；

#### 1.2.4 image_color.js
- randomColor()：随机生成16位颜色；
- getColorRgb()：16位色转rgb数组；
- isSupportWebP()：判断浏览器是否支持webP格式图片；
- compressImage()：压缩图片（jpg）；

#### 1.2.5 platform.js
- getExplore()：获取浏览器类型和版本（PC）；
- getOS()：获取操作系统类型；
- getPlatform()：获取手机信息（mobile）（iphone || gphone）；
- getMobileOS()：获取手机系统信息（mobile）；

#### 1.2.6 time.js
- formatPassTime()：格式化${startTime}距现在的已过时间；
- formatRemainTime()：格式化现在距${endTime}的剩余时间；
- countDown()：倒计时；

#### 1.2.7 tween.js
动画线性函数集

#### 1.2.8 url.js
- parseQueryString()：url参数转对象；
- getUrlParam()：返回url单个参数的值；

#### 1.2.9 util.js
- arrayEqual()：判断两个数组是否相等；
- deepClone()：深拷贝，支持常见类型；
- isEmptyObject()：判断`obj`是否为空；
- randomNum()：生成指定范围随机数；
- type()、isObject()：类型判断；
- obj2str()：对象转字符串（主要用于post数据）；

#### 1.2.10 other.js
- digitUppercase()：现金额转大写；
- getKeyName()：根据keycode获得键名；


## 2 plugins 插件
### 2.1 alert 网页弹窗插件
### 2.2 toast 网页toast插件