# fe-books

> 前端开发常用文档/网站地址、样式/js方法封装库（ts）、典型项目模板。

<a title="前端开发常用文档/网站地址、样式/js方法封装库、项目模板" href="https://blog.michealwayne.cn/2019/07/18/tools/%E3%80%90%E5%B7%A5%E5%85%B7%E3%80%91%E5%89%8D%E7%AB%AF%E5%B8%B8%E7%94%A8%E7%BD%91%E7%AB%99%E9%9B%86%E5%90%88/" target="_blank"><img style="display: block; margin: 0 auto; width: 50%;" src="https://blog.michealwayne.cn/images/fe.jpg"/></a>


------------------


## 1. 常用网站
目录：
- [1.1 HTML/CSS/JavaScript](#11-htmlcssjavascript)
- [1.2 兼容/查询](#12-兼容查询)
- [1.3 CSS工具](#13-css工具)
- [1.4 JS插件/库](#14-js插件库)
- [1.5 Vue](#15-vue)
- [1.6 React](#16-react)
- [1.7 Nodejs和构建](#17-nodejs和构建)
- [1.8 Hybird和跨端](#18-hybird和跨端)
- [1.9 辅助工具](#19-辅助工具)
- [1.10 测试、安全及加密](#110-测试安全及加密)
- [1.11 IDE插件](#111-ide插件)


### 1.1 HTML/CSS/JavaScript/WASM/Dart
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://developer.mozilla.org/zh-CN/docs/Web" target="_blank">MDN 文档手册</a> | `html/css/js` | Mozilla出品的一个很全很有用的前端查询/学习网站。
<a href="https://www.w3.org/" target="_blank">W3C官网</a> | `html/css/js` | W3C官方，不解释。
<a href="https://www.html.cn/book/css/all-properties.html" target="_blank">html中文网-css教程手册</a> | `css` | HTML中文网-快速查询css属性及基本使用。
<a href="http://www.yyyweb.com/demo/html5-tools/html5-canvas.html" target="_blank">canvas速查手册</a> | `canvas` | canvas API方法集合，一目了然。
<a href="https://www.w3.org/Graphics/SVG/" target="_blank">W3C官网-SVG</a> | `svg` | W3C官网，SVG文档。
<a href="http://www.t086.com/code/vml/" target="_blank">VML 参考手册</a> | `VML(IE)` | *微软开发的在低端IE上运行的“SVG”。
<a href="https://www.typescriptlang.org/docs/handbook/intro.html" target="_blank">TypeScript官方手册</a> | `typescript` | TypeScript官方手册。
<a href="https://github.com/type-challenges/type-challenges" target="_blank">TypeScript Challenges</a> | `ts-challenges` | TypeScript Challenges，在线学习/检验自己的ts水平。
<a href="https://www.ecma-international.org/publications-and-standards/standards/" target="_blank">ECMA standards | `ecma` | ECMAScript 协议标准。
<a href="http://www.ecma-international.org/ecma-262/6.0/" target="_blank">ECMA International(6)</a> | `ES6` | ECMAScript6官方文档。
<a href="https://ecma262.docschina.org/" target="_blank">ECMA International(6) China | `ES6` | ECMAScript6官方文档，部分中文翻译。
<a href="http://es6-features.org/" target="_blank">ECMA6 features | `ES6` | 通俗易懂的ECMAScript6特性demos。
<a href="http://es6.ruanyifeng.com/" target="_blank">ES6入门（阮一峰）</a> | `ES6` | 使用频率最高的ECMAScript6文档。
<a href="http://www.html5plus.org/doc/h5p.html" target="_blank">Web API Reference</a> | `html5` | HTML5 web API查询，如摄像头/地理位置。
<a href="https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/Attributes.html#//apple_ref/doc/uid/TP40008058-autocorrect" target="_blank">Safari HTML Ref查询</a> | `html` | Safari webview的HTML标签查询，某些ios特殊的属性或表现可以查这个。
<a href="https://webkit.org/status/" target="_blank">WebKit 特性状态查询</a> | `webkit` | WebKit 官网文档，js/css特性状态支持情况查询。
<a href="https://dart.dev/" target="_blank">Dart官网</a> | `dart` | dart语言英文官网。
<a href="https://www.dartcn.com/guides/language/language-tour" target="_blank">Dart中文网</a> | `dart` | dart语言中文学习网。
<a href="https://github.com/dart-archive/ts2dart" target="_blank">ts2dart</a> | `ts2dart` | 一款 TypeScript 转 Dart 语言的工具。
<a href="https://www.rfc-editor.org/" target="_blank">RFC规范官网</a> | `rfc/http` | RFC协议官网，HTTP协议等内容。
<a href="https://www.iana.org/assignments/media-types/media-types.xhtml" target="_blank">Media Types</a> | `MIME` | 媒体类型，MIME。
<a href="https://webassembly.org/" target="_blank">Web Assembly官网</a> | `wasm` | Web Assembly(wasm)英文官网网。
<a href="https://www.wasm.com.cn/" target="_blank">Web Assembly中文网</a> | `wasm` | Web Assembly(wasm)中文网。
<a href="https://docs.krustlet.dev/" target="_blank">Krustlet 官网</a> | `krustlet` | 一款 Web Assembly 框架。
<a href="https://wechat-miniprogram.github.io/miniprogram-compat/" target="_blank">微信小程序ES兼容查询</a> | `weapp` | 微信小程序ES api及对应小程序环境版本兼容查询。



### 1.2 兼容/查询
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://caniuse.com/" target="_blank">can i use</a> | `caniuse` | 使用频率最高的兼容支持查询网站。
<a href="http://kangax.github.io/compat-table/es6/" target="_blank">ES兼容查询</a> | `js` | ECMAScript兼容查询。
<a href="http://iosfonts.com/" target="_blank">iOS字体</a> | `ios font` | iOS系统自带字体查询。
<a href="https://www.bootcss.com/p/websafecolors/" target="_blank">Web安全色查询</a> | `web color` | 为了尽量让用户看到色彩相同的网页,请尽量使用216色的web安全色。
<a href="http://tongji.baidu.com/data/browser" target="_blank">浏览器份额统计</a> | `browser` | 百度统计的市面上浏览器/app份额。

### 1.3 CSS工具
#### 1.3.1 预处理
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://lesscss.org/" target="_blank">less文档</a> | `less` | 易上手的CSS预处理工具。
<a href="https://sass-guidelin.es/zh/" target="_blank">sass 文档</a> | `sass` | 热门的CSS预处理工具。
<a href="http://stylus-lang.com/" target="_blank">stylus 文档</a> | `stylus` | 功能丰富的CSS预处理工具。
<a href="http://www.zhangxinxu.com/jq/stylus/" target="_blank">stylus 文档(张旭鑫)</a> | `stylus` | stylus中文文档。
<a href="https://asmcss.com/" target="_blank">Assembler CSS 文档</a> | `asmcss` | Assembler CSS 官方文档，Just-in-time。

#### 1.3.2 后处理
地址 | 标签 | 说明
---- | ---- | ----
<a href="http://api.postcss.org/" target="_blank">postcss 文档</a> | `postcss` | 被广泛运用的CSS后处理工具。
<a href="https://github.com/postcss/postcss" target="_blank">github-postcss</a> | `postcss` | post插件库中心。
<a href="https://github.com/postcss/autoprefixer" target="_blank">github-autoprefixer</a> | `autoprefixer` | 自动补充浏CSS前缀的后处理工具。
<a href="https://cssnano.co/" target="_blank">cssnano官网</a> | `cssnano` | CSS优化和分解插件。
<a href="https://www.npmjs.com/package/postcss-plugin-px2rem" target="_blank">postcss-plugin-px2rem</a> | `px2rem` | 将px单位转为rem单位的工具。
<a href="https://www.npmjs.com/package/postcss-px-to-viewport" target="_blank">postcss-px-to-viewport</a> | `px2vw` | 将px单位转为vw单位的工具。
<a href="https://cssnext.github.io/" target="_blank">cssnext官网</a> | `cssnext` | 让今天的我们写着明天的CSS特性。


#### 1.3.3 样式库/模块
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://css.30secondsofcode.org/" target="_blank">30s-of-code(css)</a> | `30s-of-code(css)` | 常用CSS样式模块集合，30s of code系列。
<a href="https://daneden.github.io/animate.css/" target="_blank">animate.css</a> | `bulma.css` | CSS3动画库。
<a href="http://ianlunn.github.io/Hover/" target="_blank">Hover.css</a> | `Hover.css` | PC鼠标hover交互动画库。
<a href="https://bulma.io/" target="_blank">bulma.css</a> | `bulma.css` | 一款轻量级的CSS UI库。
<a href="http://cardinalcss.com/" target="_blank">cardinal.css</a> | `cardinal.css` | 一款移动优先的less库。
<a href="http://bootflat.github.io/index.html" target="_blank">bootflat.css</a> | `bootflat.css` | 一款扁平化风格scss库，基于BootStrap3.3。
<a href="https://jamiewilson.io/corpus/" target="_blank">corpus.css</a> | `corpus.css` | 一款scss集合库。
<a href="https://github.com/Tencent/weui" target="_blank">weui</a> | `weui` | 微信风格的样式库，腾讯。
<a href="http://www.materializecss.cn/" target="_blank">materialize.css</a> | `materializecss` | Material风格的响应式前端样式框架。
<a href="https://www.muicss.com" target="_blank">mui.css</a> | `MUI` | Material风格的轻量级前端样式框架。
<a href="https://metroui.org.ua/" target="_blank">Metro UI</a> | `Metro UI` | 一款流行的响应式前端样式框架，[React版](https://react.metroui.org.ua/)。
<a href="https://nostalgic-css.github.io/NES.css/" target="_blank">NES.css</a> | `NES.css` | 游戏机风格的前端样式框架。
<a href="https://www.getpapercss.com" target="_blank">paper.css</a> | `paper.css` | 手绘风格的前端样式框架。
<a href="http://www.uiplayground.in/css3-icons/" target="_blank">css3 icon</a> | `css3 icon` | 纯CSS实现的图标。
<a href="http://bootstrap.css88.com/css/" target="_blank">Bootstrap 文档</a> | `bootstrap` | 红极一时的前端样式框架。
<a href="https://www.layui.com/doc/" target="_blank">layui 文档</a> | `layui` | 一款采用自身模块规范编写的前端 UI 框架。
<a href="https://fontawesome.com/" target="_blank">fontawesome</a> | `fontawesome` | 字体图标库。
<a href="https://www.iconfont.cn/" target="_blank">iconfont</a> | `iconfont` | 字体图标库，阿里。
<a href="http://necolas.github.io/normalize.css/" target="_blank">normalize</a> | `normalize` | 相对较优的CSS reset替代方案。
<a href="https://tailwindcss.com/" target="_blank">Tailwind官网</a> | `tailwind` | 模块化的UI库。


#### 1.3.4 其他
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://qishaoxuan.github.io/css_tricks/" target="_blank">css tricks</a> | `css tricks` | 包括布局、图标、动画等CSS技巧。
<a href="https://en.bem.info/methodology/quick-start/" target="_blank">BEM</a> | `bem` | BEM写法规范。
<a href="https://acss.io/" target="_blank">ACSS</a> | `acss` | Atomic CSS，一种模块化写法规范。
<a href="https://csswizardry.net/talks/2014/11/itcss-dafed.pdf" target="_blank">IT.css</a> | `itcss` | IT CSS，一种组件化写法规范。
<a href="https://glenmaddern.com/articles/css-modules" target="_blank">CSS modules</a> | `css-modules` | 一种CSS样式模块化的解决方案。
<a href="https://github.com/MicheleBertoli/css-in-js" target="_blank">css in js</a> | `css-in-js` | 用写js的方式生成css样式。
<a href="http://blog.michealwayne.cn/Moo-CSS/docs/moocss/#m%E6%A8%A1%E5%9D%97" target="_blank">Moo-CSS</a> | `moo-css` | 一种CSS写法方案。
<a href="https://github.com/l-hammer/You-need-to-know-css" target="_blank">CSS tricks for web developers</a> | `You-need-to-know-css` | CSS技巧集合。



### 1.4 JS插件/库
#### 1.4.1 库
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://lodash.com/docs/" target="_blank">LoDash</a> | `lodash` | 广为人知的函数式工具库。
<a href="https://gcanti.github.io/fp-ts/" target="_blank">fp-ts</a> | `fp-ts` | 遵循函数式编程范式的ts封装库。
<a href="https://underscorejs.org/" target="_blank">UnderscoreJS</a> | `underscorejs` | 红极一时的函数式工具库。
<a href="http://www.css88.com/jqapi-1.9/" target="_blank">jQueryJs</a> | `jQuery` | 红极一时的js库。
<a href="http://www.css88.com/doc/zeptojs_api/" target="_blank">ZeptoJs</a> | `Zepto` | 移动端使用的轻量级“jQuery”。
<a href="https://github.com/basecss/city" target="_blank">city.js</a> | `city` | 全国行政区划分数据文件。
<a href="http://phaser.io/" target="_blank">phaser.js</a> | `phaser` | 2D游戏前端库。
<a href="http://fabricjs.com/" target="_blank">fabric.js</a> | `fabricjs` | 有名的svg和canvas相互转换的封装库。
<a href="https://www.babylonjs.com/" target="_blank">babylon.js</a> | `babylonjs` | 有名的3D游戏/视频框架。
<a href="https://immutable-js.github.io/immutable-js/" target="_blank">immutable-js</a> | `immutable` | 生产环境js的List, Stack, Map, OrderedMap, Set, OrderedSet以及Record数据结构支持，通常用于ReactJs。
<a href="https://github.com/alibaba/GCanvas" target="_blank">GCanvas</a> | `gcanvas` | 轻量的跨平台图形引擎（web/weex/react-native），阿里。
<a href="https://github.com/jayphelps/core-decorators" target="_blank">core-decorators</a> | `core-decorators` | 丰富的装饰器封装库，基于ES2016/2017的装饰器语法。



#### 1.4.2 数据工具
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://stdlib.io/" target="_blank">stdlib</a> | `stdlib` | js的数学增强库。
<a href="https://github.com/ramda/ramda" target="_blank">ramda</a> | `ramda` | 广为人知的函数式工具库。
<a href="http://winterbe.github.io/streamjs/" target="_blank">StreamJs</a> | `streamjs` | 一款js数据的操作工具。
<a href="https://baconjs.github.io/" target="_blank">BaconJs</a> | `baconjs` | 也是一款js数据的操作工具。
<a href="https://momentjs.com/" target="_blank">MomentJs</a> | `momentjs` | 一款日期格式化的工具（2020开始停止维护）。
<a href="https://day.js.org/" target="_blank">DayJs</a> | `dayjs` | 一款日期格式化的工具，MomentJS的替代品。
<a href="http://numbrojs.com/" target="_blank">numbro</a> | `numbrojs` | 一款多国语言的数字转化工具。
<a href="http://numeraljs.com/" target="_blank"> NumeralJs</a> | `numeraljs` | 用于格式化和操作数字的 js 库。
<a href="http://openexchangerates.github.io/accounting.js/" target="_blank">accounting.js</a> | `accounting.js` | 数字，金钱的格式化工具。
<a href="http://openexchangerates.github.io/money.js/" target="_blank">money.js</a> | `money.js` | 金钱的汇率转换工具。
<a href="https://github.com/MikeMcl/decimal.js#readme" target="_blank">decimal.js</a> | `decimal.js` | Js精度处理库。

#### 1.4.3 请求、cookie和缓存
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://github.com/axios/axios" target="_blank">axios</a> | `axios` | 高频使用的ajax库。
<a href="https://github.com/github/fetch" target="_blank">fetch</a> | `fetch` | Fetch API的兼容polyfill。
<a href="https://github.com/webmodules/jsonp" target="_blank">jsonp</a> | `jsonp` | 不用多说，实现jsonp。（axios没有封装jsonp）
<a href="http://medialize.github.io/URI.js/" target="_blank">URI.js</a> | `uri` | URI解析操作的工具。
<a href="https://github.com/marcuswestin/store.js/" target="_blank">StoreJs</a> | `storage` | storage的封装库，兼容IE6。
<a href="https://github.com/js-cookie/js-cookie" target="_blank">js-cookie</a> | `js-cookie` | cookie的封装库。
<a href="https://dexie.org/" target="_blank">Dexie.js</a> | `Dexie.js` | IndexedDB的封装库。
<a href="https://localforage.github.io/localForage/" target="_blank">localForage.js</a> | `localForage` | 基于IndexedDB、WebSQL、localStorage的离线存储库，Mozilla。
<a href="https://addyosmani.com/basket.js/" target="_blank">basket.js</a> | `basket.js` | 利用localStorage来缓存script和css资源。


#### 1.4.4 插件
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://www.swiper.com.cn/" target="_blank">swiper.js</a> | `swiper` | 轮播插件。
<a href="https://github.com/jacoborus/nanobar/" target="_blank">nanobar.js</a> | `nanobar` | 绚丽的进度条展示插件，IE7+。
<a href="https://sweetalert.js.org/" target="_blank">sweetalert</a> | `sweetalert.js` | 还算库的PC alert展示插件。
<a href="https://github.com/lancedikson/bowser" target="_blank">bowserjs</a> | `bowserjs` | 通过ua做的浏览器探测插件。
<a href="https://clipboardjs.com/" target="_blank">clipboard.js</a> | `clipboardjs` | 剪贴板控制插件。
<a href="https://github.com/kazuhikoarase/qrcode-generator/tree/master/js" target="_blank">Qrcode-generator</a> | `grcode-generator` | 二维码生成工具。
<a href="http://html2canvas.hertzen.com/documentation" target="_blank">html2canvas</a> | `html2canvas` | html转为图片（canvas），即实现网页截图。
<a href="https://www.rrweb.io/" target="_blank">rrweb</a> | `rrweb ` | 基于样式截取的网页“录屏”工具，实现用户操作采集和回放。
<a href="https://github.com/sofish/pen#readme" target="_blank">Pen Editor</a> | `Pen Editor` | web的文本编辑工具。
<a href="https://nosir.github.io/cleave.js/" target="_blank">cleave.js</a> | `cleave.js` | 一款好用的input输入控制插件。
<a href="https://github.com/jackmoore/autosize" target="_blank">autosize.js</a> | `autosize.js` | 一款好用的`<textarea/>`高度自适应工具。
<a href="https://github.com/eligrey/FileSaver.js" target="_blank">FileSaver.js</a> | `FileSaver.js` | 网页端字符/图片/文件另存为插件。
<a href="http://danml.com/download.html" target="_blank">download.js</a> | `download.js` | 网页端字符/图片/文件另存为插件，比FileSaver快一点。
<a href="https://github.com/mailru/FileAPI" target="_blank">FileAPI.js</a> | `FileAPI` | 控制文件上传的插件。
<a href="https://github.com/alexgibson/shake.js" target="_blank">shake.js</a> | `shake.js` | 移动端摇晃震动监听插件。
<a href="https://atomiks.github.io/tippyjs/" target="_blank">Tippy.js</a> | `tippy.js` | 好用的气泡组件，有React版。
<a href="https://fusejs.io/" target="_blank">fuse</a> | `fusejs` | 轻量、好用的js模糊搜索库。
<a href="https://www.algolia.com/" target="_blank">algolia</a> | `algolia` | 好用的搜索集成方案。
<a href="https://opensource.appbase.io/dejavu/" target="_blank">dejavu</a> | `dejavu` | 一款弹性搜索方案，逮虾户。
<a href="https://kamranahmed.info/driver.js/#single-element-with-popover" target="_blank">driver.js</a> | `driverjs` | 一款轻量的用户操作引导插件。
<a href="https://michalsnik.github.io/aos/" target="_blank">aos.js</a> | `aosjs` | 一款强大的页面滚动动画插件。
<a href="http://lab.ejci.net/favico.js/" target="_blank">favico.js</a> | `favicojs` | 一款让pc网站图标动起来的插件。
<a href="https://alvarotrigo.com/fullPage/" target="_blank">fullPage.js</a> | `fullpagejs` | 一款快速搭建全屏滚动页面的插件。



##### 视/音频
地址 | 标签 | 说明
---- | ---- | ----
<a href="http://www.mediaelementjs.com/" target="_blank">MediaElement.js</a> | `mediaelementjs` | 一款视频控制插件。
<a href="https://videojs.com/" target="_blank">video.js</a> | `videojs` | 一款视频控制插件。
<a href="https://github.com/bilibili/flv.js" target="_blank">flv.js</a> | `flvjs` | 一款无需flash的flv播放插件。
<a href="https://github.com/goldfire/howler.js#documentation" target="_blank">howler.js</a> | `howlerjs` | 视、音频控制插件。
<a href="http://jplayer.org/" target="_blank">jplayer</a> | `jplayer` | jQuery的视、音频控制插件。
<a href="https://github.com/zohararad/audio5js" target="_blank">audio5.js</a> | `audio5js` | 一款音频控制插件。

##### 图片
地址 | 标签 | 说明
---- | ---- | ----
<a href="http://camanjs.com/" target="_blank">caman.js</a> | `camanjs` | 一款web图片处理插件。
<a href="https://sharp.pixelplumbing.com/" target="_blank">Sharp</a> | `sharp` | 一款强大的图片处理工具。
<a href="https://github.com/GoogleChromeLabs/squoosh" target="_blank">squoosh.js</a> | `squoosh` | 一款优秀的图片压缩方案，有浏览器环境。
<a href="https://github.com/naptha/tesseract.js" target="_blank">tesseract.js</a> | `tesseract` | 一款强大的OCR识别库。


##### 字符串
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://vocajs.com/" target="_blank">Voca.js</a> | `vocajs` | 字符串的驼峰/修饰/填充/截断/转义/大小写更改等等。
<a href="http://alexcorvi.github.io/anchorme.js/" target="_blank">anchorme.js</a> | `anchormejs` | 自动将文本中的链接/URL/电子邮件转化为可点击的锚点链接。
<a href="https://github.com/jprichardson/string.js" target="_blank">String.js</a> | `stringjs` | 字符串的截取删除等操作库（很久没维护了）。
<a href="https://github.com/ljharb/qs" target="_blank">qs.js</a> | `qsjs` | URL参数处理库。



#### 1.4.5 工具
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://github.com/pvorb/node-md5" target="_blank">md5.js</a> | `md5` | md5加密。
<a href="http://requirejs.org/" target="_blank">RequireJs</a> | `requirejs` | js模块化工具。
<a href="http://yslove.net/seajs/" target="_blank">SeaJs</a> | `seajs` | js模块化工具。
<a href="http://browserify.org/" target="_blank">Browserify</a> | `browserify` | 浏览器端使用类似于 node 的 require() 方式。
<a href="https://github.com/rickharrison/validate.js" target="_blank">validate.js</a> | `validate.js` | form表单校验工具。
<a href="https://github.com/validatorjs/validator.js" target="_blank">validator.js</a> | `validator.js` | 有名的内容校验工具，比如邮箱验证、数值验证等。
<a href="https://cn.rx.js.org/" target="_blank">RxJS中文官网</a> | `RxJS` | ReactiveX编程理念的js异步编程库。
<a href="https://github.com/kelektiv/node.bcrypt.js#readme" target="_blank">Bcrypt</a> | `bcrypt` | 用于密码散列处理的库。
<a href="https://github.com/Marak/Faker.js#readme" target="_blank">Faker</a> | `faker` | 用于在浏览器/Nodejs中生成假数据（注意作者已删源码）。
<a href="https://joi.dev/" target="_blank">Joi官网</a> | `joi` | 面向js的强大schema描述语言与数据验证器。
<a href="https://github.com/JedWatson/classnames#readme" target="_blank">classnames</a> | `classnames` | className条件组合的工具，多用于React。
<a href="https://github.com/pillarjs/path-to-regexp#readme" target="_blank">path-to-regexp</a> | `path-to-regexp` | URL或路径校验工具，使用面极广。




#### 1.4.6 数据可视化(图表)
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://api.hcharts.cn/highcharts" target="_blank">highcharts</a> | `highcharts` | 效果、兼容最好（ie6+）的可视化库，可惜企业要收费。
<a href="http://echarts.baidu.com/api.html#echarts" target="_blank">echarts</a> | `echarts` | 国内最全面的可视化库。
<a href="https://github.com/d3/d3/wiki" target="_blank">d3</a> | `d3` | 不直接输出图形，输出开发功能的svg工具。
<a href="http://www.chartjs.org/docs/latest/" target="_blank">Chartjs</a> | `chartjs` | 模块化可视化库。
<a href="http://antv.alipay.com/zh-cn/g2/3.x/demo/funnel/basic.html" target="_blank">antv</a> | `G2/F2` | 包括pc/移动的可视化库，蚂蚁。
<a href="http://blog.michealwayne.cn/FundCharts/docs/" target="_blank">FundCharts</a> | `fundcharts` | 本人的跨端轻量可视化库。
<a href="https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene" target="_blank">ThreeJs文档</a> | `threejs/webGL` | 著名的webGL 3D建模库
<a href="https://playcanvas.com/" target="_blank">PlayCanvas文档</a> | `playcanvas` | webGL游戏3D建模库
<a href="http://scenejs.org/" target="_blank">scene.js</a> | `scenejs` | WebGL 3D基础库。
<a href="http://snapsvg.io/" target="_blank">Snap.svg</a> | `snap` | 一款svg操作库。
<a href="https://www.pixijs.com/" target="_blank">pixi.js</a> | `pixijs` | 2D WebGL渲染引擎。
<a href="https://libcafe.com/3d/index.html" target="_blank">svg-3d-builder</a> | `svg-3d-builder` | 3D SVG渲染引擎。
<a href="https://github.com/jsplumb/jsplumb" target="_blank">jsplumb</a> | `jsplumb` | 一款好用的流程图可视化库。
<a href="https://js.cytoscape.org/" target="_blank">cytoscapejs</a> | `cytoscape` | 一款好用的关系图谱可视化库。
<a href="http://mermaid-js.github.io/mermaid/#/" target="_blank">Mermaid</a> | `mermaid` | 一款好用的流程图生成可视化库。
<a href="https://ecomfe.github.io/zrender-doc/public/" target="_blank">Zrender</a> | `zrender` | 2D渲染渲染引擎库，支持Canvas/SVG/VML，也是ECharts的渲染器。


#### 1.4.7 数据可视化(地图)
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://cesiumjs.org/" target="_blank">cesiumjs</a> | `Cesium.js` | 一款开源的3D城市建模库。
<a href="http://kartograph.org/" target="_blank">Kartograph</a> | `Kartograph.js` | 一款普通的2D SVG城市数据展示库，IE7+。
<a href="https://leafletjs.com/" target="_blank">leafletjs</a> | `Leaflet.js` | 一款移动优先的地图展示插件。

#### 1.4.8 h5动画
地址 | 标签 | 说明
---- | ---- | ----
<a href="http://bouncejs.com/" target="_blank">Bounce.js</a> | `BounceJS` | 牛啤的CSS3动画创建工具。
<a href="https://github.com/bendc/animateplus" target="_blank">animateplus.js</a> | `Animateplus` | 仅3k的动画工具。
<a href="https://animejs.com/" target="_blank">Anime.js</a> | `animejs` | 轻量级js动画库。
<a href="https://svgjs.com/docs/3.0/" target="_blank">svg.js</a> | `svgjs` | 轻量的svg操作/动画库。
<a href="http://snapsvg.io/" target="_blank">snapsvg</a> | `Snap.svg` | 一款有名的svg操作/动画库。
<a href="http://airbnb.io/lottie/#/" target="_blank">lottie</a> | `lottie` | web/原生/小程序的跨端动效方案。
<a href="https://createjs.com/easeljs" target="_blank">EaselJS</a> | `easeljs` | canvas动画操作库，CreateJS四剑客之一。
<a href="https://createjs.com/tweenjs" target="_blank">TweenJS</a> | `tweenjs` | 动画曲线（ease/linear...）操作库，CreateJS四剑客之一。
<a href="https://createjs.com/soundjs" target="_blank">SoundJS</a> | `soundjs` | 音频控制库，CreateJS四剑客之一。
<a href="https://createjs.com/preloadjs" target="_blank">PreloadJS</a> | `preload` | 资源预加载库，CreateJS四剑客之一。
<a href="https://p5js.org/" target="_blank">P5js</a> | `p5js` | canvas绘画功能库。
<a href="https://roughjs.com/" target="_blank">Rough.js</a> | `roughjs` | 一个有意思的canvas绘图库（画出的图形具有手绘风格）。
<a href="https://github.com/BabylonJS/Babylon.js" target="_blank">BabylonJS</a> | `BabylonJS` | 一个功能强大，美观，简单且开放的游戏和渲染引擎。
<a href="https://github.com/sarcadass/granim.js#readme" target="_blank">GranimJs</a> | `granimjs` | 用于创建流体和交互式渐变的动画js库，仅17k。

#### 1.4.9 移动端手势
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://github.com/AlloyTeam/AlloyFinger" target="_blank">AlloyFinger.js</a> | `AlloyFinger` | 增加移动端的各种手势事件。
<a href="http://hammerjs.github.io/" target="_blank">hammer.js</a> | `hammerjs` | 手势封装库，取消了移动端click的300ms延迟。
<a href="https://interactjs.io/" target="_blank">interact.js</a> | `interactjs` | 使用JavaScript实现拖放、缩放和多点触控手势。

#### 1.4.10 加载
地址 | 标签 | 说明
---- | ---- | ----
<a href="http://pazguille.github.io/aload/" target="_blank">aload.js</a> | `aload.js` | 异步图片/js/css加载工具。
<a href="http://callmecavs.com/layzr.js/" target="_blank">layzr.js</a> | `layzr.js` | 轻量图片懒加载工具。
<a href="https://github.com/aFarkas/lazysizes" target="_blank">lazysizes.js</a> | `lazysizes` | 高性能的图片/iframe懒加载工具。
<a href="https://infinite-scroll.com/" target="_blank">infinite-scroll.js</a> | `infinite-scroll` | “无限”滚动的加载插件。


#### 1.4.11 TypeScript辅助
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://github.com/TypeStrong/ts-loader" target="_blank">ts-loader</a> | `ts-loader` | webpack中的TypeScript构建插件。
<a href="https://github.com/s-panferov/awesome-typescript-loader" target="_blank">awesome-typescript-loader</a> | `awesome-typescript-loader` | webpack中的TypeScript构建插件，比ts-loader要快一点。
<a href="https://github.com/kimamula/ts-transformer-keys#readme" target="_blank">ts-transformer-keys</a> | `ts-transformer-keys` | 用于提取interface的键值数组（需要用webpack）。
<a href="https://github.com/tamino-martinius/node-ts-dedent#readme" target="_blank">ts-dedent</a> | `ts-dedent` | node端打印正常换行的log。

#### 1.4.12 其他
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://github.com/krausest/js-framework-benchmark" target="_blank">js-framework-benchmark</a> | `js-framework-benchmark` | 基于chrome的各前端框架性能对比，有个分析站点。
<a href="https://angular.io/" target="_blank">Angular</a> | `angular` | 封装度高的经典前端框架。
<a href="https://github.com/sveltejs/svelte" target="_blank">Svelte</a> | `svelte` | 无虚拟DOM的轻量Web应用编译器，template，近期火。
<a href="https://solidjs.com/" target="_blank">SolidJs</a> | `solid` | 对webComponent友好的库，开发体验与react相似，国外这几年较火。
<a href="https://stenciljs.com/" target="_blank">Stenciljs</a> | `stenciljs` | webComponent的编译构建框架，jsx。
<a href="https://www.infernojs.org/" target="_blank">Infernojs</a> | `infernojs` | 轻量的类React库，jsx。
<a href="https://emberjs.com/" target="_blank">Emberjs</a> | `emberjs` | 脚手架强大的web开发框架，template。
<a href="https://github.com/akxcv/vuera" target="_blank">Vuera</a> | `vuera` | 用来混用Vue/React组件的库、即Vue中可以使用React组件、React中可以使用Vue组件。



### 1.5 Vue
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://cn.vuejs.org/v2/guide/syntax.html" target="_blank">Vue 文档</a> | `vue` | 官方文档。
<a href="https://cli.vuejs.org/zh/guide/cli-service.html#%E4%BD%BF%E7%94%A8%E5%91%BD%E4%BB%A4" target="_blank">vue-cli 文档</a> | `vue-cli` | vue脚手架工具文档。
<a href="https://vuex.vuejs.org/zh/" target="_blank">vuex 文档</a> | `vuex` | vue数据流控制工具。
<a href="https://router.vuejs.org/zh/" target="_blank">vue-router 文档</a> | `vue-router` | 基于vue的前端路由控制。
<a href="http://danilowoz.com/create-vue-content-loader/" target="_blank">vue-content-loader 文档</a> | `create-vue-content-loader` | vue版SVG骨架屏插件。
<a href="http://ustbhuangyi.github.io/better-scroll/doc/api.html" target="_blank">better-scroll 文档</a> | `better-scroll` | 控制滚动场景的插件。
<a href="https://youzan.github.io/vant/#/zh-CN/intro" target="_blank">vant 文档</a> | `vant` | 移动UI库，有赞。
<a href="http://aidenzou.github.io/vue-weui/#!/" target="_blank">vue-weui 文档</a> | `vue-weui` | weui风格的移动UI组件库。
<a href="https://element.eleme.cn/#/zh-CN" target="_blank">Element 文档</a> | `element` | 使用PC中后台前端开发的UI组件库，饿了么。
<a href="https://github.com/hilongjw/vue-lazyload" target="_blank">vue-lazyload 文档</a> | `vue-lazyload` | vue版的图片/组件懒加载插件。
<a href="http://v1.iviewui.com/docs/guide/install" target="_blank">iView 文档</a> | `iview` | PC UI组件库。
<a href="https://vue.ant.design/docs/vue/introduce-cn/" target="_blank">antd-vue 文档</a> | `antd-vue` | PC UI组件库，ant design的Vue版。
<a href="https://kazupon.github.io/vue-i18n/" target="_blank">vue-i18n 文档</a> | `vue-i18n` | 多语言解决方案。
<a href="https://terryz.github.io/vue/#/region" target="_blank">v-region 文档</a> | `v-region` | Vue行政区选择组件。
<a href="https://github.com/ecomfe/vue-echarts" target="_blank">vue-echarts 文档</a> | `vue-echarts` | Echarts的Vue封装组件。
<a href="https://zh.nuxtjs.org/" target="_blank">Nuxt.JS 文档</a> | `nuxtjs` | Vue的服务端渲染应用框架。
<a href="https://github.com/vitejs/vite" target="_blank">ViteJS 文档</a> | `vitejs` | 无bundle的Vue轻量前端项目构建工具。
<a href="https://github.com/vuejs/vue-class-component#readme" target="_blank">vue-class-component 仓库</a> | `vue-class-component` | Vue的Component装饰器封装，用于jsx/tsx的vue组件写法。
<a href="https://formilyjs.org/" target="_blank">Formily 文档</a> | `formilyjs` | Element/Antd的表单DSL解决方案。


### 1.6 React
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://doc.react-china.org/docs/hello-world.html" target="_blank">React 文档</a> | `react` | 官方文档。
<a href="https://facebook.github.io/create-react-app/" target="_blank">create-react-app 文档</a> | `create-react-app` | react脚手架工具文档。
<a href="https://github.com/facebook/react-devtools" target="_blank">react Chrome devtools</a> | `react-devtools` | react的Chrome开发拓展插件。
<a href="http://react-guide.github.io/react-router-cn/" target="_blank">react-router</a> | `react-router` | 用于react的前端路由控制。
<a href="https://github.com/facebookexperimental/Recoil" target="_blank">Recoil 文档</a> | `recoil` | 简单、对hook友好的数据流控制工具。
<a href="https://www.redux.org.cn/docs/introduction/" target="_blank">redux 文档</a> | `redux` | 广泛使用的数据流控制工具，reducer+flux。
<a href="http://facebook.github.io/flux/" target="_blank">flux 文档</a> | `flux` | 数据流控制工具。
<a href="https://cn.mobx.js.org/" target="_blank">mobx 文档</a> | `mobx` | 轻量数据流控制工具。
<a href="https://dvajs.com/" target="_blank">dvajs 文档</a> | `dvajs` | 基于 redux 和 redux-saga 的数据流方案，蚂蚁。
<a href="https://umijs.org/zh/" target="_blank">UmiJs 文档</a> | `umijs` | 可插拔的企业级 react 应用框架，蚂蚁。
<a href="http://rekit.js.org" target="_blank">Rekit 文档</a> | `rekit` | React/Redux/React-router开发工具/IDE。
<a href="https://nextjs.org/" target="_blank">NextJs 文档</a> | `nextjs` | 轻量级的 React 服务端渲染应用框架。
<a href="https://www.gatsbyjs.cn/" target="_blank">Gatsby.js 文档</a> | `gatsbyjs` | 轻量级的 React 静态网站搭建框架。
<a href="https://github.com/streamich/react-use" target="_blank">React-use 文档</a> | `react-use` | 好用的React自定义hooks封装库。
<a href="https://cn.mobx.js.org/" target="_blank">Umi Hooks 文档</a> | `umi hooks` | 适用于中台的hooks方法，如请求、拖拽、防抖。
<a href="https://react-query.tanstack.com/docs/overview" target="_blank">react-query 文档</a> | `react-query` | 好用的React ajax接口请求处理封装hook。
<a href="https://github.com/welldone-software/why-did-you-render#readme" target="_blank">why-did-you-render</a> | `why-did-you-render` | 用来检测React组件是否需要重新渲染的工具。
<a href="https://www.framer.com/motion/" target="_blank">framer-motion 官网</a> | `framer-motion` | 非常强大的React动画/交互手势库，来自Farmer API。
<a href="http://danilowoz.com/create-content-loader/" target="_blank">react-content-loader 文档</a> | `create-content-loader` | react版SVG骨架屏插件。
<a href="https://ant.design/docs/react/getting-started-cn" target="_blank">antd 文档</a> | `antd` | ant design，PC UI组件库。
<a href="https://mobile.ant.design/index-cn" target="_blank">antd-mobile 文档</a> | `antd-mobile` | 移动版的antd，UI组件库。
<a href="https://www.styled-components.com/" target="_blank">styled-components 文档</a> | `styled-components` | react的css-in-js实现。
<a href="https://github.com/twobin/react-lazyload" target="_blank">react-lazyload 文档</a> | `react-lazyload` | react版的图片/组件加载插件。
<a href="https://github.com/jamiebuilds/react-loadable#readme" target="_blank">react-loadable</a> | `react-loadable` | 实现react组件构建时代代码抽离和动态加载。
<a href="https://github.com/STRML/react-draggable" target="_blank">react-draggable</a> | `react-draggable` | 一个用于拖拽操作的React封装组件。
<a href="https://github.com/react-dnd/react-dnd#readme" target="_blank">React DND</a> | `react-dnd` | 适用于React的复杂拖拽控制库，基于HTML5拖放API。
<a href="https://github.com/JedWatson/react-tappable" target="_blank">react-tappable</a> | `react-tappable` | 一个用于点击事件操作的React封装组件。
<a href="https://github.com/tajo/react-portal#readme" target="_blank">React-portal</a> | `react-portal` | 一个通过portals定义附加的节点组件渲染工具。
<a href="https://github.com/vkbansal/react-contextmenu" target="_blank">React-contextmenu</a> | `react-contextmenu` | pc端web实现右键菜单的工具组件。
<a href="https://rexxars.github.io/react-markdown/" target="_blank">react-markdown</a> | `react-markdown` | 在react上使用的markdown工具。
<a href="https://github.com/30-seconds/30-seconds-of-react" target="_blank">30s-of-react</a> | `30s-of-react` | 常用React代码模块集合，30s of code系列。
<a href="https://vasanthk.gitbooks.io/react-bits/" target="_blank">React Bits</a> | `react-bits` | 常用React技巧。
<a href="https://docsite.js.org/zh-cn/docs/addDoc.html" target="_blank">docsiteJS</a> | `docsite` | 基于React的文档生成工具。
<a href="http://casesandberg.github.io/react-color/" target="_blank">React Color</a> | `react-color` | 基于React的拾色器插件，模拟Sketch, Photoshop, Chrome, Github, Twitter, Material Design等取色工具。
<a href="http://reactdesktop.js.org/" target="_blank">React Desktop</a> | `react-desktop` | 模拟Mac或windows桌面交互的React封装组件。
<a href="https://www.reactboilerplate.com/" target="_blank">React Boilerplate</a> | `react-boilerplate` | 性能优先的一个典型的React项目模板。
<a href="https://github.com/sstur/react-rte" target="_blank">React RTE</a> | `react-rte` | 富文本编辑器，基于draftJS。

### 1.7 Nodejs和构建
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://www.npmjs.com/" target="_blank">npm</a> | `npm` | node包统一平台。
<a href="https://yarn.bootcss.com/" target="_blank">yarn</a> | `yarn` | 高速的node包管理器。
<a href="https://pnpm.js.org/" target="_blank">pnpm</a> | `pnpm` | 快速高效（安全）的node包统一管理器。
<a href="https://github.com/tj/n" target="_blank">n</a> | `n` | 极度简单的 Nodejs 版本管理工具。
<a href="https://storybook.js.org/" target="_blank">StoryBook</a> | `storybookjs` | 用于独立开发React、Vue和Angular的UI组件库。
<a href="https://unpkg.com/" target="_blank">unpkg</a> | `unpkg` | 国外公共静态资源CDN，适用于 npm 上的所有内容。
<a href="http://nodejs.cn/api/" target="_blank">nodejs api</a> | `node` | Node官方文档。
<a href="https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts" target="_blank">Deno api</a> | `deno` | Deno官方文档（Nodejs.next）。
<a href="https://bun.sh/">Bun</a> | `bun` | 号称比Nodejs快3倍的js runtime容器。
<a href="https://lerna.js.org/" target="_blank">Lerna</a> | `lerna` | 好用的多包管理工具，monorepo。
<a href="https://github.com/ds300/patch-package#readme" target="_blank">patch-package</a> | `patch-package ` | 给node_modules打补丁的工具包。
<a href="https://v8.dev/docs" target="_blank">V8 dev docs</a> | `V8` | js V8引擎文档。
<a href="https://v8docs.nodesource.com/node-10.6/index.html" target="_blank">V8</a> | `v8` |  V8引擎介绍。
<a href="https://github.com/bellard/quickjs" target="_blank">QuickJs</a> | `quickjs` |  一款轻量级js引擎。
<a href="https://github.com/GoogleChromeLabs/jsvu" target="_blank">jsvu</a> | `jsvu` |  js引擎调试必备，引擎切换及版本控制。
<a href="https://docs.docker.com/" target="_blank">docker</a> | `docker` | 应用容器引擎Docker。
<a href="https://man.linuxde.net/" target="_blank">Linux</a> | `linux` | Linux命令查询手册。
<a href="http://aheckmann.github.io/gm/" target="_blank">GraphicsMagick</a> | `gm` | 后台图片处理工具。
<a href="https://github.com/protobi/js-xlsx/tree/beta#readme" target="_blank">js-xlsx</a> | `js-xlsx` | xlsx的编辑和处理库。
<a href="https://github.com/shelljs/shelljs" target="_blank">ShellJs</a> | `shelljs` | 用nodejs实现shell常用命令。
<a href="https://github.com/chalk/chalk" target="_blank">chalk</a> | `chalk ` | 控制台命令行输出样式工具，主要控制颜色。
<a href="https://github.com/node-schedule/node-schedule" target="_blank">node-schedule</a> | `node-schedule` | 适用于nodejs的定时任务工具。


#### 1.7.1 构建
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://prettier.io/" target="_blank">Prettier</a> | `prettier ` | 对代码无侵害的代码格式化工具。
<a href="https://ejs.bootcss.com/" target="_blank">ejs</a> | `ejs` | 简单上手的html模板引擎。
<a href="http://mustache.github.io/" target="_blank">Mustache</a> | `mustache` | 适用于多语言的html模板库。
<a href="https://pugjs.org/language/includes.html" target="_blank">pug</a> | `pug` | html模板库。
<a href="http://www.nodeclass.com/api/jade.html" target="_blank">jade</a> | `jade` | html模板库。
<a href="https://www.gulpjs.com.cn/docs/" target="_blank">gulp 配置文档</a> | `gulp` | 自动化构建工具。
<a href="https://gulpjs.com/plugins/" target="_blank">gulp plugins</a> | `gulp` | gulp插件中心。
<a href="https://grunt.docschina.org/" target="_blank">grunt 配置文档</a> | `grunt` | 自动化构建工具。
<a href="https://rollupjs.org/guide/en/" target="_blank">rollupjs文档</a> | `Rollup` | 一款ES6模块构建工具。
<a href="https://webpack.docschina.org/" target="_blank">webpack 配置文档</a> | `webpack` | 应用面不能再广的打包工具。
<a href="https://github.com/neutrinojs/webpack-chain" target="_blank">webpack-chain</a> | `webpack-chain` | 链式配置webpack配置的工具。
<a href="https://parceljs.docschina.org/" target="_blank">parceljs 配置文档</a> | `parceljs` | 轻量打包。
<a href="https://www.snowpack.dev/" target="_blank">snowpack 官网</a> | `snowpack` | 无bundle的轻量前端项目构建工具。
<a href="http://babeljs.io/" target="_blank">babel</a> | `babel` | 应用面不能再广的ES编译器。
<a href="https://github.com/fb55/htmlparser2#readme" target="_blank">htmlparser2</a> | `htmlparser2` | 一款html的转AST工具。
<a href="https://github.com/inikulin/parse5/blob/master/packages/parse5/docs/index.md" target="_blank">parse5</a> | `parse5` | 一款html的转AST工具。
<a href="https://github.com/benjamn/recast" target="_blank">recast</a> | `recast` | 一款js转AST的工具。
<a href="https://github.com/airbnb/ts-migrate" target="_blank">ts-migrate</a> | `ts-migrate` | 一款js转ts(TypeScript)的工具。
<a href="https://github.com/kimmobrunfeldt/concurrently#readme" target="_blank">Concurrently</a> | `concurrently` | 一款Nodejs的命名行控制工具，实现同时运行多条命令。
<a href="https://github.com/evanw/esbuild" target="_blank">esbuild</a> | `esbuild` | 一款极快的js打包和压缩工具。
<a href="https://github.com/addyosmani/critical#readme" target="_blank">critical</a> | `critical` | 一款从HTML中提取相关CSS的工具。
<a href="https://modernjs.dev/" target="_blank">ModernJS</a> | `modernjs` | 前端工程化体系工具，字节跳动。

#### 1.7.2 服务端
地址 | 标签 | 说明
---- | ---- | ----
<a href="http://www.expressjs.com.cn/" target="_blank">express 配置文档</a> | `express` | 轻量web应用程序开发框架。
<a href="https://koajs.cn/#-application-" target="_blank">Koa 文档</a> | `koajs` | web应用程序开发框架。
<a href="https://www.fastify.io/" target="_blank">Fastify 官网</a> | `fastify` | 标称当代最快的轻量web应用程序开发框架，重点是JSON schema加速。
<a href="http://www.midwayjs.org/" target="_blank">Midway 官网</a> | `midway` | 支持了 Web / 全栈 / 微服务 / RPC / Socket / Serverless 的 web 应用程序开发框架，阿里淘系。
<a href="https://docs.feathersjs.com/" target="_blank">feathers.js</a> | `feathersjs` | 轻量web应用程序开发框架，适用于数据流型。
<a href="https://docs.nestjs.com/" target="_blank">Nest.js</a> | `nestjs` | 强大的Web应用框架。
<a href="https://github.com/nuysoft/Mock/wiki" target="_blank">Mockjs 配置文档</a> | `mockjs` | 接口数据模拟工具，可以在客户端和服务端使用。
<a href="https://sheetjs.com/" target="_blank">SheetJs</a> | `sheetjs` | 通过node操作word的工具。
<a href="https://github.com/parallel-js/parallel.js" target="_blank">ParallelJs</a> | `paralleljs` | 并行处理js的工具，可用于浏览器和node服务端。
<a href="https://parall.ax/products/jspdf" target="_blank">js-pdf</a> | `js-pdf` | 通过node操作生成pdf的工具。
<a href="http://doc.pm2.io/en/plus/overview/" target="_blank">pm2</a> | `pm2` | node进程管理。
<a href="https://github.com/Marak/colors.js" target="_blank">colors.js</a> | `colorsjs` | node log控制台输出颜色控制。
<a href="https://log4js-node.github.io/log4js-node/" target="_blank">log4.js</a> | `log4js` | log日志工具。
<a href="https://nwjs.io/" target="_blank">nw.js</a> | `nwjs` | 基于nodeJs和chromium的应用程序运行环境，允许您直接从DOM调用所有Node.js模块。
<a href="https://github.com/archiverjs/node-archiver" target="_blank">node-archiver</a> | `node-archiver` | 支持ZIP/TAR文档流传输和接收插件。
<a href="https://github.com/thejoshwolfe/yazl" target="_blank">yazl</a> | `yazl` | 压缩zip插件，对应解压为[yauzl](https://github.com/thejoshwolfe/yauzl)。
<a href="https://sailsjs.com/" target="_blank">SailsJs</a> | `sailsjs` | 好用的MVC nodejs框架。
<a href="https://helmetjs.github.io/" target="_blank">Helmet中间件</a> | `helmet` | 通过设置响应头header保护express服务应用。
<a href="https://github.com/expressjs/cors#readme" target="_blank">Cors中间件</a> | `cors` | Nodejs的Cors中间件。
<a href="https://github.com/expressjs/body-parser#readme" target="_blank">Body-parser中间件</a> | `body-parser` | Nodejs的请求流解析中间件。
<a href="http://restify.com/" target="_blank">Restify</a> | `restify` | Nodejs的Web服务框架。
<a href="https://github.com/expressjs/multer#readme" target="_blank">Multer</a> | `multer` | 用于处理上传文件的Nodejs中间件。
<a href="https://github.com/node-cache/node-cache" target="_blank">Node-cache</a> | `node-cache` | 一个Nodejs的缓存控制模块。
<a href="https://socket.io/" target="_blank">Socket.IO</a> | `socket.io` | WebSocket解决方案。
<a href="https://github.com/websockets/ws" target="_blank">ws</a> | `ws` | WebSocket的一个nodejs包。
<a href="https://github.com/digitalocean/nginxconfig.io" target="_blank">nginxconfig.io</a> | `nginxconfig.io` | 在线生成nginx配置的工具。
<a href="https://github.com/davidmarkclements/fast-safe-stringify#readme" target="_blank">fast-safe-stringify</a> | `fast-safe-stringify` | 安全快速地序列化JSON，替代JSON.stringify。


#### 1.7.3 GraphQL
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://graphql.org/graphql-js/" target="_blank">Graphql-js</a> | `graphql` | GraphQL的js实现。
<a href="https://github.com/hasura/graphql-engine" target="_blank">hasura graphql-engine</a> | `hasura` | 一款强大的GraphQL引擎方案。
<a href="https://github.com/apollographql/apollo-client" target="_blank">apollo-client</a> | `apollo-client` | 适用于每个UI框架和GraphQL服务器的方案。

#### 1.7.4 微前端
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://single-spa.js.org/" target="_blank">single-spa</a> | `single-spa` | 以路由配置为主要特点的微前端解决方案。
<a href="https://qiankun.umijs.org/zh/" target="_blank">qiankun</a> | `qiankun` | 蚂蚁系微前端框架，基于single-spa。
<a href="https://webpack.docschina.org/concepts/module-federation/" target="_blank">Module Federation</a> | `module-federation` | 构建时共享模块为主要特点的微前端解决方案，webpack（5）的实现。
<a href="https://fronts.js.org/" target="_blank">R/Fronts</a> | `fronts` | 渐进式微前端框架，基于webpack module-federation。
<a href="https://github.com/jsdom/jsdom" target="_blank">jsdom</a> | `jsdom` | 在node环境上实现DOM操作的封装库。

#### 1.7.5 云和Serverless
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://wasmedge.org/" target="_blank">WasmEdge 官网</a> | `wasmedge` | 一款与WebAssembly有关的云原生及serverless框架。
<a href="https://www.serverless.com/" target="_blank">Serverless Framework 官网</a> | `serverless` | 快速建立node Serverless 服务的框架，支持腾讯云 SCF，AWS Lambda等。
<a href="https://aws.amazon.com/cn/campaigns/lambda/" target="_blank">AWS Lambda</a> | `aws-lambda` | 经典，亚马逊amazon serverless计算服务。
<a href="https://qingfuwu.cn/" target="_blank">字节轻服务 官网</a> | `qingfuwu` | 字节轻服务，支持Serverless（FaaS）、CDN等服务，有免费档。
<a href="https://help.aliyun.com/document_detail/154438.html" target="_blank">阿里云 FC</a> | `qingfuwu` | 阿里云函数计算服务，支持Serverless（FaaS）。
<a href="https://cloud.tencent.com/document/product/583" target="_blank">腾讯云 SFC</a> | `qingfuwu` | 腾讯云云函数服务，支持Serverless（FaaS）。

#### 1.7.6 低代码LowCode

地址 | 标签 | 说明
---- | ---- | ----
<a href="https://lowcode-engine.cn/" target="_blank">lowcode-engine</a> | `lowcode-engine` | 阿里开源低代码引擎。
<a href="https://weda.cloud.tencent.com/" target="_blank">微搭</a> | `weda` | 腾讯低代码引擎，微搭。
<a href="https://aisuda.bce.baidu.com/amis/zh-CN/docs/index">amis</a> | `amis` | 百度开源低代码引擎，适用于偏中后台项目。





### 1.8 Hybird和跨端
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps" target="_blank">pwa</a> | `pwd` | 渐进式web应用。
<a href="https://developers.weixin.qq.com/miniprogram/dev/" target="_blank">微信小程序官网</a> | `小程序/hybird` | 微信小程序开发官网。
<a href="https://docs.alipay.com/mini/developer/getting-started" target="_blank">支付宝小程序官网</a> | `小程序/hybird` | 支付宝小程序开发官网。
<a href="https://smartprogram.baidu.com/developer/index.html" target="_blank">百度小程序官网</a> | `小程序/hybird` | 百度小程序开发官网。
<a href="https://wepyjs.github.io/wepy-docs/" target="_blank">wepy文档</a> | `小程序/hybird` | vue语法的小程序开发官网。
<a href="https://github.com/opendigg/awesome-github-wechat-weapp" target="_blank">小程序工具集合</a> | `小程序/hybird` | 小米轻应用开发官网。
<a href="https://dev.mi.com/doc/?page_id=2303" target="_blank">小米轻应用官网</a> | `轻应用/hybird` | 小米轻应用开发官网。
<a href="https://www.quickapp.cn/" target="_blank">Oppo/vivo快应用官网</a> | `轻应用/hybird` | Oppo/vivo轻应用开发官网。
<a href="https://developer.huawei.com/consumer/cn/quickApp" target="_blank">华为快应用官网</a> | `轻应用/hybird` | 华为轻应用开发官网。
<a href="https://reactnative.cn/" target="_blank">React-native 文档</a> | `跨端` | 热门的react语法跨端工具，RN。
<a href="https://github.com/NativeScript/NativeScript" target="_blank">NativeScript</a> | `跨端` | 国外一款流行的跨端开发框架，支持Angular/Vue/Svelte/React。
<a href="https://github.com/ionic-team/ionic-framework" target="_blank">ionic-framework</a> | `跨端` | 一个强大的跨平台UI工具包，用于使用HTML，CSS和JavaScript构建本机质量的iOS，Android和PWA。
<a href="https://github.com/quasarframework/quasar" target="_blank">quasar-framework</a> | `跨端` | 构建一流的高性能的Vue响应式网站、PWA、SSR、移动和桌面应用
<a href="https://weex.apache.org/zh/" target="_blank">Weex文档</a> | `跨端` | 前几年热门的vue语法跨端工具，现在都不维护了。
<a href="https://alibaba.github.io/weex-ui/#/cn/" target="_blank">Weex-UI文档</a> | `跨端/weex` | weex的UI组件库。
<a href="https://taro.jd.com/" target="_blank">Taro文档</a> | `小程序/跨端` | 跨web/小程序/原生的react语法跨端工具，runtime跨端模式。
<a href="https://taro.jd.com/" target="_blank">Rax文档</a> | `小程序/跨端/Flutter` | 跨web/小程序/Flutter的react语法跨端工具，阿里。
<a href="https://wechat-miniprogram.github.io/kbone/docs/" target="_blank">Kbone文档</a> | `小程序/跨端` | 跨web/小程序跨端构建插件，成本低，适配各类web框架，腾讯。
<a href="https://hippyjs.org/" target="_blank">Hippy文档</a> | `跨端` | 腾讯的一款混合跨端框架。
<a href="https://uniapp.dcloud.io/" target="_blank">uni-app文档</a> | `小程序/跨端` | 跨web/小程序/原生的vue语法跨端工具。
<a href="https://github.com/remaxjs/remax" target="_blank">Remax文档</a> | `remax` | React语法跨web/小程序工具，类似于taro-next(3)的跨端模式，对小程序友好，支付宝。
<a href="https://ant-move.github.io/guide/" target="_blank"> Antmove </a> | `antmove` | 小程序转换器，基于支付宝/微信小程序转换为多端小程序，高德。
<a href="https://guoshuyu.cn/home/wx/Flutter-1.html" target="_blank">Flutter文档</a> | `跨端` | 超火的Dart语法的跨端开发工具。
<a href="http://electronjs.org/docs" target="_blank">Electron文档</a> | `跨端` | PC、windows/Mac应用的开发。
<a href="http://electronjs.org/docs" target="_blank">WebView2文档</a> | `跨端` | PC、windows应用的开发，微软。
<a href="https://wendux.github.io/dist/#/doc/flyio/readme" target="_blank">flyio(fly)文档</a> | `fly` | 支持Web、Node.js 、微信小程序 、Weex 、React Native 、Quick App的请求封装库。
<a href="https://github.com/icindy/wxParse" target="_blank">wxParse</a> | `wxParse ` | 微信小程序富文本解析组件，支持Html及markdown转wxml可视化（但是目前已停止维护）。
<a href="https://developer.chrome.com/extensions" target="_blank">chrome extension</a> | `chrome-extension` | Chrome拓展程序官方文档。
<a href="https://github.com/sxei/chrome-plugin-demo" target="_blank">chrome-plugin-demo</a> | `chrome-plugin, chrome-extension` | 一篇很好的Chrome拓展程序开发教程，有demo。

### 1.9 辅助工具
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://stackoverflow.com/" target="_blank">stackoverflow.com</a> | `stackoverflow` | 技术问题排忧解难的友好社区。
<a href="https://bundlephobia.com/" target="_blank">bundlephobia.com</a> | `bundlephobia` | 分析npm软件包的体积和加载性能的网站。
<a href="https://www.typescriptlang.org/dt/search?search=" target="_blank">Ts声明文件查询</a> | `joi` | 各类库的TypeScript声明文件查询网站。
<a href="http://deerchao.net/tutorials/regex/regex.htm" target="_blank">正则表达式30分钟</a> | `regexp` | 正则上手教程。
<a href="https://regexper.com/" target="_blank">在线正则验证</a> | `regexper` | 可视化在线正则验证网站。
<a href="http://wproxy.org/whistle/install.html" target="_blank">whistle</a> | `whistle` | web调试代理工具。
<a href="https://astexplorer.net/" target="_blank">AST explorer</a> | `astexplorer` | css/html/js/ts等语言的在线ast解析工具。
<a href="https://github.com/typicode/husky#readme" target="_blank">husky</a> | `Husky` | NodeJS上的git工具。
<a href="https://cn.eslint.org/" target="_blank">eslint 文档</a> | `eslint` | js代码检查工具。
<a href="https://visualgo.net/en" target="_blank">visualgo</a> | `Visualgo` | 可视化算法查询。
<a href="https://visualgo.net/en" target="_blank">visualgo</a> | `Visualgo` | 可视化算法查询。
<a href="http://yisibl.github.io/cubic-bezier/#.48,1.06,1,1.45" target="_blank">动画曲线查询</a> | `cubic` | 动画曲线查询网站（ease/linear...）
<a href="https://dev.w3.org/html5/html-author/charref" target="_blank">Character Entity Reference Chart</a> | `charref` | 字符标点的转义字符查询。
<a href="https://www.colorzilla.com/gradient-editor/" target="_blank">gradient-editor</a> | `gradient-editor` | CSS渐变样式生成工具。
<a href="https://valine.js.org/cdn.html" target="_blank">valineJS</a> | `valine` | 评论系统工具。
<a href="http://gittalk.com.cutestat.com/" target="_blank">GitTalk</a> | `gittalk` | github的评论工具。
<a href="https://github.com/Coding/WebIDE" target="_blank">webIDE</a> | `webide` | web上写代码。
<a href="https://hiroppy.github.io/fusuma/" target="_blank">Fusuma</a> | `fusuma` | 用markdown写web ppt。
<a href="https://stackedit.io/" target="_blank">stackedit</a> | `stackedit ` | 在浏览器中运行的Markdown编辑器。
<a href="https://vuepress.vuejs.org/zh/" target="_blank">VuePress</a> | `vuepress` | 用markdown写文档/博客
<a href="https://hexo.io/zh-cn/" target="_blank">Hexo</a> | `hexo` | 用markdown写文档/博客
<a href="https://d.umijs.org/" target="_blank">dumi</a> | `dumi` | 适合写前端开发文档的工具，markdown，蚂蚁
<a href="https://www.materialui.co/colors" target="_blank">materialui</a> | `materialui` | 快速色值选择
<a href="https://carbon.now.sh/" target="_blank">carbon</a> | `carbon` | 生成写博客时代码的美腻截图
<a href="https://tinypng.com/" target="_blank">tinypng</a> | `Tinypng` | 压缩png和jpeg图片
<a href="https://github.com/svg/svgo" target="_blank">svgo</a> | `svgo` | 压缩SVG图形文件工具
<a href="https://jakearchibald.github.io/svgomg/" target="_blank">svgomg</a> | `SVGOMG` | 压缩SVG图形
<a href="https://imagemagick.org/index.php" target="_blank">ImageMagick</a> | `imagemagick` | 后台运用极广的图片处理工具。
<a href="https://github.com/javierbyte/img2css" target="_blank">img2css</a> | `img2css` | 一个有趣的库，利用box-shadow将图片以CSS的方式呈现。
<a href="https://www.whatfontis.com/" target="_blank">whatfontis.com</a> | `whatfontis` | 识别图片上的字体不过限于英文字体，需要注册。
<a href="https://ps.gaoding.com/#/" target="_blank">ps.gaoding.com</a> | `ps` | 强大的在线Photoshop。
<a href="https://avocode.com/convert-psd-to-sketch?ref=producthunt" target="_blank">convert-psd-to-sketch avocode</a> | `avocode` | psd一键转sketch。
<a href="https://jakearchibald.github.io/svgomg/" target="_blank">svgomg</a> | `svgomg` | 在线svg优化及预览。
<a href="https://code2flow.com/" target="_blank">code2flow</a> | `code2flow` | 在线伪码转流程图工具。
<a href="https://tool.lu/json/" target="_blank">tool.lu-json</a> | `json` | 在线json格式化工具。
<a href="https://tool.lu/js/" target="_blank">tool.lu-js</a> | `js` | 在线js格式化/混淆/压缩工具。
<a href="https://tool.lu/css/" target="_blank">tool.lu-css</a> | `css` | 在线css格式化/压缩/响应式单位处理工具。
<a href="https://tool.lu/coderunner/" target="_blank">tool.lu-coderunner</a> | `coderunner` | 在线php/c/c++/python/go/js/java/bash代码执行工具。
<a href="https://www.diffchecker.com/" target="_blank">diffchecker.com</a> | `diffchecker` | 在线文本/文件diff工具。
<a href="https://isoflow.io/" target="_blank">isoflow.io</a> | `isoflow` | 在线流程图绘制工具。
<a href="https://github.com/n8n-io/n8n" target="_blank"> n8n </a> | `n8n` | 基于自由和开放的公平代码许可节点的工作流自动化工具。轻松自动化跨不同服务的任务。
<a href="https://zijian.aliyun.com/detect/dns/DNS_PING-d31c5446aff9db99decd9d9d944b11c5-1640605424801" target="_blank"> 阿里云 DNS检测 </a> | `dns` | 域名DNS检测网站工具，阿里云。
<a href="https://tabatkins.github.io/railroad-diagrams/generator.html" target="_blank"> Railroad Diagrams </a> | `railroad-diagrams` | 在线绘制铁路图的网站工具。
<a href="https://unbug.github.io/codelf/" target="_blank">CodeIf</a> | `codeIf` | 帮助解决命名困难的命名搜索工具。

### 1.10 测试、安全及加密
#### 1.10.1 单元测试
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://mochajs.org/" target="_blank">MochaJS文档</a> | `mocha` | 一款单元测试工具。
<a href="https://jestjs.io/zh-Hans/" target="_blank">JestJS文档</a> | `jest` | 一款单元测试工具。
<a href="https://www.cypress.io/" target="_blank">Cypress官网</a> | `cypress` | 一款单元测试集成平台工具。
<a href="https://github.com/avajs/ava" target="_blank">AvaJs</a> | `avajs` | 一款快速的测试工具。
<a href="https://enzymejs.github.io/enzyme/" target="_blank">enzyme官网</a> | `enzyme` | 一款React单元测试工具，可以测hook。
<a href="https://github.com/marmelab/gremlins.js" target="_blank">gremlins.js</a> | `gremlins` | 一款node及浏览器的Monkey Test工具。
<a href="https://uptime.kuma.pet/" target="_blank">uptime-kuma</a> | `uptime-kuma` | 一款开源的、基于puppeteer的指标监控平台。


#### 1.10.2 安全及加密知识
<p><a href="https://github.com/veeral-patel/how-to-secure-anything" target="_blank">《How to Secure Anything》</a></p>
<p><a href="https://github.com/brix/crypto-js" target="_blank">crypto-js 前端数据加密工具</a></p>
<p><a href="https://cloud.tencent.com/developer/article/1136202" target="_blank">《浅谈前端安全》</a></p>
<p><a href="http://blog.michealwayne.cn/2020/04/19/safety/%E3%80%90%E6%80%BB%E7%BB%93%E3%80%91%E5%86%8D%E8%B0%88%E5%89%8D%E7%AB%AF%E5%AE%89%E5%85%A8/" target="_blank">《再谈前端安全》</a></p>
<p><a href="https://mawei.blog/post/frontend-security-vulnerabilities-part1/" target="_blank">《8大前端安全问题》</a></p>
<p><a href="https://juejin.im/post/5c452021518825242062979f" target="_blank">《前端加密那点事》</a></p>
<p><a href="https://zhuanlan.zhihu.com/p/38278311" target="_blank">《HTTPS 到底加密了什么？》</a></p>
<p><a href="https://juejin.im/post/5b6d579cf265da0f6e51a7e0" target="_blank">《Web 端反爬虫技术方案》</a></p>
<p><a href="https://juejin.im/entry/5bc93545e51d450e5f3dceff" target="_blank">《那些我们该讨论的前端加密方法》</a></p>


#### 1.10.3 Debug
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://github.com/Tencent/vConsole" target="_blank">vConsole</a> | `vconsole` | 被誉为移动端的web开发者工具。
<a href="https://www.fundebug.com/" target="_blank">FunDebug</a> | `FunDebug` | 简单的项目debug监控工具，有免费版
<a href="http://www.webfunny.cn/" target="_blank">Webfunny</a> | `webfunny_monitor` | 统一的前端异常监控解决方案。
<a href="https://github.com/typicode/json-server" target="_blank">json-server</a> | `json-server` | 一款通过本地起服务的快速mock工具。

#### 1.10.4 质量检测
地址 | 标签 | 说明
---- | ---- | ----
<a href="http://www.jslint.com/" target="_blank">JSLint js代码检查</a> | `jslint` | 一个JavaScript验证工具
<a href="https://jshint.com/" target="_blank">JSHint js代码检查</a> | `jshint` | 一个JavaScript验证工具
<a href="https://eslint.org/" target="_blank">ESLint js代码检查</a> | `eslint` | 一个JavaScript验证工具
<a href="http://csslint.net/" target="_blank">CSSLint css代码检查</a> | `csslint` | 一个CSS验证工具
<a href="https://validator.w3.org/" target="_blank">Markup Validation Service</a> | `validator` | 在线HTML验证网站
<a href="https://flow.org/" target="_blank">Flow js代码检查</a> | `flow` | 一个JavaScript代码检查工具
<a href="https://www.sonarlint.org/vscode/" target="_blank">SonarLint vscode</a> | `sonarlint` | js/ts工程代码质量验证的vscode插件
<a href="https://github.com/google/eng-practices" target="_blank">Google eng-practices</a> | `eng-practices` | 谷歌工程实践文档
<a href="https://github.com/cheeriojs/cheerio#readme" target="_blank">Cheerio</a> | `cheerio` | 用于web抓取的工具。
<a href="https://pptr.dev/" target="_blank">Puppeteer官网</a> | `puppeteer` | 基于chromium的无头浏览器，可用于爬虫等web自动化。
<a href="https://www.selenium.dev/" target="_blank">Selenium官网</a> | `selenium` | 强大的用于Web应用程序测试的工具。
<a href="https://github.com/GoogleChrome/lighthouse" target="_blank">Lighthouse</a> | `lighthouse` | Google标准的web性能检测工具，Chrome自带。
<a href="https://github.com/nolanlawson/fuite" target="_blank">Fuite</a> | `fuite` | web内存检测工具，基于puppeteer。


### 1.11 IDE插件

#### 1.11.1 VS Code

地址 | 标签 | 说明
---- | ---- | ----
<a href="https://marketplace.visualstudio.com/" target="_blank">MarketPlace</a> | `marketplace` | 插件首页
<a href="https://vscode.dev/" target="_blank">VSCode在线</a> | `VSCode` | VSCode在线版
<a href="https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight" target="_blank">Color Highlight</a> | `color-highlight` | 颜色预览。
<a href="https://marketplace.visualstudio.com/items?itemName=SimonSiefke.svg-preview" target="_blank">Svg Preview</a> | `svg-preview` | SVG图形预览。
<a href="https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker" target="_blank">Code Spell Checker</a> | `code-spell-checker` | 代码单词拼写校验。
<a href="https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify" target="_blank">Beautify</a> | `beautify` |  javascript, JSON, CSS, Sass, 和HTML格式优化。
<a href="https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks" target="_blank">Bookmarks</a> | `bookmarks` |  看代码神器，代码书签。
<a href="https://marketplace.visualstudio.com/items?itemName=2gua.rainbow-brackets" target="_blank">Rainbow Brackets</a> | `rainbow-brackets` |  开发必备，括号颜色区分。
<a href="https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-stylefmt" target="_blank">stylefmt</a> | `stylefmt` |  css格式化。
<a href="https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome" target="_blank">Debugger For Chrome</a> | `debugger-for-chrome` |  vscode和chrome联调插件，本地开发必备。
<a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint" target="_blank">Eslint</a> | `eslint` |  js检查。
<a href="https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint" target="_blank">stylelint</a> | `stylelint` |  css/less/scss检查。
<a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin" target="_blank">TypeScript Tslint Plugin</a> | `typescript-tslint-plugin` |  TypeScript检查。
<a href="https://marketplace.visualstudio.com/items?itemName=octref.vetur" target="_blank">vetur</a> | `vetur` |  Vue开发工具。
<a href="https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code" target="_blank">Dart</a> | `dart-code` |  Dart语言开发支持。
<a href="https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter" target="_blank">Flutter</a> | `Flutter` |  Flutter开发适配。
<a href="https://marketplace.visualstudio.com/items?itemName=abusaidm.html-snippets" target="_blank">HTML Snippets</a> | `html-snippets` |  HTML标签快速开发。
<a href="https://marketplace.visualstudio.com/items?itemName=maximetinu.identical-sublime-monokai-csharp-theme-colorizer" target="_blank">Identical Sublime Monokai</a> | `identical-sublime-monokai` |  本人还是习惯sublime的风格。
<a href="https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint" target="_blank">Markdownlint</a> | `markdownlint` |  markdown检查。
<a href="https://marketplace.visualstudio.com/items?itemName=HookyQR.minify" target="_blank">Minify</a> | `minify` |  js/css直接压缩。
<a href="https://marketplace.visualstudio.com/items?itemName=pnp.polacode" target="_blank">polacode</a> | `polacode` | 代码截图的vscode IDE插件
<a href="https://gitlens.amod.io/" target="_blank">GitLens</a> | `gitlens` | git源代码管理插件
<a href="https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager" target="_blank">Project Manager</a> | `project-manager` | 本地项目管理
<a href="https://marketplace.visualstudio.com/items?itemName=sburg.vscode-javascript-booster" target="_blank">JavaScript Booster</a> | `javascript-booster` | js/ts快速重构优化工具，比如将var换为const/let。

### 1.12 生活篇


地址 | 标签 | 说明
---- | ---- | ----
<a href="https://github.com/Anduin2017/HowToCook" target="_blank">HowToCook</a> | `HowToCook` | 程序员在家做饭方法指南。
<a href="https://github.com/geekan/HowToLiveLonger" target="_blank">HowToCook</a> | `HowToLiveLonger` | 程序员延寿指南。



------------------


## FE-Tools - Chrome插件

![chrome-ext.png](https://blog.michealwayne.cn/images/fe-tools/chrome-ext.png)

### 功能：
- 工具网站搜索（`√`）
- 本地收藏夹网站搜索（`√`）
- CSS属性/Moo-CSS搜索（`√`）
- url转二维码及svg矢量图（`√`）
- 图片压缩及转base64（`√`）
- px/rem/vw换算计算器（`√`）
- rgb/hsb/hex色值换算（`√`）
- 快速翻译（`√`）
- 简易Postman（`√`）
- 常用正则查询（`√`）
- 工具函数库搜索
- 搜索自定义拓展

[前往>>](https://github.com/MichealWayne/fe-tools/tree/master/chrome-extension)

### 安装方式

clone本仓库到本地，在`“扩展程序”界面`点击`“加载已解压的拓展程序”`选择本地仓库目录下的chrome-extension目录。

------------------

## 2.fe-tools方法/工具库

```
└─fe-templates 
    ├─react
    ├─vue
    ├─webpack+ts
    └─webpack   
└─utils
    ├─utils
    ├─webAPI
    ├─node-utils
    └─node-img-build
```


### 2.1 utils说明

#### utils 基础工具库
前端开发常用样式、方法，适用于浏览器/Nodejs。

#### webAPI 浏览器端封装库
浏览器端DOM操作，CSS操作，事件处理等封装，适用于浏览器。

#### node-utils Nodejs基础工具库
Nodejs文件，事件处理等封装。

#### node-img-build Nodejs图片工具
webp、base64等图片处理封装。

> todo: 小程序封装，构建封装，图片处理封装优化。

### 2.2 --nodejs 服务端、脚本--

已拆分至packages和fe-templates。

#### 2.3 fe-templates 典型项目模版

- gulp+webpack
- webpack
- webpack + ts
- vue
- react


### 更新信息
- 2022.07.23：调整utils；更新链接；
- 2022.06.18：更新utils（node-utils）；更新链接；
- 2022.05.17：更新utils（webApi、增加描述）；更新链接；
- 2022.04.26：修复utils；更新链接；
- 2022.03.26：更新utils；更新链接；
- 2022.02.19：调整/更新链接；
- 2022.01.16：调整/更新链接；typebuild项目模版依赖处理；
- 2021.12.26：调整/更新链接；
- 2021.09.30：更新/增加链接；模版依赖修复；
- 2021.08.31：修改封装函数；增加链接；
- 2021.07.31：更新/增加链接；
- 2021.03.20：更新Moo-datas；
- 2020.12.22：Chrome拓展插件增加正则模块；
- 2020.12.07：优化Chrome拓展插件，增加简易Postman；
- 2020.09.15：js utils库转为ts utils；
- 2019.04.28：新增storage封装；新增下拉刷新、数字键盘原生组件；
