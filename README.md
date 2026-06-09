# fe-tools

> 前端开发工具集：常用文档网站、样式/js方法封装库（ts）、典型项目模板。[English README>>](./README-en.md)

<a title="前端开发常用文档/网站地址、样式/js方法封装库、项目模板" href="https://blog.michealwayne.cn/fe-tools/stable/#fe-tools" target="_blank"><img style="display: block; margin: 0 auto; width: 50%;" src="https://blog.michealwayne.cn/images/fe.jpg"/></a>

------------------


## 1. 常用网站
目录：
- [1.1 HTML/CSS/JavaScript](#11-htmlcssjavascriptwasmdart)
- [1.2 兼容/查询](#12-兼容查询)
- [1.3 CSS工具](#13-css工具)
- [1.4 JS插件/库](#14-js插件库)
- [1.5 Vue](#15-vue)
- [1.6 React](#16-react)
- [1.7 NodeJS和构建](#17-NodeJS和构建)
- [1.8 Hybird和跨端](#18-hybird和跨端)
- [1.9 辅助工具](#19-辅助工具)
- [1.10 测试、安全及加密](#110-测试安全及加密)
- [1.11 AI人工智能库](#111-AI人工智能库)
- [1.12 WebAssembly](#112-webassembly)
- [1.13 IDE插件](#113-ide插件)
- [1.14 Web3/区块链](#114-web3区块链)
- [1.15 生活篇](#115-生活篇)

> 注：一些选型可以考虑先问 [Deepseek](https://chat.deepseek.com/) / [chatGPT](https://chat.openai.com/chat) / [Claude](https://claude.ai/chats) / [Kimi](https://kimi.moonshot.cn/)，然后根据回答信息进行综合判断



### 1.1 HTML/CSS/JavaScript/WASM/Dart
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://developer.mozilla.org/zh-CN/docs/Web" target="_blank">MDN 文档手册</a> | `html/css/js` | Mozilla出品的一个很全很有用的前端查询/学习网站。
<a href="https://developer.mozilla.org/en-US/plus/ai-help" target="_blank">MDN AI助手</a> | `html/css/js` | MDN文档的AI问答机器人。
<a href="https://www.w3.org/" target="_blank">W3C官网</a> | `html/css/js` | W3C官方标准。
<a href="https://www.w3schools.com/" target="_blank">W3C学习网站</a> | `w3cschool` | W3C School，国际热门的web开发学习网站，适合入门。
<a href="https://www.w3.org/Style/CSS/" target="_blank">W3C CSS</a> | `w3c-css` | W3C CSS规范文档。
<a href="https://www.runoob.com/cssref/css-reference.html" target="_blank">css属性参考手册</a> | `css` | 快速查询css属性及基本使用。
<a href="https://www.canvasapi.cn/" target="_blank">canvas api速查手册</a> | `canvas` | canvas API方法集合。
<a href="https://www.w3.org/Graphics/SVG/" target="_blank">W3C官网-SVG</a> | `svg` | W3C官网，SVG文档（左侧RECOMMENDATIONS）。
<a href="http://www.t086.com/code/vml/" target="_blank">VML 参考手册</a> | `VML(IE)` | 历史参考：IE6/IE7 时代的图形绘制技术，适合理解旧项目兼容方案，不建议新项目使用。
<a href="https://www.typescriptlang.org/docs/handbook/intro.html" target="_blank">TypeScript官方手册</a> | `typescript` | TypeScript官方手册。
<a href="https://github.com/type-challenges/type-challenges" target="_blank">TypeScript Challenges</a> | `ts-challenges` | TypeScript Challenges，在线学习/检验自己的ts类型编程水平。
<a href="https://www.ecma-international.org/publications-and-standards/standards/" target="_blank">ECMA standards</a> | `ecma` | ECMAScript 协议标准。
<a href="https://www.ecma-international.org/ecma-262/6.0/" target="_blank">ECMA International(6)</a> | `ES6` | 历史参考：ECMAScript 2015/ES6 官方版本页；现代标准建议以 ECMA-262 最新版和 MDN 为准。
<a href="https://ecma262.docschina.org/" target="_blank">ECMA International(6) 汉化</a> | `ES6` | 历史参考：ECMAScript 中文翻译资料，内容不完整且更新较慢，建议以 ECMA 官方和 MDN 为准。
<a href="http://es6-features.org/" target="_blank">ECMA6 features</a> | `ES6` | 历史参考：ES6 特性演示站点，适合快速回顾 ES6 语法特性；现代新特性建议查 MDN/TC39。
<a href="https://es6.ruanyifeng.com/" target="_blank">ES6入门（阮一峰）</a> | `ES6` | 经典中文入门资料，适合补 ES6 基础；现代 JS 新特性以 MDN/TC39/ECMA-262 最新版为准。
<a href="http://www.html5plus.org/doc/h5p.html" target="_blank">Web API Reference</a> | `html5` | HTML5 web API查询，如摄像头/地理位置。
<a href="https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/Attributes.html#//apple_ref/doc/uid/TP40008058-autocorrect" target="_blank">Safari HTML Ref查询</a> | `html` | Safari webview的HTML标签查询，用于移动web开发，比如某些iOS特殊的属性或表现可以查这个。
<a href="https://webkit.org/status/" target="_blank">WebKit 特性状态查询</a> | `webkit` | WebKit 官网文档，js/css特性状态支持情况查询。
<a href="https://dart.dev/" target="_blank">Dart官网</a> | `dart` | dart语言英文官网。
<a href="https://www.dartcn.com/guides/language/language-tour" target="_blank">Dart中文网</a> | `dart` | dart语言中文学习网。
<a href="https://www.rfc-editor.org/" target="_blank">RFC规范官网</a> | `rfc/http` | RFC协议官网，可查询HTTP协议等内容。
<a href="https://www.iana.org/assignments/media-types/media-types.xhtml" target="_blank">Media Types</a> | `MIME` | 媒体类型列表，MIME。
<a href="https://webassembly.org/" target="_blank">Web Assembly官网</a> | `wasm` | Web Assembly(wasm)英文官网。
<a href="https://wasmtime.dev/" target="_blank">Wasmtime</a> | `wasmtime` | WebAssembly/WASI 运行时，适合了解 WASM 在服务端/边缘侧的运行能力。
<a href="https://github.com/bytecodealliance/jco" target="_blank">jco</a> | `jco` | Bytecode Alliance 的 JavaScript 工具链，可用于 WebAssembly Component Model 与 JS 互操作。
<a href="https://www.wasm.com.cn/" target="_blank">Web Assembly中文网</a> | `wasm` | Web Assembly(wasm)中文网。
<a href="https://docs.krustlet.dev/" target="_blank">Krustlet 官网</a> | `krustlet` | 历史/专项参考：Kubernetes 中运行 WASM workload 的实验性方案，并非常规前端 WASM 框架。

### 1.2 兼容/查询
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://caniuse.com/" target="_blank">can i use</a> | `caniuse` | 使用频率最高的兼容支持查询网站。
<a href="https://github.com/compat-table/compat-table" target="_blank">ES兼容查询</a> | `js` | ECMAScript兼容查询。
<a href="https://wechat-miniprogram.github.io/miniprogram-compat/" target="_blank">微信小程序ES兼容查询</a> | `weapp` | 微信小程序ES api及对应小程序环境版本兼容查询。
<a href="http://iosfonts.com/" target="_blank">iOS字体</a> | `ios font` | iOS系统自带字体支持情况查询。
<a href="https://www.bootcss.com/p/websafecolors/" target="_blank">Web安全色查询</a> | `web color` | 历史参考：216 Web 安全色属于早期显示设备/浏览器兼容概念，现代 UI 设计通常不再作为硬性约束。
<a href="https://gs.statcounter.com/" target="_blank">StatCounter浏览器份额统计</a> | `statcounter` | *StatCounter的浏览器统计报表
<a href="http://tongji.baidu.com/data/browser" target="_blank">浏览器份额统计</a> | `browser` | 第三方参考：百度统计相关浏览器/应用份额数据源，链接可用时可保留，建议与 StatCounter/内部埋点交叉验证。

### 1.3 CSS工具
#### 1.3.1 预处理
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://lesscss.org/" target="_blank">less文档</a> | `less` | 易上手的CSS预处理工具。
<a href="https://sass-guidelin.es/zh/" target="_blank">sass 文档</a> | `sass` | 热门的CSS预处理工具。
<a href="http://stylus-lang.com/" target="_blank">stylus 文档</a> | `stylus` | 功能丰富的CSS预处理工具。
<a href="http://www.zhangxinxu.com/jq/stylus/" target="_blank">stylus 文档(张旭鑫)</a> | `stylus` | stylus中文文档。
<a href="https://asmcss.com/" target="_blank">Assembler CSS 文档</a> | `asmcss` | Assembler CSS 官方文档，Just-in-time。
<a href="https://github.com/parcel-bundler/lightningcss" target="_blank">Lightning CSS</a> | `lightningcss` | Rust 写的超快 CSS parser/transformer/minifier，很多构建链路会用它替代部分 PostCSS/minifier
<a href="https://github.com/tailwindlabs/tailwindcss-typography" target="_blank">Tailwind Typography</a> | `tailwind-typography` | 官方 Prose 排版插件（Markdown/富文本场景常用）
<a href="https://github.com/chakra-ui/panda" target="_blank">Panda CSS</a> | `panda-css` | Build-time、Type-safe 的 CSS-in-JS/原子化方案（设计系统场景热）


#### 1.3.2 后处理
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://postcss.org/" target="_blank">postcss 文档</a> | `postcss` | 被广泛运用的CSS后处理工具，常用于 CSS 转换、插件处理和工程化链路。
<a href="https://github.com/postcss/postcss" target="_blank">postcss 插件</a> | `postcss` | PostCSS 插件生态入口。
<a href="https://github.com/postcss/autoprefixer" target="_blank">autoprefixer</a> | `autoprefixer` | 自动补充浏CSS前缀的后处理工具。
<a href="https://cssnano.co/" target="_blank">cssnano官网</a> | `cssnano` | CSS优化和分解插件。
<a href="https://www.npmjs.com/package/postcss-plugin-px2rem" target="_blank">postcss-plugin-px2rem</a> | `px2rem` | 将px单位转为rem单位的工具。
<a href="https://www.npmjs.com/package/postcss-px-to-viewport" target="_blank">postcss-px-to-viewport</a> | `px2vw` | 将px单位转为vw单位的工具。
<a href="https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env" target="_blank">PostCSS Preset Env</a> | `postcss-preset-env` | cssnext 的现代替代方案，用于将较新的 CSS 语法按目标浏览器转换为可用 CSS。


#### 1.3.3 样式库/模块
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://css.30secondsofcode.org/" target="_blank">30s-of-code(css)</a> | `30s-of-code(css)` | 常用CSS样式模块集合，30s of code系列。
<a href="https://daneden.github.io/animate.css/" target="_blank">animate.css</a> | `animate.css` | CSS3动画库。
<a href="http://ianlunn.github.io/Hover/" target="_blank">Hover.css</a> | `Hover.css` | PC鼠标hover交互动画库。
<a href="https://bulma.io/" target="_blank">bulma.css</a> | `bulma.css` | 一款基于 Flexbox 的轻量级CSS UI库。
<a href="http://cardinalcss.com/" target="_blank">cardinal.css</a> | `cardinal.css` | 历史参考：早期移动优先的 Less 样式库，新项目通常优先 Tailwind/UnoCSS/现代组件库。
<a href="http://bootflat.github.io/index.html" target="_blank">bootflat.css</a> | `bootflat.css` | 历史参考：Bootstrap 3 时代的扁平化风格 SCSS 库，适合旧项目维护。
<a href="https://jamiewilson.io/corpus/" target="_blank">corpus.css</a> | `corpus.css` | 历史参考：小众 SCSS 集合库，新项目建议优先使用现代 CSS 架构或组件库。
<a href="https://github.com/Tencent/weui" target="_blank">weui</a> | `weui` | 微信风格的样式库，腾讯。
<a href="http://www.materializecss.cn/" target="_blank">materialize.css</a> | `materializecss` | Material风格的响应式前端样式框架。
<a href="https://www.muicss.com" target="_blank">mui.css</a> | `MUI` | Material风格的轻量级前端样式框架。
<a href="https://metroui.org.ua/" target="_blank">Metro UI</a> | `Metro UI` | 一款流行的响应式前端样式框架，[React版](https://react.metroui.org.ua/)。
<a href="https://nostalgic-css.github.io/NES.css/" target="_blank">NES.css</a> | `NES.css` | 游戏机像素风格的前端样式框架。
<a href="https://www.getpapercss.com" target="_blank">paper.css</a> | `paper.css` | 手绘风格的前端样式框架。
<a href="http://www.uiplayground.in/css3-icons/" target="_blank">css3 icon</a> | `css3 icon` | 纯CSS实现的图标。
<a href="https://getbootstrap.com/docs/" target="_blank">Bootstrap 文档</a> | `bootstrap` | 经典响应式前端样式框架，仍适合部分后台、官网和原型场景。
<a href="https://www.layui.com/doc/" target="_blank">layui 文档</a> | `layui` | 一款采用自身模块规范编写的前端 UI 框架。
<a href="https://fontawesome.com/" target="_blank">fontawesome</a> | `fontawesome` | 字体图标库。
<a href="https://www.iconfont.cn/" target="_blank">iconfont</a> | `iconfont` | 字体图标库，阿里。
<a href="http://necolas.github.io/normalize.css/" target="_blank">normalize</a> | `normalize` | 相对较优的CSS reset替代方案。
<a href="https://tailwindcss.com/" target="_blank">Tailwind官网</a> | `tailwind` | Utility-first CSS 框架，适合快速构建定制化 UI 和设计系统。
<a href="https://unocss.dev/" target="_blank">Unocss官网</a> | `unocss` | 原子、按需的css模块化引擎、有借鉴tailwind。
<a href="https://vanilla-extract.style/" target="_blank">Vanilla Extract</a> | `vanilla-extract` | TypeScript-first 的零运行时 CSS-in-JS 方案，适合设计系统和组件库。
<a href="https://stylelint.io/" target="_blank">Stylelint</a> | `stylelint` | CSS/SCSS/Less 等样式代码检查工具，现代样式质量门禁常用。


#### 1.3.4 其他
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://qishaoxuan.github.io/css_tricks/" target="_blank">css tricks</a> | `css tricks` | 包括布局、图标、动画等CSS技巧。
<a href="https://en.bem.info/methodology/quick-start/" target="_blank">BEM</a> | `bem` | BEM写法规范。
<a href="https://acss.io/" target="_blank">ACSS</a> | `acss` | Atomic CSS，一种模块化写法规范。
<a href="https://csswizardry.net/talks/2014/11/itcss-dafed.pdf" target="_blank">IT.css</a> | `itcss` | IT CSS，一种组件化写法规范。
<a href="https://glenmaddern.com/articles/css-modules" target="_blank">CSS modules</a> | `css-modules` | 一种CSS样式模块化的解决方案。
<a href="https://github.com/MicheleBertoli/css-in-js" target="_blank">css in js</a> | `css-in-js` | 用写js的方式生成css样式。
<a href="https://github.com/emotion-js/emotion" target="_blank">Emotion</a> | `emotion` | 流行的 CSS-in-JS 库，React 生态常见。
<a href="https://stitches.dev/" target="_blank">Stitches</a> | `stitches` | 现代 CSS-in-JS 方案，适合组件变体和设计系统场景。
<a href="http://blog.michealwayne.cn/Moo-CSS/docs/moocss/#m%E6%A8%A1%E5%9D%97" target="_blank">Moo-CSS</a> | `moo-css` | 一种CSS写法方案。
<a href="https://github.com/l-hammer/You-need-to-know-css" target="_blank">CSS tricks for web developers</a> | `You-need-to-know-css` | CSS技巧集合。
<a href="https://logotyp.us/" target="_blank"> logotyp.us </a> | `logotyp` | 国内外知名企业/商业的logo集合。
<a href="https://uiverse.io/" target="_blank"> uiverse.io </a> | `uiverse` | css样式组件集合，号称“最大的UI开源库”。


### 1.4 JS插件/库
#### 1.4.1 库
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://lodash.com/docs/" target="_blank">LoDash</a> | `lodash` | 广为人知的函数式工具库。
<a href="https://github.com/ramda/ramda" target="_blank">ramda</a> | `ramda` | 比较著名的函数式工具库。
<a href="https://gcanti.github.io/fp-ts/" target="_blank">fp-ts</a> | `fp-ts` | 遵循函数式编程范式的ts封装库。
<a href="https://github.com/rayepps/radash" target="_blank">radash</a> | `radash` | ts函数式工具库。
<a href="https://github.com/toss/es-toolkit" target="_blank">es-toolkit</a> | `es-toolkit` | 面向现代 JS/TS 的高性能工具函数库，可作为 lodash/radash 类工具的现代选择。
<a href="https://underscorejs.org/" target="_blank">UnderscoreJS</a> | `underscorejs` | 红极一时的函数式工具库。
<a href="https://api.jquery.com/" target="_blank">jQueryJs</a> | `jQuery` | 存量维护：经典 DOM/Ajax/插件生态库，老项目常见；新项目通常不作为默认基础库。
<a href="https://zeptojs.com/" target="_blank">ZeptoJs</a> | `Zepto` | 历史参考：早期移动 Web 常用的轻量级 jQuery 替代库，适合旧项目维护。
<a href="https://github.com/basecss/city" target="_blank">city.js</a> | `city` | 全国行政区划分数据文件。
<a href="http://phaser.io/" target="_blank">phaser.js</a> | `phaser` | 2D游戏前端库。
<a href="http://fabricjs.com/" target="_blank">fabric.js</a> | `fabricjs` | 有名的svg和canvas相互转换的封装库。
<a href="https://www.babylonjs.com/" target="_blank">babylon.js</a> | `babylonjs` | 有名的3D游戏/视频框架。
<a href="https://immutable-js.github.io/immutable-js/" target="_blank">immutable-js</a> | `immutable` | 生产环境js的List, Stack, Map, OrderedMap, Set, OrderedSet以及Record数据结构支持，通常用于ReactJs。
<a href="https://github.com/alibaba/GCanvas" target="_blank">GCanvas</a> | `gcanvas` | 轻量的跨平台图形引擎（web/weex/react-native），阿里。
<a href="https://github.com/jayphelps/core-decorators" target="_blank">core-decorators</a> | `core-decorators` | 丰富的装饰器封装库，基于ES2016/2017的装饰器语法。
<a href="https://github.com/prettymuchbryce/http-status-codes" target="_blank">http-status-codes</a> | `http-status-codes` | 枚举 HTTP 状态代码的常量。支持 RFC1945（HTTP/1.0、RFC2616 (HTTP/1.1) 和 RFC2518 (WebDAV)）中定义的所有状态代码。常用于ajax请求处理，ts。
<a href="https://zod.dev/README_ZH" target="_blank">Zodjs</a> | `zod` | 以 TypeScript 为首的模式声明和验证库，可用于数字格式校验及生成ts声明。
<a href="https://github.com/dart-archive/ts2dart" target="_blank">ts2dart</a> | `ts2dart` | 历史参考：TypeScript 转 Dart 的早期工具，已多年未维护，适合了解历史方案，不建议新项目依赖。
<a href="https://github.com/inversify/InversifyJS" target="_blank"> InversifyJS </a> | `inversify` | 一款 js/ts IoC的封装库。
<a href="https://github.com/young-steveo/bottlejs" target="_blank"> BottleJs </a> | `bottlejs ` | 一轻量 js/ts 依赖注入容器库。特点是延迟加载。


#### 1.4.2 数据工具
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://stdlib.io/" target="_blank">stdlib</a> | `stdlib` | js的数学增强库。
<a href="http://winterbe.github.io/streamjs/" target="_blank">StreamJs</a> | `streamjs` | 一款js数据的操作工具。
<a href="https://baconjs.github.io/" target="_blank">BaconJs</a> | `baconjs` | 也是一款js数据的操作工具。
<a href="https://date-fns.org/" target="_blank">Date fns</a> | `date-fns` | 一款模块化支持按需的日期格式化工具。
<a href="https://moment.github.io/luxon/" target="_blank">Luxon</a> | `luxon` | Moment 团队出品的现代日期时间库，适合时区、国际化等场景。
<a href="https://tc39.es/proposal-temporal/docs/" target="_blank">Temporal</a> | `temporal` | JavaScript 日期时间 API 的现代化提案/文档，适合了解未来原生时间处理能力。
<a href="https://day.js.org/" target="_blank">DayJs</a> | `dayjs` | 一款日期格式化的工具，轻量，MomentJS的替代品。
<a href="https://momentjs.com/" target="_blank">MomentJs</a> | `momentjs` | 存量维护：老项目常见日期处理库；新项目建议优先 Day.js、date-fns、Luxon 或 Temporal。
<a href="http://numbrojs.com/" target="_blank">numbro</a> | `numbrojs` | 一款多国语言的数字转化工具。
<a href="http://numeraljs.com/" target="_blank"> NumeralJs</a> | `numeraljs` | 用于格式化和操作数字的 js 库。
<a href="http://openexchangerates.github.io/accounting.js/" target="_blank">accounting.js</a> | `accounting.js` | 数字，金钱的格式化工具。
<a href="http://openexchangerates.github.io/money.js/" target="_blank">money.js</a> | `money.js` | 金钱的汇率转换工具。
<a href="https://github.com/MikeMcl/decimal.js#readme" target="_blank">decimal.js</a> | `decimal.js` | Js精度处理库。
<a href="https://tanstack.com/query/latest" target="_blank">Tanstack Query</a> | `tanstack-query` | 异步状态管理库，支持TS/JS、React、Solid、Vue、Svelte和Angular。
<a href="https://swr.vercel.app/" target="_blank">SWR</a> | `swr` | React 数据请求与缓存 Hooks 库，适合轻量服务端状态场景。



#### 1.4.3 请求、cookie和缓存
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://github.com/axios/axios" target="_blank">axios</a> | `axios` | 高频使用的ajax库。
<a href="https://github.com/github/fetch" target="_blank">fetch</a> | `fetch` | Fetch API 的兼容 polyfill；现代浏览器已原生支持 Fetch，旧环境兼容时再使用。
<a href="https://github.com/webmodules/jsonp" target="_blank">jsonp</a> | `jsonp` | 不用多说，实现jsonp。（axios没有封装jsonp）
<a href="http://medialize.github.io/URI.js/" target="_blank">URI.js</a> | `uri` | URI解析操作的库。
<a href="https://github.com/marcuswestin/store.js/" target="_blank">StoreJs</a> | `storage` | storage的封装库，兼容IE6。
<a href="https://github.com/js-cookie/js-cookie" target="_blank">js-cookie</a> | `js-cookie` | cookie的封装库。
<a href="https://dexie.org/" target="_blank">Dexie.js</a> | `dexiejs` | IndexedDB的封装库。
<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Cache" target="_blank">Cache API</a> | `cache-api` | 浏览器原生缓存 API，常与 Service Worker/PWA 配合使用。
<a href="https://developer.chrome.com/docs/workbox" target="_blank">Workbox</a> | `workbox` | Google 提供的 Service Worker/PWA 缓存策略工具库。
<a href="https://localforage.github.io/localForage/" target="_blank">localForage.js</a> | `localForage` | 基于IndexedDB、WebSQL、localStorage的离线存储库，Mozilla。
<a href="https://addyosmani.com/basket.js/" target="_blank">basket.js</a> | `basket.js` | 历史参考：早期利用 localStorage 缓存 script/css 的方案，现代项目优先 HTTP Cache、Service Worker、Cache API 或 Workbox。


#### 1.4.4 插件
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://www.swiper.com.cn/" target="_blank">swiper.js</a> | `swiper` | 轮播插件。
<a href="https://github.com/jacoborus/nanobar/" target="_blank">nanobar.js</a> | `nanobar` | 绚丽的进度条展示插件，IE7+。
<a href="https://sweetalert.js.org/" target="_blank">sweetalert</a> | `sweetalertjs` | 效果不错的PC alert展示插件。
<a href="https://github.com/lancedikson/bowser" target="_blank">bowserjs</a> | `bowserjs` | 通过ua做的浏览器探测插件。
<a href="https://clipboardjs.com/" target="_blank">clipboard.js</a> | `clipboardjs` | 剪贴板控制插件。
<a href="https://github.com/kazuhikoarase/qrcode-generator/tree/master/js" target="_blank">Qrcode-generator</a> | `qrcode-generator` | 二维码生成工具。
<a href="http://html2canvas.hertzen.com/documentation" target="_blank">html2canvas</a> | `html2canvas` | html转为图片（canvas），即实现网页截图。
<a href="https://www.rrweb.io/" target="_blank">rrweb</a> | `rrweb ` | 基于样式截取的网页“录屏”工具，实现用户操作采集和回放。
<a href="https://github.com/sofish/pen#readme" target="_blank">Pen Editor</a> | `Pen Editor` | 历史参考：早期轻量 Web 编辑器；现代富文本可参考 ProseMirror、Tiptap、Lexical。
<a href="https://nosir.github.io/cleave.js/" target="_blank">cleave.js</a> | `cleave.js` | 一款好用的input输入控制插件。
<a href="https://github.com/jackmoore/autosize" target="_blank">autosize.js</a> | `autosize.js` | 一款好用的`<textarea/>`高度自适应工具。
<a href="https://github.com/eligrey/FileSaver.js" target="_blank">FileSaver.js</a> | `FileSaver.js` | 网页端字符/图片/文件另存为插件。
<a href="http://danml.com/download.html" target="_blank">download.js</a> | `download.js` | 网页端字符/图片/文件另存为插件，比FileSaver快一点。
<a href="https://github.com/mailru/FileAPI" target="_blank">FileAPI.js</a> | `FileAPI` | 控制文件上传的插件。
<a href="https://github.com/alexgibson/shake.js" target="_blank">shake.js</a> | `shake.js` | 移动端摇晃震动监听插件。
<a href="https://atomiks.github.io/tippyjs/" target="_blank">Tippy.js</a> | `tippy.js` | 好用的气泡组件，有React版。
<a href="https://fusejs.io/" target="_blank">fuse</a> | `fusejs` | 轻量、好用的js模糊搜索库。
<a href="https://minisearch.dev/" target="_blank">MiniSearch</a> | `minisearch` | 浏览器/Node 端全文检索库，适合小型本地搜索场景。
<a href="https://pagefind.app/" target="_blank">Pagefind</a> | `pagefind` | 静态站点全文搜索工具，适合文档站和博客。
<a href="https://www.algolia.com/" target="_blank">algolia</a> | `algolia` | 好用的搜索集成方案。
<a href="https://opensource.appbase.io/dejavu/" target="_blank">dejavu</a> | `dejavu` | 一款弹性搜索方案，逮虾户。
<a href="https://kamranahmed.info/driver.js/#single-element-with-popover" target="_blank">driver.js</a> | `driverjs` | 一款轻量的用户操作引导插件。
<a href="https://michalsnik.github.io/aos/" target="_blank">aos.js</a> | `aosjs` | 一款强大的页面滚动动画插件。
<a href="http://lab.ejci.net/favico.js/" target="_blank">favico.js</a> | `favicojs` | 趣味/特殊交互插件：用于 favicon 动态角标或动画，适合特殊通知类场景。
<a href="https://alvarotrigo.com/fullPage/" target="_blank">fullPage.js</a> | `fullpagejs` | 一款快速搭建全屏滚动页面的插件。
<a href="https://github.com/buuing/lucky-canvas" target="_blank">Lucky Canvas</a> | `lucky-canvas` | 一款支持web、小程序跨平台的 ( 大转盘 / 九宫格 / 老虎机 ) 抽奖插件。
<a href="https://mattboldt.com/demos/typed-js/" target="_blank">Typedjs</a> | `typed.js` | 一款模拟打字机效果的js UI库。

##### 视/音频
地址 | 标签 | 说明
---- | ---- | ----
<a href="http://www.mediaelementjs.com/" target="_blank">MediaElement.js</a> | `mediaelementjs` | 一款视频控制插件。
<a href="https://videojs.com/" target="_blank">video.js</a> | `videojs` | 一款视频控制插件。
<a href="https://github.com/video-dev/hls.js" target="_blank">hls.js</a> | `hlsjs` | 浏览器端 HLS 播放库，直播/点播场景常用。
<a href="https://github.com/Dash-Industry-Forum/dash.js" target="_blank">dash.js</a> | `dashjs` | MPEG-DASH 播放器库，适合自适应码流播放场景。
<a href="https://github.com/bilibili/flv.js" target="_blank">flv.js</a> | `flvjs` | 无需 Flash 的 FLV 播放插件，适合存量直播/视频场景。
<a href="https://github.com/goldfire/howler.js#documentation" target="_blank">howler.js</a> | `howlerjs` | 视、音频控制插件。
<a href="https://jplayer.org/" target="_blank">jplayer</a> | `jplayer` | jQuery的视、音频控制插件。
<a href="https://github.com/zohararad/audio5js" target="_blank">audio5.js</a> | `audio5js` | 历史参考：早期音频控制插件，现代复杂音频场景建议优先 Web Audio API、Tone.js、howler.js、wavesurfer.js。
<a href="https://tonejs.github.io/" target="_blank">Tone.js</a> | `tonejs` | Web Audio 框架，适合音乐创作、合成器、音序器等复杂音频场景。
<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API" target="_blank">Web Audio API</a> | `web-audio-api` | 浏览器原生音频处理 API，适合音频分析、合成和可视化。
<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Media_Session_API" target="_blank">Media Session API</a> | `media-session` | 浏览器媒体会话 API，可控制系统媒体通知、锁屏播放等能力。
<a href="https://github.com/katspaugh/wavesurfer.js" target="_blank">Wavesurfer.js</a> | `wavesurfer` | 一款音频波形播放器。

##### 图片
地址 | 标签 | 说明
---- | ---- | ----
<a href="http://camanjs.com/" target="_blank">caman.js</a> | `camanjs` | 历史参考：早期 Web 图片处理插件，现代项目可参考 Sharp、Squoosh、Compressor.js、Jimp、WebCodecs。
<a href="https://github.com/jimp-dev/jimp" target="_blank">Jimp</a> | `jimp` | JavaScript 图片处理库，适合 Node/脚本环境的简单图片处理。
<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/WebCodecs_API" target="_blank">WebCodecs API</a> | `webcodecs` | 浏览器底层音视频/图像编解码 API，适合高性能媒体处理场景。
<a href="https://github.com/KnicKnic/WASM-ImageMagick" target="_blank">WASM ImageMagick</a> | `wasm-imagemagick` | ImageMagick 的 WASM 版本，适合浏览器侧图片格式转换和处理实验。
<a href="https://sharp.pixelplumbing.com/" target="_blank">Sharp</a> | `sharp` | 一款强大的图片处理工具。
<a href="https://github.com/GoogleChromeLabs/squoosh" target="_blank">squoosh.js</a> | `squoosh` | 一款优秀的图片压缩方案，有浏览器环境。
<a href="https://github.com/naptha/tesseract.js" target="_blank">tesseract.js</a> | `tesseract` | 一款强大的OCR识别库。
<a href="https://imagesloaded.desandro.com/" target="_blank">imagesloaded</a> | `imagesloaded` | 判断元素图片加载状态的库。
<a href="https://github.com/fengyuanchen/cropperjs" target="_blank">cropper.js</a> | `cropperjs` | 一款集成的图片裁剪插件库。
<a href="https://fengyuanchen.github.io/viewerjs/" target="_blank">viewer.js</a> | `viewerjs` | 一款集成的图片浏览/简单处理插件库。
<a href="https://fengyuanchen.github.io/compressorjs/" target="_blank">compressor.js</a> | `compressorjs` | 一款集成的图片压缩处理插件库。

##### 字符串
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://vocajs.com/" target="_blank">Voca.js</a> | `vocajs` | 字符串的驼峰/修饰/填充/截断/转义/大小写更改等等。
<a href="https://alexcorvi.github.io/anchorme.js/" target="_blank">anchorme.js</a> | `anchormejs` | 自动将文本中的链接/URL/电子邮件转化为可点击的锚点链接。
<a href="https://github.com/jprichardson/string.js" target="_blank">String.js</a> | `stringjs` | 历史参考：老字符串工具库，现代项目优先原生字符串 API、lodash/radash、Voca 或 es-toolkit。
<a href="https://github.com/ljharb/qs" target="_blank">qs.js</a> | `qsjs` | URL参数处理库。
<a href="https://github.com/ai/nanoid" target="_blank">nanoid</a> | `nanoid` | 小型、安全、URL 友好的唯一字符串 ID 生成器。
<a href="https://github.com/uuidjs/uuid" target="_blank">uuid</a> | `uuid` | 生成符合 RFC 的 UUID 库。
<a href="https://github.com/pvorb/node-md5" target="_blank">md5.js</a> | `md5` | 获取字符、Buffer的md5。
<a href="https://github.com/indutny/hash.js" target="_blank">hash.js</a> | `hash` | js的hash字符串处理。


#### 1.4.5 工具
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://requirejs.org/" target="_blank">RequireJs</a> | `requirejs` | 历史参考：AMD 模块化工具，适合老项目维护；新项目优先 ESM/Vite/Rollup/Webpack/Rspack。
<a href="https://seajs.github.io/seajs/docs/" target="_blank">SeaJs</a> | `seajs` | 历史参考：CMD 模块化工具，适合了解前端模块化演进和存量项目维护。
<a href="https://browserify.org/" target="_blank">Browserify</a> | `browserify` | 历史参考：浏览器端使用 Node-style require 的打包工具，现代项目优先 ESM/Vite/Rollup/Rspack。
<a href="https://github.com/rickharrison/validate.js" target="_blank">validate.js</a> | `validate.js` | form表单校验工具。
<a href="https://github.com/validatorjs/validator.js" target="_blank">validator.js</a> | `validator.js` | 有名的内容校验工具，比如邮箱验证、数值验证等。
<a href="https://rxjs.dev/" target="_blank">RxJS官网</a> | `RxJS` | ReactiveX 编程理念的 JS 异步/响应式编程库。
<a href="https://fakerjs.dev/" target="_blank">Faker</a> | `faker` | 用于在浏览器/Node.js 中生成假数据，当前推荐使用 @faker-js/faker。
<a href="https://joi.dev/" target="_blank">Joi官网</a> | `joi` | 面向js的强大schema描述语言与数据验证器。
<a href="https://github.com/JedWatson/classnames#readme" target="_blank">classnames</a> | `classnames` | className条件组合的工具，多用于React。
<a href="https://github.com/lukeed/clsx" target="_blank"> clsx </a> | `clsx ` | 轻量(228B)className条件组合的工具，多用于React。
<a href="https://github.com/pillarjs/path-to-regexp#readme" target="_blank">path-to-regexp</a> | `path-to-regexp` | URL或路径校验工具，使用面极广。
<a href="https://craig.is/killing/mice" target="_blank">Mousetrap</a> | `Mousetrap` | 键盘事件注册捕获封装库，支持Windows/Mac键盘。
<a href="https://uaparser.dev/" target="_blank">UaParserJs</a> | `ua-parser-js` | 检测用户的浏览器，引擎，操作系统，CPU和设备。可运行在浏览器或node.js。
<a href="https://github.com/ericclemmons/click-to-component" target="_blank">click-to-component</a> | `click-to-component` | 浏览器运行时快速定位React组件源码(VSCode打开)的工具。


#### 1.4.6 数据可视化(图表)
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://www.highcharts.com/docs/" target="_blank">highcharts</a> | `highcharts` | 成熟商业可视化库，兼容性和图表能力较强，企业使用需关注授权。
<a href="https://echarts.apache.org/" target="_blank">Apache ECharts</a> | `echarts` | Apache 开源的强大交互式图表与可视化库，国内业务图表场景高频使用。
<a href="https://d3js.org/" target="_blank">d3</a> | `d3` | 底层数据驱动可视化工具库，适合高度定制的 SVG/Canvas/数据可视化场景。
<a href="https://www.chartjs.org/docs/latest/" target="_blank">Chartjs</a> | `chartjs` | 简洁易用的 Canvas 图表库，适合常见业务图表。
<a href="https://antv.antgroup.com/" target="_blank">AntV</a> | `G2/G6/X6/L7` | 蚂蚁可视化体系，覆盖统计图表、图分析、流程图/图编辑和地理可视化。
<a href="http://blog.michealwayne.cn/FundCharts/docs/" target="_blank">FundCharts</a> | `fundcharts` | 本人的跨端轻量可视化库。
<a href="https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene" target="_blank">ThreeJs文档</a> | `threejs/webGL` | 著名的webGL 3D建模库
<a href="https://playcanvas.com/" target="_blank">PlayCanvas文档</a> | `playcanvas` | webGL游戏3D建模库
<a href="http://scenejs.org/" target="_blank">scene.js</a> | `scenejs` | 历史参考：早期 WebGL 3D 基础库；现代 3D/WebGL 场景优先 Three.js、Babylon.js、PlayCanvas、OGL、React Three Fiber。
<a href="http://snapsvg.io/" target="_blank">Snap.svg</a> | `snap` | 一款svg操作库。
<a href="https://www.pixijs.com/" target="_blank">pixi.js</a> | `pixijs` | 2D WebGL渲染引擎。
<a href="https://ogl.netlify.app/" target="_blank">OGL</a> | `ogl` | 轻量 WebGL 库，适合更底层但简洁的 3D/WebGL 开发。
<a href="https://docs.pmnd.rs/react-three-fiber/getting-started/introduction" target="_blank">React Three Fiber</a> | `react-three-fiber` | React 生态的 Three.js 渲染器，适合 React 项目中的 3D 场景。
<a href="https://tresjs.org/" target="_blank">TresJS</a> | `tresjs` | Vue 生态的 Three.js 声明式封装，适合 Vue 项目中的 3D 场景。
<a href="https://libcafe.com/3d/index.html" target="_blank">svg-3d-builder</a> | `svg-3d-builder` | 历史/专项参考：3D SVG 渲染引擎，适合了解 SVG 3D 表达方案。
<a href="https://github.com/jsplumb/jsplumb" target="_blank">jsplumb</a> | `jsplumb` | 一款好用的流程图可视化库。
<a href="https://js.cytoscape.org/" target="_blank">cytoscapejs</a> | `cytoscape` | 一款好用的关系图谱可视化库。
<a href="https://mermaid.js.org/" target="_blank">Mermaid</a> | `mermaid` | 用文本生成流程图、时序图、架构图等图表的工具。
<a href="https://ecomfe.github.io/zrender-doc/public/" target="_blank">Zrender</a> | `zrender` | 2D渲染渲染引擎库，支持Canvas/SVG/VML，也是ECharts的渲染器。
<a href="https://docs.mind-elixir.com/" target="_blank">Mind Elixir</a> | `mind-elixir` | 一款类似xmind效果的思维导图库。


#### 1.4.7 数据可视化(地图)
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://cesium.com/platform/cesiumjs/" target="_blank">CesiumJS</a> | `Cesium.js` | 3D 地球、GIS 和城市建模可视化库。
<a href="http://kartograph.org/" target="_blank">Kartograph</a> | `Kartograph.js` | 历史参考：早期 2D SVG 地图展示库；现代地图/地理可视化可参考 Leaflet、MapLibre GL、deck.gl、CesiumJS、AntV L7、ECharts Map。
<a href="https://leafletjs.com/" target="_blank">leafletjs</a> | `Leaflet.js` | 一款移动优先的地图展示插件。
<a href="https://maplibre.org/" target="_blank">MapLibre GL</a> | `maplibre` | 开源地图渲染库，适合矢量瓦片和交互地图场景。
<a href="https://deck.gl/" target="_blank">deck.gl</a> | `deckgl` | 大规模地理空间数据可视化框架。
<a href="https://l7.antv.antgroup.com/" target="_blank">AntV L7</a> | `antv-l7` | AntV 旗下地理空间数据可视化库。

#### 1.4.8 h5动画
地址 | 标签 | 说明
---- | ---- | ----
<a href="http://bouncejs.com/" target="_blank">Bounce.js</a> | `BounceJS` | 历史参考：早期 CSS3 动画创建工具；现代动画可参考 Anime.js、GSAP、Motion、Lottie、AutoAnimate、Theatre.js。
<a href="https://github.com/bendc/animateplus" target="_blank">animateplus.js</a> | `Animateplus` | 历史/小众参考：轻量动画工具；现代项目可优先考虑 Anime.js、GSAP、Motion、Lottie、AutoAnimate。
<a href="https://animejs.com/" target="_blank">Anime.js</a> | `animejs` | 轻量级js动画库。
<a href="https://gsap.com/" target="_blank">GSAP</a> | `gsap` | 专业级 Web 动画库，复杂时间线和高性能动画场景常用。
<a href="https://motion.dev/" target="_blank">Motion</a> | `motion` | 现代动画库，覆盖 React 和纯 JS 动画场景。
<a href="https://auto-animate.formkit.com/" target="_blank">AutoAnimate</a> | `auto-animate` | 自动为 DOM 插入、删除、排序变化添加过渡动画的轻量库。
<a href="https://www.theatrejs.com/" target="_blank">Theatre.js</a> | `theatrejs` | 面向复杂交互、3D 和时间线控制的动画编排工具。
<a href="https://svgjs.com/docs/3.0/" target="_blank">svg.js</a> | `svgjs` | 轻量的svg操作/动画库。
<a href="http://snapsvg.io/" target="_blank">snapsvg</a> | `Snap.svg` | 一款有名的svg操作/动画库。
<a href="https://airbnb.io/lottie/#/" target="_blank">lottie</a> | `lottie` | web/原生/小程序/RN 的跨端动效方案。
<a href="https://createjs.com/easeljs" target="_blank">EaselJS</a> | `easeljs` | canvas动画操作库，CreateJS四剑客之一。
<a href="https://createjs.com/tweenjs" target="_blank">TweenJS</a> | `tweenjs` | 动画曲线（ease/linear...）操作库，CreateJS四剑客之一。
<a href="https://createjs.com/soundjs" target="_blank">SoundJS</a> | `soundjs` | 音频控制库，CreateJS四剑客之一。
<a href="https://createjs.com/preloadjs" target="_blank">PreloadJS</a> | `preload` | 资源预加载库，CreateJS四剑客之一。
<a href="https://p5js.org/" target="_blank">P5js</a> | `p5js` | canvas绘画功能库。
<a href="https://roughjs.com/" target="_blank">Rough.js</a> | `roughjs` | 一个有意思的canvas绘图库（画出的图形具有手绘风格）。
<a href="https://www.babylonjs.com/" target="_blank">BabylonJS</a> | `BabylonJS` | 功能强大的 Web 3D 游戏和渲染引擎；与 1.4.1 的 babylon.js 为同一生态。
<a href="https://github.com/sarcadass/granim.js#readme" target="_blank">GranimJs</a> | `granimjs` | 用于创建流体和交互式渐变的动画js库，仅17k。
<a href="https://catdad.github.io/canvas-confetti/" target="_blank">canvas-confetti</a> | `confetti` | 轻量的js canvas礼花特效库。

#### 1.4.9 移动端手势
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://github.com/AlloyTeam/AlloyFinger" target="_blank">AlloyFinger.js</a> | `AlloyFinger` | 增加移动端的各种手势事件。
<a href="http://hammerjs.github.io/" target="_blank">hammer.js</a> | `hammerjs` | 手势封装库，取消了移动端click的300ms延迟。
<a href="https://interactjs.io/" target="_blank">interact.js</a> | `interactjs` | 使用JavaScript实现拖放、缩放和多点触控手势。
<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Pointer_events" target="_blank">Pointer Events</a> | `pointer-events` | 浏览器原生指针事件体系，现代触摸/鼠标/笔交互优先参考。

#### 1.4.10 加载
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://pazguille.github.io/aload/" target="_blank">aload.js</a> | `aload.js` | 历史参考：早期异步图片/js/css 加载工具，现代项目优先原生 lazy loading、IntersectionObserver、lazysizes 或框架级资源加载能力。
<a href="http://callmecavs.com/layzr.js/" target="_blank">layzr.js</a> | `layzr.js` | 历史参考：早期图片懒加载库，现代项目优先原生 loading="lazy"、IntersectionObserver 或 lazysizes。
<a href="https://github.com/aFarkas/lazysizes" target="_blank">lazysizes.js</a> | `lazysizes` | 高性能的图片/iframe懒加载工具。
<a href="https://developer.mozilla.org/zh-CN/docs/Web/Performance/Lazy_loading" target="_blank">Lazy loading</a> | `native-lazy-loading` | 浏览器原生懒加载与性能优化资料，现代图片/iframe 懒加载优先参考。
<a href="https://infinite-scroll.com/" target="_blank">infinite-scroll.js</a> | `infinite-scroll` | “无限”滚动的加载插件。


#### 1.4.11 TypeScript辅助
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://github.com/TypeStrong/ts-loader" target="_blank">ts-loader</a> | `ts-loader` | webpack中的TypeScript构建插件。
<a href="https://github.com/s-panferov/awesome-typescript-loader" target="_blank">awesome-typescript-loader</a> | `awesome-typescript-loader` | 历史参考：Webpack 时代的 TypeScript loader，现代项目通常优先 ts-loader、SWC、esbuild、Rspack 或 Vite。
<a href="https://github.com/kimamula/ts-transformer-keys#readme" target="_blank">ts-transformer-keys</a> | `ts-transformer-keys` | 用于提取interface的键值数组（需要用webpack）。
<a href="https://github.com/tamino-martinius/node-ts-dedent#readme" target="_blank">ts-dedent</a> | `ts-dedent` | node端打印正常换行的log。
<a href="https://github.com/kawamataryo/suppress-ts-errors" target="_blank">suppress-ts-error</a> | `suppress-ts-error` | 自动为项目中所有的类型报错添加 @ts-expect-error 或 @ts-ignore 注释。
<a href="https://github.com/sindresorhus/type-fest" target="_blank">type-fest</a> | `type-fest` | 经典的工具类型封装库。
<a href="https://microsoft.github.io/TypeChat/" target="_blank"> TypeChat </a> | `typechat` | 基于OpenAi GPT模型的ts类型生产工具，微软。
<a href="https://github.com/sindresorhus/ts-extras" target="_blank">ts-extras</a> | `ts-extras` | TypeScript/JavaScript 实用类型和运行时辅助工具。
<a href="https://github.com/millsp/ts-toolbelt" target="_blank">ts-toolbelt</a> | `ts-toolbelt` | TypeScript 高级工具类型集合，适合复杂类型编程参考。



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
<a href="https://github.com/devilwjp/veaury" target="_blank">Veaury</a> | `veaury` | Vue3/React 组件混用工具；主条目也可参考 Vue 分类中的 Veaury。
<a href="https://quark-design.hellobike.com/" target="_blank">Quark</a> | `quark` | 基于 Web Components 的移动端跨框架 UI 组件库，哈啰。
<a href="https://astro.build/" target="_blank">Astro</a> | `astro` | 现代静态站点生成器，支持多框架组件，零JS运行时。
<a href="https://qwik.builder.io/" target="_blank">Qwik</a> | `qwik` | 可恢复的web框架，零水合，即时加载。
<a href="https://fresh.deno.dev/" target="_blank">Fresh</a> | `fresh` | 基于Deno的全栈web框架，零配置，边缘优先。
<a href="https://remix.run/" target="_blank">Remix</a> | `remix` | 专注于web标准和现代UX的全栈web框架。
<a href="https://sveltekit.dev/" target="_blank">SvelteKit</a> | `sveltekit` | Svelte的全栈应用框架，类似Next.js。
<a href="https://alpinejs.dev/" target="_blank">Alpine.js</a> | `alpinejs` | 轻量级的声明式框架，类似Vue的语法。
<a href="https://lit.dev/" target="_blank">Lit</a> | `lit` | 构建Web Components的简单库，Google。
<a href="https://github.com/BuilderIO/partytown" target="_blank">Partytown</a> | `partytown` | 将第三方脚本迁移到web worker的库。
<a href="https://github.com/web3/web3.js" target="_blank">Web3js</a> | `web3js` | 以太坊标准js封装库。
<a href="https://vite.dev/" target="_blank">Vite</a> | `vite` | 现代前端构建工具，适用于 Vue/React/Svelte/Solid 等生态。
<a href="https://rspack.rs/" target="_blank">Rspack</a> | `rspack` | 基于 Rust 的高性能打包工具，兼容 webpack 生态。
<a href="https://rsbuild.dev/" target="_blank">Rsbuild</a> | `rsbuild` | 基于 Rspack 的上层构建工具，适合应用和库工程化。



### 1.5 Vue
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://cn.vuejs.org/" target="_blank">Vue3 文档</a> | `vue` | Vue3 官方文档。
<a href="https://v2.cn.vuejs.org/" target="_blank">Vue2 文档</a> | `vue2` | 存量维护：Vue2 老项目维护参考；新项目优先 Vue3。
<a href="https://cli.vuejs.org/zh/" target="_blank">vue-cli 文档</a> | `vue-cli` | 存量维护：Vue CLI 老项目脚手架工具，新项目优先 create-vue + Vite。
<a href="https://pinia.vuejs.org/" target="_blank">pinia 文档</a> | `pinia` | 轻量Vue状态管理工具，vue3推荐。
<a href="https://github.com/vuejs/create-vue" target="_blank">create-vue</a> | `create-vue` | Vue 官方项目脚手架入口，现代 Vue 新项目推荐。
<a href="https://vuex.vuejs.org/zh/" target="_blank">vuex 文档</a> | `vuex` | 存量维护：Vue2/旧项目常见状态管理；Vue3 新项目优先 Pinia。
<a href="https://router.vuejs.org/zh/" target="_blank">vue-router 文档</a> | `vue-router` | 基于vue的前端路由控制。
<a href="http://danilowoz.com/create-vue-content-loader/" target="_blank">vue-content-loader 文档</a> | `create-vue-content-loader` | vue版SVG骨架屏插件。
<a href="http://ustbhuangyi.github.io/better-scroll/doc/api.html" target="_blank">better-scroll 文档</a> | `better-scroll` | 控制滚动场景的插件。
<a href="https://youzan.github.io/vant/#/zh-CN/intro" target="_blank">vant 文档</a> | `vant` | 移动UI库，有赞。
<a href="http://aidenzou.github.io/vue-weui/#!/" target="_blank">vue-weui 文档</a> | `vue-weui` | weui风格的移动UI组件库。
<a href="https://element.eleme.cn/#/zh-CN" target="_blank">Element 文档</a> | `element` | 存量维护：Vue2 中后台 UI 组件库；Vue3 项目建议使用 Element Plus。
<a href="https://element-plus.org/" target="_blank">Element Plus</a> | `element-plus` | Vue3 中后台 UI 组件库，Element UI 的现代替代。
<a href="https://www.naiveui.com/" target="_blank">Naive UI</a> | `naive-ui` | Vue3 组件库，主题和 TypeScript 支持较好。
<a href="https://arco.design/vue/docs/start" target="_blank">Arco Design Vue</a> | `arco-vue` | 字节系企业级 Vue 组件库。
<a href="https://tdesign.tencent.com/vue-next/overview" target="_blank">TDesign Vue Next</a> | `tdesign-vue-next` | 腾讯系 Vue3 组件库。
<a href="https://github.com/hilongjw/vue-lazyload" target="_blank">vue-lazyload 文档</a> | `vue-lazyload` | vue版的图片/组件懒加载插件。
<a href="http://v1.iviewui.com/docs/guide/install" target="_blank">iView 文档</a> | `iview` | 存量维护：Vue2 老中后台项目常见 UI 组件库。
<a href="https://vue.ant.design/docs/vue/introduce-cn/" target="_blank">antd-vue 文档</a> | `antd-vue` | PC UI组件库，ant design的Vue版。
<a href="https://kazupon.github.io/vue-i18n/" target="_blank">vue-i18n 文档</a> | `vue-i18n` | 多语言解决方案。
<a href="https://terryz.github.io/vue/#/region" target="_blank">v-region 文档</a> | `v-region` | Vue行政区选择组件。
<a href="https://github.com/ecomfe/vue-echarts" target="_blank">vue-echarts 文档</a> | `vue-echarts` | Echarts的Vue封装组件。
<a href="https://nuxt.com/" target="_blank">Nuxt.JS 文档</a> | `nuxtjs` | Vue 的全栈/服务端渲染应用框架，现代 Nuxt 项目官方入口。
<a href="https://vite.dev/" target="_blank">ViteJS 文档</a> | `vitejs` | 现代前端构建工具，Vue/React/Svelte 等生态都广泛使用；主条目建议放在构建工具分类。
<a href="https://github.com/vuejs/vue-class-component#readme" target="_blank">vue-class-component 仓库</a> | `vue-class-component` | 存量维护：Vue Class API/装饰器写法工具；Vue3 新项目优先 Composition API。
<a href="https://formilyjs.org/" target="_blank">Formily 文档</a> | `formilyjs` | Element/Antd的表单DSL解决方案。
<a href="https://github.com/privatenumber/vue-2-3" target="_blank">vue-2-3</a> | `vue-2-3` | vue2和vue3共存的一种解决方案封装。
<a href="https://docs-swrv.netlify.app/" target="_blank">SWRV</a> | `swrv` | 用于数据请求的 Vue 钩子库，处理了请求缓存、状态等等。
<a href="https://www.attojs.org/" target="_blank">Vue Request</a> | `vue-request` | 用于数据请求的 Vue 钩子库，比swrv能力要稍微丰富一些。
<a href="https://vueuse.org/" target="_blank">VueUse</a> | `vueuse` | 基于 Vue Composition API 的高频实用工具集，覆盖浏览器、状态、动画、传感器等场景。
<a href="https://tanstack.com/query/latest/docs/framework/vue/overview" target="_blank">TanStack Query Vue</a> | `tanstack-query-vue` | Vue 生态的服务端状态管理方案。
<a href="https://ui.nuxt.com/" target="_blank">Nuxt UI</a> | `nuxt-ui` | Nuxt/Vue 生态 UI 组件库。
<a href="https://github.com/devilwjp/vuereact-combined#readme" target="_blank">Vue React Combined</a> | `vuereact-combined` | Vue2和React快捷集合的工具包。
<a href="https://github.com/devilwjp/veaury" target="_blank"> Veaury </a> | `veaury` | Vue3 和 React 组件混用工具；与 1.4.12 的 Veaury 为同一工具。


### 1.6 React
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://react.dev/" target="_blank">React 文档</a> | `react` | React 官方新文档入口，适合学习现代 React、Hooks 和 API。
<a href="https://react.docschina.org/" target="_blank">React 中文文档</a> | `react` | React 中文翻译文档。
<a href="https://create-react-app.dev/" target="_blank">create-react-app 文档</a> | `create-react-app` | 历史参考：React 老脚手架，新项目不建议优先使用；可考虑 Vite、Next.js、Remix/React Router、Rsbuild。
<a href="https://github.com/facebook/react-devtools" target="_blank">react Chrome devtools</a> | `react-devtools` | react的Chrome开发拓展插件。
<a href="https://reactrouter.com/" target="_blank">react-router</a> | `react-router` | React 路由控制库，官方文档入口。
<a href="https://zustand.docs.pmnd.rs/getting-started/introduction" target="_blank">Zustand 文档</a> | `zustand` | 火热的简单轻量数据流控制工具。
<a href="https://github.com/facebookexperimental/Recoil" target="_blank">Recoil 文档</a> | `recoil` | 历史参考：React 状态管理方案之一，不建议新项目优先采用；可参考 Zustand、Jotai、Redux Toolkit。
<a href="https://redux-toolkit.js.org/" target="_blank">Redux Toolkit 文档</a> | `redux-toolkit` | Redux 官方现代推荐写法，适合复杂 React 状态管理。
<a href="https://facebookarchive.github.io/flux/" target="_blank">flux 文档</a> | `flux` | 历史参考：React 数据流思想早期资料，现代项目通常使用 Redux Toolkit/Zustand/Jotai 等。
<a href="https://cn.mobx.js.org/" target="_blank">mobx 文档</a> | `mobx` | 轻量数据流控制工具。
<a href="https://dvajs.com/" target="_blank">dvajs 文档</a> | `dvajs` | 存量维护：Ant/Umi 老项目常见的数据流方案，新项目可优先直接使用 Umi/Redux Toolkit/TanStack Query。
<a href="https://umijs.org/zh/" target="_blank">UmiJs 文档</a> | `umijs` | 可插拔的企业级 react 应用框架，蚂蚁。
<a href="http://rekit.js.org" target="_blank">Rekit 文档</a> | `rekit` | React/Redux/React-router开发工具/IDE。
<a href="https://nextjs.org/" target="_blank">NextJs 文档</a> | `nextjs` | 轻量级的 React 服务端渲染应用框架。
<a href="https://www.gatsbyjs.cn/" target="_blank">Gatsby.js 文档</a> | `gatsbyjs` | 轻量级的 React 静态网站搭建框架。
<a href="https://github.com/streamich/react-use" target="_blank">React-use 文档</a> | `react-use` | 好用的React自定义hooks封装库。
<a href="https://react-hook-form.com/" target="_blank">React Hook Form</a> | `react-hook-form` | 高性能、轻量的 React 表单管理库。
<a href="https://jotai.org/" target="_blank">Jotai</a> | `jotai` | React 原子化状态管理库。
<a href="https://valtio.dev/" target="_blank">Valtio</a> | `valtio` | 基于 Proxy 的 React 状态管理库。
<a href="https://ahooks.js.org/" target="_blank">ahooks 文档</a> | `ahooks` | React Hooks 工具库，适用于请求、防抖、拖拽、生命周期、DOM 等中后台场景。
<a href="https://tanstack.com/query/latest" target="_blank">TanStack Query</a> | `tanstack-query` | 服务端状态/异步状态管理库，支持请求缓存、重试、失效、分页和乐观更新。
<a href="https://github.com/welldone-software/why-did-you-render#readme" target="_blank">why-did-you-render</a> | `why-did-you-render` | 用来检测React组件是否需要重新渲染的工具。
<a href="https://motion.dev/" target="_blank">Motion 官网</a> | `motion` | 原 Framer Motion，强大的 React/JS 动画与交互手势库。
<a href="http://danilowoz.com/create-content-loader/" target="_blank">react-content-loader 文档</a> | `create-content-loader` | react版SVG骨架屏插件。
<a href="https://ui.shadcn.com/" target="_blank"> shadcn-ui 文档</a> | `shadcn` | shadcn，原子、灵活的UI组件库。
<a href="https://www.radix-ui.com/" target="_blank">Radix UI</a> | `radix-ui` | Headless UI 基础组件库，shadcn/ui 等生态常用底层能力。
<a href="https://react-spectrum.adobe.com/react-aria/" target="_blank">React Aria</a> | `react-aria` | Adobe 的无障碍 React 行为/组件基础能力。
<a href="https://ant.design/docs/react/getting-started-cn" target="_blank">antd 文档</a> | `antd` | ant design，PC UI组件库。
<a href="https://mobile.ant.design/index-cn" target="_blank">antd-mobile 文档</a> | `antd-mobile` | 移动版的antd，UI组件库。
<a href="https://www.styled-components.com/" target="_blank">styled-components 文档</a> | `styled-components` | react的css-in-js实现。
<a href="https://github.com/cristianbote/goober" target="_blank"> goober 文档</a> | `goober` | 只有1kb大小的css-in-js库。
<a href="https://chatui.io/" target="_blank">chatUI</a> | `chatui.io` | 服务于对话领域的解决方案（前端组件），阿里。
<a href="https://x.ant.design/index-cn" target="_blank">Ant Design X</a> | `ant-design-x` | 服务于对话领域的解决方案（前端组件），蚂蚁。
<a href="https://github.com/twobin/react-lazyload" target="_blank">react-lazyload 文档</a> | `react-lazyload` | react版的图片/组件加载插件。
<a href="https://github.com/jamiebuilds/react-loadable#readme" target="_blank">react-loadable</a> | `react-loadable` | 历史参考：React 组件代码分割方案，现代项目优先 React.lazy/Suspense 或框架级 dynamic import。
<a href="https://github.com/STRML/react-draggable" target="_blank">react-draggable</a> | `react-draggable` | 一个用于拖拽操作的React封装组件。
<a href="https://github.com/react-dnd/react-dnd#readme" target="_blank">React DND</a> | `react-dnd` | 适用于React的复杂拖拽控制库，基于HTML5拖放API。
<a href="https://github.com/JedWatson/react-tappable" target="_blank">react-tappable</a> | `react-tappable` | 历史参考：早期 React 点击/触摸事件封装，现代移动端交互可参考 Pointer Events 或手势库。
<a href="https://github.com/tajo/react-portal#readme" target="_blank">React-portal</a> | `react-portal` | 一个通过portals定义附加的节点组件渲染工具。
<a href="https://github.com/vkbansal/react-contextmenu" target="_blank">React-contextmenu</a> | `react-contextmenu` | pc端web实现右键菜单的工具组件。
<a href="https://rexxars.github.io/react-markdown/" target="_blank">react-markdown</a> | `react-markdown` | 在react上使用的markdown工具。
<a href="https://github.com/30-seconds/30-seconds-of-react" target="_blank">30s-of-react</a> | `30s-of-react` | 常用React代码模块集合，30s of code系列。
<a href="https://vasanthk.gitbooks.io/react-bits/" target="_blank">React Bits</a> | `react-bits` | 常用React技巧。
<a href="https://docsite.js.org/zh-cn/docs/addDoc.html" target="_blank">docsiteJS</a> | `docsite` | 基于React的文档生成工具。
<a href="http://casesandberg.github.io/react-color/" target="_blank">React Color</a> | `react-color` | 基于React的拾色器插件，模拟Sketch, Photoshop, Chrome等取色工具，注意可以直接用于Preact。
<a href="http://reactdesktop.js.org/" target="_blank">React Desktop</a> | `react-desktop` | 模拟Mac或windows桌面交互的React封装组件。
<a href="https://www.reactboilerplate.com/" target="_blank">React Boilerplate</a> | `react-boilerplate` | 性能优先的一个典型的React项目模板。
<a href="https://github.com/sstur/react-rte" target="_blank">React RTE</a> | `react-rte` | 历史参考：基于 DraftJS 的富文本编辑器，现代富文本可参考 Lexical、Tiptap、ProseMirror。
<a href="https://react.i18next.com/" target="_blank">React i18Next</a> | `react-i18next` | 多语言解决方案。
<a href="https://swr.vercel.app/" target="_blank">SWR</a> | `swr` | 用于数据请求的 React Hooks 库，处理了请求缓存、状态等等。
<a href="https://formik.org/" target="_blank">Formik</a> | `formik` | 高度封装、开箱即用的 React form 表单封装库。
<a href="https://tanstack.com/router/latest" target="_blank">TanStack Router</a> | `tanstack-router` | 类型安全的 React 路由方案。
<a href="https://tanstack.com/form/latest" target="_blank">TanStack Form</a> | `tanstack-form` | TanStack 生态的表单状态管理方案。
<a href="https://lexical.dev/" target="_blank">Lexical</a> | `lexical` | Meta 开源富文本编辑器框架。
<a href="https://tiptap.dev/" target="_blank">Tiptap</a> | `tiptap` | 基于 ProseMirror 的现代富文本编辑器框架。

#### 1.6.1 Nextjs

地址 | 标签 | 说明
---- | ---- | ----
<a href="https://next.i18next.com/" target="_blank"> Next i18next </a> | `next-i18next` | 用于在Nextjs中处理国际化多语言的库。
<a href="https://authjs.dev/" target="_blank">Auth.js / NextAuth.js</a> | `authjs/next-auth` | Web/Next.js 身份认证方案，NextAuth.js 已演进到 Auth.js 体系，支持 OAuth、JWT、数据库等。
<a href="https://github.com/garmeeh/next-seo" target="_blank">NextSEO</a> | `next-seo` | 专为 Next.js 设计的 SEO 工具，支持动态元标签管理和结构化数据生成。
<a href="https://next-intl-docs.vercel.app/" target="_blank">next-intl</a> | `i18n` | 更现代的国际化方案，支持 App Router 和 Pages Router，内置 SSR 多语言加载。
<a href="https://www.heroui.com/" target="_blank">HeroUI</a> | `heroui` | 原 NextUI，现代 React UI 组件库，支持主题和无障碍能力。
<a href="https://github.com/vercel/next.js/tree/canary/packages/next-mdx" target="_blank">@next/mdx</a> | `mdx` | 官方 MDX 支持库，可在页面中直接混合 Markdown 和 React 组件。
<a href="https://next-redux-wrapper.js.org/" target="_blank">next-redux-wrapper</a> | `state-management` | Redux 与 Next.js 的桥梁库，自动处理 SSR 场景的 store 同步。
<a href="https://github.com/vercel-labs/next-plugin-injection" target="_blank">@next/plugin-injection</a> | `security` | 官方安全插件，自动注入 CSP 等安全头（需 Next.js 13.4+）。
<a href="https://nextjs.org/docs/app/api-reference/file-conventions/metadata" target="_blank">Metadata API</a> | `seo` | Next.js 13+ 原生 SEO 方案，替代部分 next-seo 的功能。
<a href="https://github.com/onivim/next-og" target="_blank">next-og</a> | `seo` | 动态生成 Open Graph 图片，支持 Edge Runtime。
<a href="https://nextjs.org/docs/app" target="_blank">Next.js App Router</a> | `next-app-router` | Next.js 当前主线应用路由文档。
<a href="https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations" target="_blank">Server Actions</a> | `server-actions` | Next.js/React 服务端动作能力，适合表单提交和服务端变更。
<a href="https://github.com/TheEdoRan/next-safe-action" target="_blank">next-safe-action</a> | `next-safe-action` | Next.js Server Actions 的类型安全封装。



### 1.7 NodeJS和构建
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://github.com/goldbergyoni/nodebestpractices" target="_blank">Node.js best practices list</a> | `nodebestpractices` | NodeJS最佳实践集合。
<a href="https://www.npmjs.com/" target="_blank">npm</a> | `npm` | node包统一平台。
<a href="https://yarnpkg.com/" target="_blank">yarn</a> | `yarn` | Node 包管理器，适合多项目依赖管理。
<a href="https://pnpm.io/" target="_blank">pnpm</a> | `pnpm` | 快速、节省磁盘空间的 Node 包管理器，monorepo 场景常用。
<a href="https://github.com/tj/n" target="_blank">n</a> | `n` | 极度简单的 NodeJS 版本管理工具。
<a href="https://storybook.js.org/" target="_blank">StoryBook</a> | `storybookjs` | 用于独立开发React、Vue和Angular的UI组件库导航站点。
<a href="https://unpkg.com/" target="_blank">unpkg</a> | `unpkg` | 国外公共静态资源CDN，适用于 npm 上的所有内容。
<a href="https://nodejs.org/docs/latest/api/" target="_blank">NodeJS api</a> | `node` | Node.js 官方 API 文档；中文站可作为辅助参考。
<a href="https://docs.deno.com/" target="_blank">Deno docs</a> | `deno` | Deno 官方文档，现代 JavaScript/TypeScript 运行时。
<a href="https://bun.sh/" target="_blank">Bun</a> | `bun` | JavaScript/TypeScript runtime、package manager、bundler 和 test runner。
<a href="https://turbo.build/repo" target="_blank">TurboRepo</a> | `turborepo` | 好用的、高性能的多包管理工具，monorepo。
<a href="https://lerna.js.org/" target="_blank">Lerna</a> | `lerna` | 好用的多包管理工具，monorepo。
<a href="https://github.com/ds300/patch-package#readme" target="_blank">patch-package</a> | `patch-package ` | 给node_modules打补丁的工具包。
<a href="https://v8.dev/docs" target="_blank">V8 dev docs</a> | `V8` | js V8引擎文档。
<a href="https://v8.dev/docs" target="_blank">V8</a> | `v8` | V8 引擎文档入口；旧 Node 10.6 版本资料仅作历史参考。
<a href="https://github.com/bellard/quickjs" target="_blank">QuickJs</a> | `quickjs` |  一款轻量级js引擎。
<a href="https://github.com/GoogleChromeLabs/jsvu" target="_blank">jsvu</a> | `jsvu` |  js引擎调试必备，引擎切换及版本控制。
<a href="https://docs.docker.com/" target="_blank">docker</a> | `docker` | 应用容器引擎Docker。
<a href="https://man.linuxde.net/" target="_blank">Linux</a> | `linux` | Linux命令查询手册。
<a href="http://aheckmann.github.io/gm/" target="_blank">GraphicsMagick</a> | `gm` | 存量维护：Node 侧 GraphicsMagick 封装；现代图片处理通常优先 Sharp/ImageMagick。
<a href="https://sheetjs.com/" target="_blank">SheetJS / js-xlsx</a> | `sheetjs/xlsx` | xlsx 的编辑和处理库，处理表格文件导入导出。
<a href="https://github.com/shelljs/shelljs" target="_blank">ShellJs</a> | `shelljs` | 用NodeJS实现shell常用命令。
<a href="https://github.com/chalk/chalk" target="_blank">chalk</a> | `chalk ` | 控制台命令行输出样式工具，主要控制颜色。
<a href="https://github.com/node-schedule/node-schedule" target="_blank">node-schedule</a> | `node-schedule` | 适用于NodeJS的定时任务工具。
<a href="https://www.npmjs.com/package/source-map-support" target="_blank">source-map-support</a> | `source-map-support` | 在 NodeJS 环境下支持 SourceMap 的模块工具。
<a href="https://github.com/wclr/yalc" target="_blank">yalc</a> | `yalc` | npm link 的有效替代品，使用真实的 npm package 代替各种 link。
<a href="https://nodejs.org/api/corepack.html" target="_blank">Corepack</a> | `corepack` | Node 内置包管理器版本分发控制工具，可管理 pnpm/yarn 版本。
<a href="https://volta.sh/" target="_blank">Volta</a> | `volta` | Node/Yarn/npm 工具链版本管理工具。
<a href="https://github.com/Schniz/fnm" target="_blank">fnm</a> | `fnm` | 快速 Node.js 版本管理工具。
<a href="https://nx.dev/" target="_blank">Nx</a> | `nx` | Monorepo 构建系统和任务编排工具。
<a href="https://github.com/changesets/changesets" target="_blank">Changesets</a> | `changesets` | 多包仓库版本管理和 changelog 生成工具。

#### 1.7.1 构建
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://prettier.io/" target="_blank">Prettier</a> | `prettier ` | 对代码无侵害的代码格式化工具。
<a href="https://ejs.bootcss.com/" target="_blank">ejs</a> | `ejs` | 简单上手的html模板引擎。
<a href="http://mustache.github.io/" target="_blank">Mustache</a> | `mustache` | 适用于多语言的html模板库。
<a href="https://pugjs.org/language/includes.html" target="_blank">pug</a> | `pug` | html模板库。
<a href="http://www.nodeclass.com/api/jade.html" target="_blank">jade</a> | `jade` | 历史参考：Pug 前身，老模板项目维护时可能遇到。
<a href="https://gulpjs.com/docs/en/getting-started/quick-start/" target="_blank">gulp 配置文档</a> | `gulp` | 存量维护：老项目常见自动化构建工具，现代项目优先 Vite/Rollup/Rspack/esbuild。
<a href="https://gulpjs.com/plugins/" target="_blank">gulp plugins</a> | `gulp` | gulp插件中心。
<a href="https://gruntjs.com/" target="_blank">grunt 配置文档</a> | `grunt` | 历史参考：早期自动化构建工具，主要用于老项目维护。
<a href="https://rollupjs.org/" target="_blank">rollupjs文档</a> | `Rollup` | ES 模块打包工具，库构建和工具链生态中常用。
<a href="https://webpack.docschina.org/" target="_blank">webpack 配置文档</a> | `webpack` | 应用面不能再广的打包工具。
<a href="https://github.com/neutrinojs/webpack-chain" target="_blank">webpack-chain</a> | `webpack-chain` | 链式配置webpack配置的工具。
<a href="https://nextjs.org/docs/app/api-reference/turbopack" target="_blank">Turbopack</a> | `turbopack` | 基于 Rust 的高性能打包工具，主要服务 Next.js 生态。
<a href="https://parceljs.org/" target="_blank">parceljs 配置文档</a> | `parceljs` | 零配置/轻配置打包工具。
<a href="https://www.snowpack.dev/" target="_blank">snowpack 官网</a> | `snowpack` | 历史参考：无 bundle 构建阶段性工具，现代项目通常优先 Vite。
<a href="https://swc.rs/" target="_blank">swc</a> | `swc` | 用Rust写的、号称比babel快20倍且支持其所有功能的ts/js编译器。
<a href="https://babeljs.io/" target="_blank">babel</a> | `babel` | 应用面很广的 JavaScript 编译器。
<a href="https://github.com/fb55/htmlparser2#readme" target="_blank">htmlparser2</a> | `htmlparser2` | 一款html的转AST工具。
<a href="https://github.com/inikulin/parse5/blob/master/packages/parse5/docs/index.md" target="_blank">parse5</a> | `parse5` | 一款html的转AST工具。
<a href="https://github.com/benjamn/recast" target="_blank">recast</a> | `recast` | 一款js转AST的工具。
<a href="https://github.com/airbnb/ts-migrate" target="_blank">ts-migrate</a> | `ts-migrate` | 一款js转ts(TypeScript)的工具。
<a href="https://github.com/kimmobrunfeldt/concurrently#readme" target="_blank">Concurrently</a> | `concurrently` | 一款NodeJS的命名行控制工具，实现同时运行多条命令。
<a href="https://github.com/evanw/esbuild" target="_blank">esbuild</a> | `esbuild` | 一款极快的js打包和压缩工具。
<a href="https://github.com/addyosmani/critical#readme" target="_blank">critical</a> | `critical` | 一款从HTML中提取相关CSS的工具。
<a href="https://modernjs.dev/" target="_blank">ModernJS</a> | `modernjs` | web前端工程化体系工具，字节跳动。
<a href="https://github.com/javascript-obfuscator/javascript-obfuscator" target="_blank">javascript-obfuscator</a> | `obfuscator` | js代码混淆插件。
<a href="https://github.com/egoist/tsup" target="_blank">tsup</a> | `tsup` | 基于 esbuild 的 TypeScript 库构建工具。
<a href="https://github.com/unjs/unbuild" target="_blank">unbuild</a> | `unbuild` | UnJS 生态的库构建工具。
<a href="https://tsdown.dev/" target="_blank">tsdown</a> | `tsdown` | 面向 TypeScript 库的新一代构建工具。
<a href="https://biomejs.dev/" target="_blank">Biome</a> | `biome` | 现代 Web formatter/linter 工具链，可用于替代部分 Prettier/ESLint 场景。

#### 1.7.2 服务端
地址 | 标签 | 说明
---- | ---- | ----
<a href="http://www.expressjs.com.cn/" target="_blank">express 配置文档</a> | `express` | 轻量web应用程序开发框架。
<a href="https://koajs.cn/#-application-" target="_blank">Koa 文档</a> | `koajs` | web应用程序开发框架。
<a href="https://www.fastify.io/" target="_blank">Fastify 官网</a> | `fastify` | 标称当代最快的轻量web应用程序开发框架，重点是JSON schema加速。
<a href="http://www.midwayjs.org/" target="_blank">Midway 官网</a> | `midway` | 支持了 Web / 全栈 / 微服务 / RPC / Socket / Serverless 的 web 应用程序开发框架，阿里淘系。
<a href="https://docs.feathersjs.com/" target="_blank">feathers.js</a> | `feathersjs` | 轻量web应用程序开发框架，适用于数据流型。
<a href="https://docs.nestjs.com/" target="_blank">Nest.js</a> | `nestjs` | 强大的Web应用框架。
<a href="https://hono.dev/" target="_blank">Hono</a> | `hono` | Web 标准优先的轻量服务端框架，适合 BFF、边缘函数和 API 服务。
<a href="https://nitro.unjs.io/" target="_blank">Nitro</a> | `nitro` | Nuxt/UnJS 生态服务端引擎，适合全栈和边缘部署。
<a href="https://elysiajs.com/" target="_blank">Elysia</a> | `elysia` | Bun 生态高性能服务端框架。
<a href="https://github.com/nuysoft/Mock/wiki" target="_blank">Mockjs 配置文档</a> | `mockjs` | 接口数据模拟工具，可以在客户端和服务端使用。
<a href="https://sheetjs.com/" target="_blank">SheetJs</a> | `sheetjs` | 通过 Node/浏览器处理 xlsx/csv 等电子表格文件的工具。
<a href="https://www.prisma.io/" target="_blank">Prisma</a> | `prisma` | TypeScript ORM 和数据库工具链。
<a href="https://orm.drizzle.team/" target="_blank">Drizzle ORM</a> | `drizzle` | TypeScript-first ORM，类型安全和 SQL 友好。
<a href="https://trpc.io/" target="_blank">tRPC</a> | `trpc` | 端到端类型安全 API/RPC 框架。
<a href="https://ts-rest.com/" target="_blank">ts-rest</a> | `ts-rest` | 基于契约的类型安全 REST API 工具。
<a href="https://github.com/parallel-js/parallel.js" target="_blank">ParallelJs</a> | `paralleljs` | 并行处理js的工具，可用于浏览器和node服务端。
<a href="https://parall.ax/products/jspdf" target="_blank">js-pdf</a> | `js-pdf` | 通过node操作生成pdf的工具。
<a href="http://doc.pm2.io/en/plus/overview/" target="_blank">pm2</a> | `pm2` | node进程管理。
<a href="https://github.com/rvagg/node-worker-farm" target="_blank">node-worker-farm</a> | `node-worker-farm` | 很常用的 Node.js 多进程计算库。
<a href="https://github.com/Marak/colors.js" target="_blank">colors.js</a> | `colorsjs` | node log控制台输出颜色控制。
<a href="https://log4js-node.github.io/log4js-node/" target="_blank">log4.js</a> | `log4js` | log日志工具。
<a href="https://nwjs.io/" target="_blank">nw.js</a> | `nwjs` | 基于NodeJS和chromium的应用程序运行环境，允许您直接从DOM调用所有Node.js模块。
<a href="https://github.com/archiverjs/node-archiver" target="_blank">node-archiver</a> | `node-archiver` | 支持ZIP/TAR文档流传输和接收插件。
<a href="https://github.com/thejoshwolfe/yazl" target="_blank">yazl</a> | `yazl` | 压缩zip插件，对应解压为[yauzl](https://github.com/thejoshwolfe/yauzl)。
<a href="https://sailsjs.com/" target="_blank">SailsJs</a> | `sailsjs` | 好用的MVC NodeJS框架。
<a href="https://helmetjs.github.io/" target="_blank">Helmet中间件</a> | `helmet` | 通过设置响应头header保护express服务应用。
<a href="https://github.com/expressjs/cors#readme" target="_blank">Cors中间件</a> | `cors` | NodeJS的Cors中间件。
<a href="https://github.com/expressjs/body-parser#readme" target="_blank">Body-parser中间件</a> | `body-parser` | NodeJS的请求流解析中间件。
<a href="http://restify.com/" target="_blank">Restify</a> | `restify` | NodeJS的Web服务框架。
<a href="https://github.com/expressjs/multer#readme" target="_blank">Multer</a> | `multer` | 用于处理上传文件的NodeJS中间件。
<a href="https://github.com/node-cache/node-cache" target="_blank">Node-cache</a> | `node-cache` | 一个NodeJS的缓存控制模块。
<a href="https://socket.io/" target="_blank">Socket.IO</a> | `socket.io` | WebSocket解决方案。
<a href="https://github.com/luin/ioredis" target="_blank">ioredis</a> | `ioredis` | redis调用js封装库。
<a href="https://github.com/websockets/ws" target="_blank">ws</a> | `ws` | WebSocket的一个NodeJS包。
<a href="https://github.com/digitalocean/nginxconfig.io" target="_blank">nginxconfig.io</a> | `nginxconfig.io` | 在线生成nginx配置的工具。
<a href="https://github.com/davidmarkclements/fast-safe-stringify#readme" target="_blank">fast-safe-stringify</a> | `fast-safe-stringify` | 安全快速地序列化JSON，替代JSON.stringify。
<a href="https://nodemailer.com/" target="_blank">NodeMailer</a> | `node-mailer` | 用来发邮件的库、支持SMTP/SES/Sendmail/Stream方式。

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
<a href="https://wujie-micro.github.io/doc/" target="_blank">无界Wujie</a> | `wujie` | 基于web component+iframe的微前端框架，腾讯。
<a href="https://github.com/jsdom/jsdom" target="_blank">jsdom</a> | `jsdom` | 在node环境上实现DOM操作的封装库。

#### 1.7.5 云和Serverless
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://wasmedge.org/" target="_blank">WasmEdge 官网</a> | `wasmedge` | 一款与WebAssembly有关的云原生及serverless框架。
<a href="https://www.serverless.com/" target="_blank">Serverless Framework 官网</a> | `serverless` | 快速建立node Serverless 服务的框架，支持腾讯云 SCF，AWS Lambda等。
<a href="https://aws.amazon.com/cn/campaigns/lambda/" target="_blank">AWS Lambda</a> | `aws-lambda` | 经典，亚马逊amazon serverless计算服务。
<a href="https://qingfuwu.cn/" target="_blank">字节轻服务 官网</a> | `qingfuwu` | 字节轻服务，支持Serverless（FaaS）、CDN等服务，有免费档。
<a href="https://help.aliyun.com/document_detail/154438.html" target="_blank">阿里云 FC</a> | `aliyunFC` | 阿里云函数计算服务，支持Serverless（FaaS）。
<a href="https://cloud.tencent.com/document/product/583" target="_blank">腾讯云 SFC</a> | `tecentFC` | 腾讯云云函数服务，支持Serverless（FaaS）。

#### 1.7.6 低代码LowCode

地址 | 标签 | 说明
---- | ---- | ----
<a href="https://lowcode-engine.cn/" target="_blank">lowcode-engine</a> | `lowcode-engine` | 阿里开源低代码引擎。
<a href="https://weda.cloud.tencent.com/" target="_blank">微搭</a> | `weda` | 腾讯低代码引擎，微搭。
<a href="https://aisuda.bce.baidu.com/amis/zh-CN/docs/index" target="_blank">amis</a> | `amis` | 百度开源低代码引擎，适用于偏中后台项目。
<a href="https://opentiny.design/tiny-engine#/home" target="_blank">TinyEngine</a> | `tiny-engine` | 华为2023开源低代码引擎，具备图元编排能力。
<a href="https://netease.github.io/tango/" target="_blank">Tango</a> | `tango` | 网易云音乐2023开源低代码引擎，不受私有 DSL 和协议限制。
<a href="https://shuffle.dev/" target="_blank">Shuffle</a> | `shuffle` | 海外火热的低代码平台。
<a href="https://webflow.com/" target="_blank">Webflow</a> | `webflow` | 海外火热的低代码平台。

### 1.8 Hybird和跨端
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps" target="_blank">pwa</a> | `pwa` | Progressive web apps，渐进式web应用。
<a href="https://developers.weixin.qq.com/miniprogram/dev/" target="_blank">微信小程序官网</a> | `小程序/hybird` | 微信小程序开发官网。
<a href="https://docs.alipay.com/mini/developer/getting-started" target="_blank">支付宝小程序官网</a> | `小程序/hybird` | 支付宝小程序开发官网。
<a href="https://smartprogram.baidu.com/developer/index.html" target="_blank">百度小程序官网</a> | `小程序/hybird` | 百度小程序开发官网。
<a href="https://wepyjs.github.io/wepy-docs/" target="_blank">wepy文档</a> | `小程序/hybird` | vue语法的小程序开发官网。
<a href="https://github.com/opendigg/awesome-github-wechat-weapp" target="_blank">小程序工具集合</a> | `小程序/hybird` | 微信小程序开发工具集合。
<a href="https://dev.mi.com/doc/?page_id=2303" target="_blank">小米轻应用官网</a> | `轻应用/hybird` | 小米轻应用开发官网。
<a href="https://www.quickapp.cn/" target="_blank">Oppo/vivo快应用官网</a> | `轻应用/hybird` | Oppo/vivo轻应用开发官网。
<a href="https://developer.huawei.com/consumer/cn/quickApp" target="_blank">华为快应用官网</a> | `轻应用/hybird` | 华为轻应用开发官网。
<a href="https://reactnative.cn/" target="_blank">React-native 文档</a> | `跨端` | 热门的react语法跨端工具，RN。
<a href="https://lynxjs.org/zh/index.html" target="_blank">Lynx 文档</a> | `跨端` | 字节的iOS/Android/鸿蒙/Web跨端框架。
<a href="https://github.com/NativeScript/NativeScript" target="_blank">NativeScript</a> | `跨端` | 国外一款流行的跨端开发框架，支持Angular/Vue/Svelte/React。
<a href="https://github.com/ionic-team/ionic-framework" target="_blank">ionic-framework</a> | `跨端` | 一个强大的跨平台UI工具包，用于使用HTML，CSS和JavaScript构建本机质量的iOS，Android和PWA。
<a href="https://github.com/quasarframework/quasar" target="_blank">quasar-framework</a> | `跨端` | 构建一流的高性能的Vue响应式网站、PWA、SSR、移动和桌面应用
<a href="https://weexapp.com/zh/" target="_blank">Weex文档</a> | `跨端` | 前几年热门的vue语法跨端工具，现在都不维护了。
<a href="https://alibaba.github.io/weex-ui/#/cn/" target="_blank">Weex-UI文档</a> | `跨端/weex` | weex的UI组件库。
<a href="https://taro.jd.com/" target="_blank">Taro文档</a> | `小程序/跨端` | 跨web/小程序/原生的react语法跨端工具，runtime跨端模式。
<a href="https://rax.js.org/" target="_blank">Rax文档</a> | `小程序/跨端/Flutter` | 跨web/小程序/Flutter的react语法跨端工具（已经沉寂了），阿里。
<a href="https://wechat-miniprogram.github.io/kbone/docs/" target="_blank">Kbone文档</a> | `小程序/跨端` | 跨web/小程序跨端构建插件，成本低，适配各类web框架，腾讯。
<a href="https://hippyjs.org/" target="_blank">Hippy文档</a> | `跨端` | 腾讯的一款混合跨端框架。
<a href="https://uniapp.dcloud.io/" target="_blank">uni-app文档</a> | `小程序/跨端` | 跨web/小程序/原生的vue语法跨端工具。
<a href="https://openkraken.com/" target="_blank">北海Kraken</a> | `Kraken` | 高性能 Web 渲染引擎，基于 Flutter 构建，可以用web范式写法写Flutter，阿里。
<a href="https://github.com/remaxjs/remax" target="_blank">Remax文档</a> | `remax` | React语法跨web/小程序工具，类似于taro-next(3)的跨端模式，对小程序友好，支付宝。
<a href="https://ant-move.github.io/guide/" target="_blank"> Antmove </a> | `antmove` | 小程序转换器，基于支付宝/微信小程序转换为多端小程序，高德。
<a href="https://guoshuyu.cn/home/wx/Flutter-1.html" target="_blank">Flutter文档</a> | `跨端` | 超火的Dart语法的跨端开发工具。
<a href="http://electronjs.org/docs" target="_blank">Electron文档</a> | `跨端` | PC、windows/Mac应用的开发框架。
<a href="http://electronjs.org/docs" target="_blank">WebView2文档</a> | `跨端` | PC、windows应用的开发框架，微软。
<a href="https://tauri.app/" target="_blank">Tauri文档</a> | `Tauri` | Rust 编写的、基于web的 windows/Mac 应用的开发框架。
<a href="https://github.com/tw93/Pake" target="_blank">Pake</a> | `pake` | 基于Rust Tauri 框架、 打包网页生成很小的桌面 App的脚手架工具，支持 Mac / Windows / Linux 系统。
<a href="https://wendux.github.io/dist/#/doc/flyio/readme" target="_blank">flyio(fly)文档</a> | `fly` | 支持Web、Node.js 、微信小程序 、Weex 、React Native 、Quick App的请求封装库。
<a href="https://github.com/icindy/wxParse" target="_blank">wxParse</a> | `wxParse ` | 微信小程序富文本解析组件，支持Html及markdown转wxml可视化（但是目前已停止维护）。
<a href="https://developer.chrome.com/extensions" target="_blank">chrome extension</a> | `chrome-extension` | Chrome拓展程序官方文档。
<a href="https://github.com/sxei/chrome-plugin-demo" target="_blank">chrome-plugin-demo</a> | `chrome-plugin, chrome-extension` | 一篇很好的Chrome拓展程序开发教程，有demo。

### 1.9 辅助工具
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://chat.openai.com/chat" target="_blank">chatGPT</a> | `chatGPT` | 基于OpenAI的问答机器人，用来查技术问题也挺好。
<a href="https://www.cursor.so/" target="_blank">Cursor</a> | `cursor` | 依旧火热的AI Coding IDE产品。
<a href="https://stackoverflow.com/" target="_blank">stackoverflow.com</a> | `stackoverflow` | 技术问题排忧解难的友好社区。
<a href="https://bundlephobia.com/" target="_blank">bundlephobia.com</a> | `bundlephobia` | 分析npm软件包的体积和加载性能的网站。
<a href="https://npmgraph.js.org/" target="_blank">npmgraph</a> | `npmgraph` | 分析npm软件包依赖关系的工具网站。
<a href="https://www.typescriptlang.org/dt/search?search=" target="_blank">Ts声明文件查询</a> | `joi` | 各类库的TypeScript声明文件查询网站。
<a href="http://deerchao.net/tutorials/regex/regex.htm" target="_blank">正则表达式30分钟</a> | `regexp` | 正则上手教程。
<a href="https://regexper.com/" target="_blank">在线正则验证</a> | `regexper` | 可视化在线正则验证网站。
<a href="https://extendsclass.com/regex-tester.html" target="_blank">cyrilex</a> | `cyrilex` | 一个在线可视化的正则表达式测试工具和调试器。
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
<a href="https://codemirror.net/" target="_blank">CodeMirror</a> | `codemirror` | web代码文本编辑器，带有大量的语言模式和插件功能。
<a href="https://github.com/Coding/WebIDE" target="_blank">webIDE</a> | `webide` | web上写代码。
<a href="https://hiroppy.github.io/fusuma/" target="_blank">Fusuma</a> | `fusuma` | 用markdown写web ppt。
<a href="https://stackedit.io/" target="_blank">stackedit</a> | `stackedit ` | 在浏览器中运行的Markdown编辑器。
<a href="https://vuepress.vuejs.org/zh/" target="_blank">VuePress</a> | `vuepress` | 用markdown写文档/博客
<a href="https://vitejs.cn/vitepress/" target="_blank">VitePress</a> | `vitepress` | 用markdown写文档/博客，VuePress小兄弟，用vite构建
<a href="https://hexo.io/zh-cn/" target="_blank">Hexo</a> | `hexo` | 用markdown写文档/博客
<a href="https://d.umijs.org/" target="_blank">dumi</a> | `dumi` | 适合写前端开发文档的工具，markdown，蚂蚁
<a href="https://jsdoc.app/" target="_blank">jsdoc</a> | `jsdoc` | 最经典的js代码注释生成文档的工具
<a href="https://github.com/jsdoc2md/jsdoc-to-markdown" target="_blank">jsdoc-to-markdown</a> | `jsdoc-to-markdown` | js注释（jsdoc格式）生成markdown文档
<a href="https://www.materialui.co/colors" target="_blank">materialui</a> | `materialui` | 快速色值选择
<a href="https://carbon.now.sh/" target="_blank">carbon</a> | `carbon` | 生成写博客时代码的美腻截图
<a href="https://tinypng.com/" target="_blank">tinypng</a> | `Tinypng` | 压缩png和jpeg图片
<a href="https://github.com/svg/svgo" target="_blank">svgo</a> | `svgo` | 压缩SVG图形文件工具
<a href="https://github.com/ImageOptim/ImageOptim" target="_blank">ImageOptim</a> | `imageoptim` | macOS 图片压缩优化工具。
<a href="https://squoosh.app/" target="_blank">Squoosh</a> | `squoosh-app` | GoogleChromeLabs 出品的在线图片压缩/格式转换工具。
<a href="https://jakearchibald.github.io/svgomg/" target="_blank">svgomg</a> | `SVGOMG` | 压缩SVG图形
<a href="https://imagemagick.org/index.php" target="_blank">ImageMagick</a> | `imagemagick` | 后台运用极广的图片处理工具。
<a href="https://github.com/javierbyte/img2css" target="_blank">img2css</a> | `img2css` | 一个有趣的库，利用box-shadow将图片以CSS的方式呈现。
<a href="https://www.whatfontis.com/" target="_blank">whatfontis.com</a> | `whatfontis` | 识别图片上的字体不过限于英文字体，需要注册。
<a href="https://www.toptal.com/developers/keycode" target="_blank">keycode</a> | `keycode` | 一个输入按键并获取其对应js keyCode的在线网站。
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
<a href="https://app.quicktype.io/" target="_blank"> QuickType </a> | `QuickType` | 根据 json 文本生成指定语言（如 TypeScript，C++，,Java，C#，Go 等）类型声明代码的工具网站。
<a href="https://hoppscotch.io/" target="_blank">Hoppscotch</a> | `hoppscotch` | 开源 API 调试工具，可作为 Postman 类工具的轻量替代。
<a href="https://www.usebruno.com/" target="_blank">Bruno</a> | `bruno` | Git 友好的开源 API 客户端。
<a href="https://vitepress.dev/" target="_blank">VitePress</a> | `vitepress` | Vite 驱动的静态文档站生成器，适合技术文档。
<a href="https://docusaurus.io/" target="_blank">Docusaurus</a> | `docusaurus` | React 生态文档站框架，适合产品/技术文档。
<a href="https://github.com/1c7/chinese-independent-developer" target="_blank"> 中国独立开发者项目列表 </a> | `chinese-independent-developer` | 聚合中国独立开发者的项目。



### 1.10 测试、安全及加密
#### 1.10.1 单元测试
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://github.com/vitest-dev/vitest" target="_blank">Vitest</a> | `vitest` | Vite 原生测试框架（单测新主流之一）
<a href="https://mochajs.org/" target="_blank">MochaJS文档</a> | `mocha` | 一款单元测试工具。
<a href="https://jestjs.io/zh-Hans/" target="_blank">JestJS文档</a> | `jest` | 一款单元测试工具，主流。
<a href="https://www.cypress.io/" target="_blank">Cypress官网</a> | `cypress` | 一款单元测试集成平台工具。
<a href="https://github.com/avajs/ava" target="_blank">AvaJs</a> | `avajs` | 一款快速的测试工具。
<a href="https://karma-runner.github.io/latest/index.html" target="_blank">karma</a> | `karma` | 历史参考：老 JavaScript 测试执行器，现代项目优先 Vitest/Jest/Playwright。
<a href="https://enzymejs.github.io/enzyme/" target="_blank">enzyme官网</a> | `enzyme` | 历史参考：React 老测试方案，现代 React 测试优先 Testing Library。
<a href="https://github.com/marmelab/gremlins.js" target="_blank">gremlins.js</a> | `gremlins` | 一款node及浏览器的Monkey Test工具。
<a href="https://uptime.kuma.pet/" target="_blank">uptime-kuma</a> | `uptime-kuma` | 一款开源的、基于puppeteer的指标监控平台。
<a href="https://playwright.dev/" target="_blank">Playwright</a> | `playwright` | 较新颖的e2e测试工具，支持Chrome、firefox等主流浏览器。
<a href="https://testing-library.com/" target="_blank">Testing Library</a> | `testing-library` | 以用户行为为中心的测试工具集合，React/Vue/DOM 测试常用。
<a href="https://mswjs.io/" target="_blank">MSW</a> | `msw` | Mock Service Worker，前端接口 Mock 和测试隔离常用。
<a href="https://www.chromatic.com/" target="_blank">Chromatic</a> | `chromatic` | Storybook 生态的视觉回归测试和组件评审平台。
<a href="https://k6.io/" target="_blank">k6</a> | `k6` | 性能压测工具。
<a href="https://github.com/GoogleChrome/lighthouse-ci" target="_blank">Lighthouse CI</a> | `lighthouse-ci` | Lighthouse 性能/质量检测的 CI 门禁工具。


#### 1.10.2 安全及加密知识
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://github.com/brix/crypto-js" target="_blank">CryptoJS</a> | `crypto-js` | 常见 JavaScript 加密/哈希库；浏览器现代加密场景优先了解 Web Crypto API，业务安全不能只依赖前端加密。
<a href="https://github.com/emn178/js-sha256" target="_blank">js-sha256</a> | `js-sha256` | 一个用于 SHA256 哈希运算的轻量级库。
<a href="https://github.com/kelektiv/node.bcrypt.js#readme" target="_blank">Bcrypt</a> | `bcrypt` | 用于密码散列处理的库。
<a href="https://github.com/ossf/scorecard" target="_blank">OSSF Scorecard</a> | `ossf-scorecard` | 开源项目供应链安全评分/检查（依赖治理很实用）
<a href="https://github.com/OWASP/CheatSheetSeries" target="_blank">OWASP Cheat Sheet Series</a> | `owasp-cheatsheet` | 安全知识速查表（体系化参考）
<a href="https://github.com/snyk/cli" target="_blank">Snyk CLI</a> | `snyk` | 依赖漏洞/供应链扫描（工程落地常用）
<a href="https://owasp.org/www-project-top-ten/" target="_blank">OWASP Top 10</a> | `owasp-top10` | Web 安全基础风险清单。
<a href="https://github.com/google/osv-scanner" target="_blank">OSV Scanner</a> | `osv-scanner` | 开源漏洞数据库 OSV 的依赖漏洞扫描工具。
<a href="https://semgrep.dev/" target="_blank">Semgrep</a> | `semgrep` | 静态代码安全扫描工具。
<a href="https://codeql.github.com/" target="_blank">CodeQL</a> | `codeql` | GitHub 生态代码安全分析工具。
<a href="https://trivy.dev/" target="_blank">Trivy</a> | `trivy` | 容器、依赖、IaC 等安全扫描工具。
<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Crypto_API" target="_blank">Web Crypto API</a> | `web-crypto` | 浏览器原生加密 API。
<p><a href="https://github.com/veeral-patel/how-to-secure-anything" target="_blank">《How to Secure Anything》</a></p>
<p><a href="https://github.com/brix/crypto-js" target="_blank">crypto-js 前端数据加密工具</a>（与上方 CryptoJS 为同一生态，作为文章/资料入口保留）</p>
<p><a href="https://cloud.tencent.com/developer/article/1136202" target="_blank">《浅谈前端安全》</a></p>
<p><a href="http://blog.michealwayne.cn/2020/04/19/safety/%E3%80%90%E6%80%BB%E7%BB%93%E3%80%91%E5%86%8D%E8%B0%88%E5%89%8D%E7%AB%AF%E5%AE%89%E5%85%A8/" target="_blank">《再谈前端安全》</a></p>
<p><a href="https://mawei.blog/post/frontend-security-vulnerabilities-part1/" target="_blank">《8大前端安全问题》</a></p>
<p><a href="https://juejin.cn/post/6844903764973846542" target="_blank">《前端加密那点事》</a></p>
<p><a href="https://zhuanlan.zhihu.com/p/38278311" target="_blank">《HTTPS 到底加密了什么？》</a></p>
<p><a href="https://juejin.cn/post/6844903654810468359" target="_blank">《Web 端反爬虫技术方案》</a></p>
<p><a href="https://juejin.cn/post/6844903695428091918" target="_blank">《那些我们该讨论的前端加密方法》</a></p>


#### 1.10.3 Debug
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://github.com/Tencent/vConsole" target="_blank">vConsole</a> | `vconsole` | 被誉为移动端的web开发者工具，腾讯。
<a href="https://eruda.liriliri.io/" target="_blank">Eruda</a> | `eruda` | 类似vConsole的移动端web调试工具，相对轻量。
<a href="https://www.fundebug.com/" target="_blank">FunDebug</a> | `FunDebug` | 简单的项目debug监控工具，有免费版
<a href="http://www.webfunny.cn/" target="_blank">Webfunny</a> | `webfunny_monitor` | 统一的前端异常监控解决方案。
<a href="https://github.com/typicode/json-server" target="_blank">json-server</a> | `json-server` | 一款通过本地起服务的快速mock工具。
<a href="https://www.pagespy.org/" target="_blank">Page Spy</a> | `page-spy` | 一款集程度较高的远程web调试工具，货拉拉技术团队。

#### 1.10.4 质量检测
地址 | 标签 | 说明
---- | ---- | ----
<a href="https://www.jslint.com/" target="_blank">JSLint js代码检查</a> | `jslint` | 历史参考：早期 JavaScript 验证工具，现代项目优先 ESLint/typescript-eslint/Biome。
<a href="https://jshint.com/" target="_blank">JSHint js代码检查</a> | `jshint` | 历史参考：早期 JavaScript 代码检查工具，现代项目优先 ESLint/typescript-eslint/Biome。
<a href="https://eslint.org/" target="_blank">ESLint js代码检查</a> | `eslint` | 一个JavaScript验证工具
<a href="http://csslint.net/" target="_blank">CSSLint css代码检查</a> | `csslint` | 历史参考：早期 CSS 检查工具，现代项目优先 Stylelint/Biome。
<a href="https://validator.w3.org/" target="_blank">Markup Validation Service</a> | `validator` | 在线HTML验证网站
<a href="https://flow.org/" target="_blank">Flow js代码检查</a> | `flow` | 历史/专项参考：JavaScript 静态类型检查工具，现代前端主流通常优先 TypeScript。
<a href="https://www.sonarlint.org/vscode/" target="_blank">SonarLint vscode</a> | `sonarlint` | js/ts工程代码质量验证的vscode插件
<a href="https://github.com/google/eng-practices" target="_blank">Google eng-practices</a> | `eng-practices` | 谷歌工程实践文档
<a href="https://github.com/cheeriojs/cheerio#readme" target="_blank">Cheerio</a> | `cheerio` | 用于web抓取的工具。
<a href="https://pptr.dev/" target="_blank">Puppeteer官网</a> | `puppeteer` | 基于chromium的无头浏览器，可用于爬虫等web自动化。
<a href="https://www.selenium.dev/" target="_blank">Selenium官网</a> | `selenium` | 强大的用于Web应用程序测试的工具。
<a href="https://github.com/GoogleChrome/lighthouse" target="_blank">Lighthouse</a> | `lighthouse` | Google标准的web性能检测工具，Chrome自带。
<a href="https://github.com/nolanlawson/fuite" target="_blank">Fuite</a> | `fuite` | web内存检测工具，基于puppeteer。
<a href="https://github.com/chaitin/xray" target="_blank"> xray </a> | `xray ` | 一款完善的安全评估工具，支持常见 web 安全问题扫描和自定义 poc，不过不开源。
<a href="https://typescript-eslint.io/" target="_blank">typescript-eslint</a> | `typescript-eslint` | TypeScript 项目的 ESLint 解析器和规则集。
<a href="https://github.com/oxc-project/oxc" target="_blank">Oxlint / Oxc</a> | `oxlint` | 高性能 JavaScript/TypeScript lint 工具链。
<a href="https://knip.dev/" target="_blank">Knip</a> | `knip` | 检测未使用文件、依赖和导出的工具。
<a href="https://github.com/webpro-nl/size-limit" target="_blank">size-limit</a> | `size-limit` | 包体积检测和 CI 门禁工具。
<a href="https://github.com/ai/size-limit" target="_blank">Bundle size 工具集合</a> | `bundle-size` | 构建产物体积分析/门禁参考。


### 1.11 AI人工智能库

#### 1.11.1 大语言模型与 Agent 应用框架

| 地址 | 标签 | 说明 |
| --- | --- | --- |
| <a href="https://ai-sdk.dev/" target="_blank">AI SDK</a> | `ai-sdk` | Vercel 出品的 TypeScript AI SDK，适合构建流式对话、AI UI、工具调用和多模型应用 |
| <a href="https://github.com/openai/openai-agents-js" target="_blank">OpenAI Agents SDK JS/TS</a> | `openai-agents-js` | OpenAI 官方 JavaScript/TypeScript Agent SDK，适合轻量多 Agent、handoff、tool calling、tracing |
| <a href="https://github.com/openai/openai-agents-python" target="_blank">OpenAI Agents SDK Python</a> | `openai-agents-python` | OpenAI 官方 Python Agent SDK，适合多 Agent 工作流、工具调用、评测和追踪 |
| <a href="https://github.com/langchain-ai/langchain" target="_blank">LangChain</a> | `langchain` | LLM 应用开发框架，生态完整，但复杂 Agent 编排建议配合 LangGraph 使用 |
| <a href="https://github.com/langchain-ai/langgraph" target="_blank">LangGraph</a> | `langgraph` | 当前主流的有状态、可恢复、长期运行 Agent 工作流框架 |
| <a href="https://llamaindex.ai/" target="_blank">LlamaIndex</a> | `llamaindex` | 数据/RAG 取向的 LLM 应用框架，适合知识库、文档问答、检索增强生成 |
| <a href="https://github.com/microsoft/semantic-kernel" target="_blank">Semantic Kernel</a> | `semantic-kernel` | 微软开源 AI 编排 SDK，适合企业级 .NET/Python/Java 场景 |
| <a href="https://github.com/microsoft/autogen" target="_blank">AutoGen</a> | `autogen` | 微软多 Agent 对话与工作流框架，适合研究和复杂协作型 Agent |
| <a href="https://github.com/crewAIInc/crewAI" target="_blank">CrewAI</a> | `crewai` | 以角色、任务、团队协作为核心的多 Agent 框架，工程落地较活跃 |
| <a href="https://github.com/google/adk-python" target="_blank">Google ADK</a> | `google-adk` | Google 开源 Agent Development Kit，偏 code-first 的 Agent 开发、评估和部署 |
| <a href="https://github.com/mastra-ai/mastra" target="_blank">Mastra</a> | `mastra` | TypeScript 原生 Agent 框架，覆盖 Agent、workflow、RAG、memory、observability |
| <a href="https://github.com/agno-agi/agno" target="_blank">Agno</a> | `agno` | 原 Phidata 方向演进，面向生产 Agent 平台，强调 tracing、scheduling、RBAC、控制面 |
| <a href="https://github.com/strands-agents" target="_blank">Strands Agents</a> | `strands-agents` | AWS 相关生态的开源 Agent SDK，支持 Python/TypeScript，偏生产级 Agent 构建 |
| <a href="https://github.com/pydantic/pydantic-ai" target="_blank">Pydantic AI</a> | `pydantic-ai` | Pydantic 生态下的 Python Agent 框架，强调类型安全、结构化输出和工程可靠性 |
| <a href="https://github.com/huggingface/smolagents" target="_blank">smolagents</a> | `smolagents` | Hugging Face 极简 Agent 库，抽象少，适合快速实验和代码式行动 |
| <a href="https://github.com/camel-ai/camel" target="_blank">CAMEL</a> | `camel` | 多 Agent 研究/工程框架，适合角色扮演、社会模拟、协作任务和数据生成 |
| <a href="https://github.com/agentscope-ai/agentscope" target="_blank">AgentScope</a> | `agentscope` | 面向多 Agent 应用的工程框架，适合分布式、多角色、复杂 Agent 系统 |
| <a href="https://github.com/stanfordnlp/dspy" target="_blank">DSPy</a> | `dspy` | “编程而非手写 Prompt”的 LLM 应用框架，适合可优化的 RAG、分类、Agent 流程 |

#### 1.11.2 模型 API SDK 与模型路由

| 地址 | 标签 | 说明 |
| --- | --- | --- |
| <a href="https://github.com/openai/openai-node" target="_blank">OpenAI NodeJS SDK</a> | `openai-node` | OpenAI 官方 Node.js/TypeScript SDK |
| <a href="https://github.com/openai/openai-python" target="_blank">OpenAI Python SDK</a> | `openai-python` | OpenAI 官方 Python SDK |
| <a href="https://github.com/anthropics/anthropic-sdk-typescript" target="_blank">Anthropic SDK TypeScript</a> | `anthropic-sdk-ts` | Anthropic Claude API 的 TypeScript/JavaScript SDK |
| <a href="https://github.com/anthropics/anthropic-sdk-python" target="_blank">Anthropic SDK Python</a> | `anthropic-sdk-python` | Anthropic Claude API 的 Python SDK |
| <a href="https://github.com/googleapis/js-genai" target="_blank">Google Gen AI SDK JS</a> | `google-genai-js` | Google Gemini/Gen AI 新版 JavaScript SDK |
| <a href="https://github.com/googleapis/python-genai" target="_blank">Google Gen AI SDK Python</a> | `google-genai-python` | Google Gemini/Gen AI 新版 Python SDK |
| <a href="https://github.com/cohere-ai/cohere-typescript" target="_blank">Cohere SDK</a> | `cohere` | Cohere API 的 TypeScript SDK |
| <a href="https://github.com/mistralai/client-js" target="_blank">Mistral AI SDK</a> | `mistral` | Mistral AI API 的 JavaScript SDK |
| <a href="https://github.com/replicate/replicate-javascript" target="_blank">Replicate SDK</a> | `replicate` | Replicate API 的 JavaScript SDK |
| <a href="https://github.com/BerriAI/litellm" target="_blank">LiteLLM</a> | `litellm` | 多模型统一调用代理/网关，适合做企业内部模型路由、成本统计、限流和兼容 OpenAI API |
| <a href="https://github.com/Portkey-AI/gateway" target="_blank">Portkey Gateway</a> | `portkey-gateway` | 开源 AI Gateway，支持多模型路由、fallback、日志、治理 |
| <a href="https://github.com/Helicone/helicone" target="_blank">Helicone</a> | `helicone` | 开源 LLM observability / gateway，适合请求日志、成本、缓存和监控 |
| <a href="https://github.com/run-llama/LlamaIndexTS" target="_blank">LlamaIndex TS</a> | `llamaindex-ts` | LlamaIndex 的 TypeScript 版本，适合 JS/TS RAG 应用 |

#### 1.11.3 Agent 任务管理与人机协作平台

| 地址 | 标签 | 说明 |
| --- | --- | --- |
| <a href="https://www.multica.ai/" target="_blank">Multica</a> | `multica` | 面向“人 + 编码 Agent 团队”的任务协作平台，可分配任务、跟踪进度、管理 Agent workforce |
| <a href="https://github.com/multica-ai/multica" target="_blank">Multica Open Source</a> | `multica-open` | Multica 开源仓库，适合研究 Agent 任务管理、runtime、技能复用和团队协作模式 |
| <a href="https://slock.ai/" target="_blank">Slock</a> | `slock` | 人与 Agent 在频道/DM 中实时协作的平台，更偏“Agent Slack/团队沟通层” |
| <a href="https://www.taskade.com/" target="_blank">Taskade</a> | `taskade` | AI 工作空间，覆盖项目、任务、Agent、自动化、记忆和业务应用生成 |
| <a href="https://github.com/OpenBMB/ChatDev" target="_blank">ChatDev</a> | `chatdev` | 多 Agent 软件公司模拟项目，可作为 Agent 协作流程研究参考 |
| <a href="https://github.com/geekan/MetaGPT" target="_blank">MetaGPT</a> | `metagpt` | 从需求到 PRD、设计、任务、代码的多 Agent 软件开发框架 |
| <a href="https://github.com/OpenBMB/IoA" target="_blank">IoA</a> | `ioa` | Internet of Agents，多 Agent 协作与通信研究方向 |
| <a href="https://github.com/taskforcesh/bullmq" target="_blank">BullMQ</a> | `bullmq` | Node.js 队列基础设施，可作为 Agent 任务调度/异步执行底座 |
| <a href="https://github.com/temporalio/temporal" target="_blank">Temporal</a> | `temporal` | 可靠工作流引擎，适合长周期 Agent task、补偿、重试和可恢复执行 |

#### 1.11.4 AI 编程开发工具

| 地址 | 标签 | 说明 |
| --- | --- | --- |
| <a href="https://openai.com/codex/" target="_blank">Codex</a> | `codex` | OpenAI 编码 Agent，支持 CLI/云端任务等开发工作流 |
| <a href="https://github.com/openai/codex" target="_blank">Codex CLI</a> | `codex-cli` | OpenAI Codex 命令行工具，适合本地仓库修改、代码生成、调试和任务执行 |
| <a href="https://docs.anthropic.com/en/docs/claude-code/overview" target="_blank">Claude Code</a> | `claude-code` | Anthropic 出品的 AI 编程助手，适合本地代码库理解、生成、重构、调试 |
| <a href="https://opencode.ai/" target="_blank">OpenCode</a> | `opencode` | 开源终端 AI 编程助手，主打多模型/多 provider 可插拔 |
| <a href="https://github.com/google-gemini/gemini-cli" target="_blank">Gemini CLI</a> | `gemini-cli` | Google Gemini CLI，开源命令行 AI 编程助手 |
| <a href="https://github.com/OpenHands/OpenHands" target="_blank">OpenHands</a> | `openhands` | 开源 AI 软件工程师/编码 Agent 运行时，适合自主修复、任务执行、沙箱运行 |
| <a href="https://github.com/OpenHands/software-agent-sdk" target="_blank">OpenHands SDK</a> | `openhands-sdk` | 面向写代码类 Agent 的 SDK，可用于构建自定义 coding agent |
| <a href="https://github.com/SWE-agent/SWE-agent" target="_blank">SWE-agent</a> | `swe-agent` | 面向 GitHub issue 修复和 SWE-bench 的开源编码 Agent |
| <a href="https://github.com/paul-gauthier/aider" target="_blank">Aider</a> | `aider` | 终端 AI pair programming 工具，适合 Git 工作流和小步提交 |
| <a href="https://github.com/cline/cline" target="_blank">Cline</a> | `cline` | 开源 VSCode Agent 插件，支持文件编辑、命令执行、浏览器等工具调用 |
| <a href="https://github.com/RooVetGit/Roo-Code" target="_blank">Roo Code</a> | `roo-code` | Cline 分支生态中活跃的 VSCode Agent 工具，支持多模式和复杂任务 |
| <a href="https://github.com/continuedev/continue" target="_blank">Continue</a> | `continue` | 开源 AI IDE 插件，支持 VSCode/JetBrains、多模型、本地模型和自定义上下文 |
| <a href="https://github.com/sourcegraph/amp" target="_blank">Amp</a> | `amp` | Sourcegraph 相关 AI coding agent/开发工具，适合关注代码库级 Agent 演进 |
| <a href="https://www.cursor.com/" target="_blank">Cursor</a> | `cursor` | 主流 AI IDE，适合专业开发者进行代码生成、理解、重构和多文件修改 |
| <a href="https://windsurf.com/" target="_blank">Windsurf</a> | `windsurf` | 主流 AI IDE，强调 Agentic coding 和上手体验 |
| <a href="https://www.trae.ai/" target="_blank">Trae</a> | `trae` | 字节系 AI IDE，适合观察国内 AI 编程产品形态 |
| <a href="https://github.com/features/copilot" target="_blank">GitHub Copilot</a> | `copilot` | GitHub 官方 AI 编程助手，已从补全扩展到 Agent/任务流 |
| <a href="https://bolt.new/" target="_blank">Bolt.new</a> | `bolt` | 面向 Web 应用生成和部署的 AI Agent 平台 |
| <a href="https://github.com/stackblitz/bolt.new" target="_blank">Bolt.new Open Source</a> | `bolt-open` | Bolt.new 开源版本，适合研究浏览器内全栈生成与 WebContainer 工作流 |
| <a href="https://v0.dev/" target="_blank">v0</a> | `v0` | Vercel 出品 UI/前端生成工具，适合 React、Next.js、shadcn 场景 |
| <a href="https://lovable.dev/" target="_blank">Lovable</a> | `lovable` | 面向产品原型到全栈应用生成的 AI 开发平台 |
| <a href="https://github.com/PatrickJS/awesome-cursorrules" target="_blank">awesome-cursorrules</a> | `cursorrules` | Cursor 规则集合，可作为项目级 AI 编码规范参考 |
| <a href="https://github.com/SchneiderSam/awesome-windsurfrules" target="_blank">awesome-windsurfrules</a> | `windsurfrules` | Windsurf 规则集合，可作为 Agent 规则治理参考 |

#### 1.11.5 MCP 与工具生态

| 地址 | 标签 | 说明 |
| --- | --- | --- |
| <a href="https://modelcontextprotocol.io/" target="_blank">Model Context Protocol</a> | `mcp` | Anthropic 发起的开放协议，用于让 AI 应用连接外部数据源、工具和工作流 |
| <a href="https://github.com/modelcontextprotocol" target="_blank">modelcontextprotocol GitHub</a> | `mcp-github` | MCP 官方 GitHub 组织，包含规范、SDK、服务器等 |
| <a href="https://registry.modelcontextprotocol.io/" target="_blank">Official MCP Registry</a> | `mcp-registry` | 官方 MCP 注册表，适合发现公共 MCP server 元数据 |
| <a href="https://smithery.ai/" target="_blank">Smithery</a> | `smithery` | MCP server 发现、托管、连接与商业化平台 |
| <a href="https://glama.ai/mcp/servers" target="_blank">Glama MCP Servers</a> | `glama-mcp` | MCP server 注册和检索平台，覆盖大量社区服务器 |
| <a href="https://mcp.so/" target="_blank">MCP.so</a> | `mcp-so` | MCP 工具/服务器集合站 |
| <a href="https://github.com/modelcontextprotocol/servers" target="_blank">MCP Servers</a> | `mcp-servers` | 官方/社区 MCP servers 集合入口 |
| <a href="https://github.com/microsoft/playwright-mcp" target="_blank">Playwright MCP</a> | `playwright-mcp` | Microsoft 出品的浏览器自动化 MCP server，可让 LLM 通过结构化页面快照操作浏览器 |
| <a href="https://github.com/browserbase/mcp-server-browserbase" target="_blank">Browserbase MCP Server</a> | `browserbase-mcp` | Browserbase 的浏览器自动化 MCP server |
| <a href="https://github.com/upstash/context7" target="_blank">Context7</a> | `context7` | 为 LLM/Agent 提供最新文档上下文的工具/MCP 生态项目 |
| <a href="https://github.com/github/github-mcp-server" target="_blank">GitHub MCP Server</a> | `github-mcp` | GitHub 官方 MCP server，用于仓库、issue、PR 等上下文和操作 |
| <a href="https://github.com/redis/mcp-redis" target="_blank">Redis MCP Server</a> | `redis-mcp` | Redis 官方 MCP server，适合数据访问和缓存场景 |
| <a href="https://github.com/postgres-mcp/postgres-mcp" target="_blank">Postgres MCP</a> | `postgres-mcp` | PostgreSQL MCP server，适合数据库查询和数据上下文接入 |

#### 1.11.6 Agent Skills

| 地址 | 标签 | 说明 |
| --- | --- | --- |
| <a href="https://skills.sh/" target="_blank">Skills.sh</a> | `skills-sh` | Agent Skills 目录/浏览站，适合发现和安装 skill |
| <a href="https://lobehub.com/skills" target="_blank">LobeHub Skills</a> | `lobehub-skills` | Agent Skills 市场，支持 Claude Code、Codex CLI、ChatGPT 等 SKILL.md 格式 |
| <a href="https://skillsllm.com/" target="_blank">SkillsLLM</a> | `skillsllm` | 面向 Claude Code、Codex CLI、ChatGPT 的开源 Agent Skills 聚合站 |
| <a href="https://agentskills.io/home" target="_blank">AgentSkills.io</a> | `agentskills-io` | Agent Skills 概念、规范、集成指南入口 |
| <a href="https://agentskills.io/specification" target="_blank">Agent Skills Specification</a> | `skills-spec` | SKILL.md 格式规范，定义 frontmatter、instructions、resources 等结构 |
| <a href="https://github.com/agentskills/agentskills" target="_blank">agentskills/agentskills</a> | `skills-spec-repo` | Agent Skills 规范与文档仓库 |
| <a href="https://github.com/anthropics/skills" target="_blank">anthropics/skills</a> | `anthropics-skills` | Anthropic 官方示例 skills 集合 |
| <a href="https://github.com/vercel-labs/agent-skills" target="_blank">vercel-labs/agent-skills</a> | `vercel-agent-skills` | Vercel 官方 agent skills 集合 |
| <a href="https://github.com/vercel-labs/skills" target="_blank">vercel-labs/skills</a> | `skills-cli` | Skills CLI，可用于安装、发现、检查和更新 skills |
| <a href="https://github.com/softaworks/agent-toolkit" target="_blank">softaworks/agent-toolkit</a> | `agent-toolkit` | 社区高人气 skills 合集，覆盖开发流程、规划、文档、架构、沟通等 |

#### 1.11.7 RAG、知识库与数据接入

| 地址 | 标签 | 说明 |
| --- | --- | --- |
| <a href="https://github.com/run-llama/llama_index" target="_blank">LlamaIndex</a> | `llamaindex-rag` | RAG/数据索引核心框架，适合文档、数据库、知识库应用 |
| <a href="https://github.com/langchain-ai/langchain" target="_blank">LangChain RAG</a> | `langchain-rag` | LangChain 的 retrieval、document loaders、text splitters、vector store 生态 |
| <a href="https://github.com/mendableai/firecrawl" target="_blank">Firecrawl</a> | `firecrawl` | 将网站转换为 LLM 友好的 Markdown/结构化数据，适合网页抓取和 RAG 数据准备 |
| <a href="https://github.com/unclecode/crawl4ai" target="_blank">Crawl4AI</a> | `crawl4ai` | 面向 AI/RAG 的开源网页爬取与内容提取工具 |
| <a href="https://github.com/infiniflow/ragflow" target="_blank">RAGFlow</a> | `ragflow` | 开源 RAG 引擎，强调文档解析、工作流和企业知识库 |
| <a href="https://github.com/deepset-ai/haystack" target="_blank">Haystack</a> | `haystack` | 开源 LLM/RAG/搜索管道框架，适合企业检索问答系统 |
| <a href="https://github.com/weaviate/Verba" target="_blank">Verba</a> | `verba` | Weaviate 开源 RAG chatbot，适合知识库问答样板 |
| <a href="https://github.com/embedchain/embedchain" target="_blank">EmbedChain</a> | `embedchain` | 基于数据源快速创建 ChatGPT/RAG 应用 |
| <a href="https://github.com/run-llama/llama_parse" target="_blank">LlamaParse</a> | `llama-parse` | LlamaIndex 生态文档解析服务/工具，适合 PDF、表格、复杂文档解析 |
| <a href="https://github.com/DS4SD/docling" target="_blank">Docling</a> | `docling` | 文档解析工具，适合 PDF、Office、HTML 等转结构化数据 |
| <a href="https://github.com/Unstructured-IO/unstructured" target="_blank">Unstructured</a> | `unstructured` | 文档 ETL 工具，适合将复杂文件转为可检索文本块 |

#### 1.11.8 向量数据库与检索引擎

| 地址 | 标签 | 说明 |
| --- | --- | --- |
| <a href="https://github.com/chroma-core/chroma" target="_blank">ChromaDB</a> | `chromadb` | 开源向量数据库，适合轻量 RAG 和本地原型 |
| <a href="https://github.com/milvus-io/milvus" target="_blank">Milvus</a> | `milvus` | 高性能开源向量数据库，适合大规模相似性搜索 |
| <a href="https://github.com/qdrant/qdrant" target="_blank">Qdrant</a> | `qdrant` | Rust 实现的向量搜索引擎，工程体验较好 |
| <a href="https://github.com/weaviate/weaviate" target="_blank">Weaviate</a> | `weaviate` | 开源向量搜索引擎，生态完整，适合知识库和语义搜索 |
| <a href="https://github.com/pgvector/pgvector" target="_blank">pgvector</a> | `pgvector` | PostgreSQL 向量扩展，适合已有 Postgres 体系内增加向量检索 |
| <a href="https://github.com/timescale/pgvectorscale" target="_blank">pgvectorscale</a> | `pgvectorscale` | Timescale 开源 PostgreSQL 向量扩展，面向更高性能向量搜索 |
| <a href="https://github.com/supabase/vecs" target="_blank">Supabase Vecs</a> | `supabase-vecs` | Supabase 的向量客户端 |
| <a href="https://github.com/pinecone-io/pinecone-ts-client" target="_blank">Pinecone SDK</a> | `pinecone` | Pinecone 向量数据库 TypeScript 客户端 |
| <a href="https://github.com/vespa-engine/vespa" target="_blank">Vespa</a> | `vespa` | 大规模搜索、推荐和向量检索引擎 |
| <a href="https://github.com/typesense/typesense" target="_blank">Typesense</a> | `typesense` | 开源搜索引擎，支持关键字、语义/向量检索混合场景 |
| <a href="https://github.com/meilisearch/meilisearch" target="_blank">Meilisearch</a> | `meilisearch` | 轻量搜索引擎，可配合向量/语义能力做混合检索 |

#### 1.11.9 Prompt、评测、观测与实验管理

| 地址 | 标签 | 说明 |
| --- | --- | --- |
| <a href="https://github.com/langfuse/langfuse" target="_blank">Langfuse</a> | `langfuse` | 开源 LLM engineering 平台，覆盖 tracing、prompt、eval、debug、monitoring |
| <a href="https://github.com/Arize-ai/phoenix" target="_blank">Arize Phoenix</a> | `phoenix` | 开源 AI observability/evaluation 工具，适合 tracing、LLM eval、RAG 分析 |
| <a href="https://github.com/traceloop/openllmetry" target="_blank">OpenLLMetry</a> | `openllmetry` | 基于 OpenTelemetry 的 LLM tracing/observability 方案 |
| <a href="https://github.com/promptfoo/promptfoo" target="_blank">promptfoo</a> | `promptfoo` | Prompt/模型输出测试与回归评测工具，适合 CI 门禁 |
| <a href="https://github.com/confident-ai/deepeval" target="_blank">DeepEval</a> | `deepeval` | LLM 应用评测框架，适合 RAG、Agent、对话质量评测 |
| <a href="https://github.com/explodinggradients/ragas" target="_blank">Ragas</a> | `ragas` | RAG 评测框架，适合 faithfulness、context precision/recall 等指标 |
| <a href="https://github.com/openai/evals" target="_blank">OpenAI Evals</a> | `openai-evals` | OpenAI 开源评测框架，适合构建自定义模型/任务评测 |
| <a href="https://github.com/microsoft/promptflow" target="_blank">PromptFlow</a> | `promptflow` | 微软开源 LLM 应用开发、评测和流程编排工具 |
| <a href="https://github.com/dair-ai/Prompt-Engineering-Guide" target="_blank">Prompt Engineering Guide</a> | `prompt-guide` | Prompt 工程指南和资源库 |
| <a href="https://github.com/openai/tiktoken" target="_blank">tiktoken</a> | `tiktoken` | OpenAI tokenizer，用于 token 计算和成本预估 |
| <a href="https://github.com/dqbd/tiktoken" target="_blank">js-tiktoken</a> | `js-tiktoken` | tiktoken 的 JavaScript/WASM 版本，适合前端/Node 成本预估 |

#### 1.11.10 AI 应用开发平台与 Chat UI

| 地址 | 标签 | 说明 |
| --- | --- | --- |
| <a href="https://github.com/langgenius/dify" target="_blank">Dify</a> | `dify` | 开源 LLM 应用开发平台，覆盖 workflow、RAG、Agent、模型管理和应用发布 |
| <a href="https://github.com/langflow-ai/langflow" target="_blank">Langflow</a> | `langflow` | 可视化 LLM/Agent/RAG 应用构建平台 |
| <a href="https://github.com/FlowiseAI/Flowise" target="_blank">Flowise</a> | `flowise` | 拖拽式 LLM 应用构建工具，适合快速搭建流程和工具调用 |
| <a href="https://github.com/n8n-io/n8n" target="_blank">n8n</a> | `n8n` | 开源自动化工作流平台，已大量支持 AI 节点和 Agent 工作流 |
| <a href="https://github.com/vercel/ai-chatbot" target="_blank">AI Chatbot</a> | `ai-chatbot` | Vercel 开源全栈 AI Chatbot 模板 |
| <a href="https://github.com/danny-avila/LibreChat" target="_blank">LibreChat</a> | `librechat` | 开源多模型 ChatGPT 类应用，支持插件、代理、工具和多 provider |
| <a href="https://github.com/ChatGPTNextWeb/NextChat" target="_blank">NextChat</a> | `nextchat` | 原 ChatGPT-Next-Web，轻量跨平台 ChatGPT 类应用 |
| <a href="https://github.com/lobehub/lobe-chat" target="_blank">Lobe Chat</a> | `lobe-chat` | 开源现代化 AI Chat 应用，支持多模型、插件、知识库等 |
| <a href="https://github.com/open-webui/open-webui" target="_blank">Open WebUI</a> | `open-webui` | 自托管 AI Chat UI，常用于 Ollama/本地模型/多模型接入 |
| <a href="https://github.com/mckaywrigley/chatbot-ui" target="_blank">Chatbot UI</a> | `chatbot-ui` | 开源 ChatGPT UI，适合作为轻量 UI 参考 |
| <a href="https://www.coze.cn/" target="_blank">Coze</a> | `coze` | 字节 AI Bot/Workflow 平台，非完全开源，但适合观察国内产品化形态 |

#### 1.11.11 浏览器 Agent、电脑使用与自动化

| 地址 | 标签 | 说明 |
| --- | --- | --- |
| <a href="https://github.com/browser-use/browser-use" target="_blank">Browser Use</a> | `browser-use` | 开源浏览器 Agent 框架，让 LLM 控制浏览器完成网页任务 |
| <a href="https://github.com/browserbase/stagehand" target="_blank">Stagehand</a> | `stagehand` | Browserbase 开源浏览器自动化 SDK，将自然语言操作与 Playwright 代码结合 |
| <a href="https://github.com/microsoft/playwright-mcp" target="_blank">Playwright MCP</a> | `playwright-mcp` | Playwright 的 MCP server，适合 AI 编码助手直接操作真实浏览器 |
| <a href="https://github.com/vercel-labs/agent-browser" target="_blank">Vercel Agent Browser</a> | `agent-browser` | 面向 AI Agent 的浏览器自动化 CLI |
| <a href="https://github.com/openinterpreter/open-interpreter" target="_blank">Open Interpreter</a> | `open-interpreter` | 本机电脑使用/自动化 Agent，可执行命令、文件操作和脚本 |
| <a href="https://github.com/OpenInterpreter/01" target="_blank">01</a> | `01` | Open Interpreter 生态的本地语音/电脑助理方向项目 |
| <a href="https://github.com/Significant-Gravitas/AutoGPT" target="_blank">AutoGPT</a> | `autogpt-history` | 早期自主 Agent 代表，建议作为历史案例/设计参考，而非首选工程框架 |
| <a href="https://github.com/BuilderIO/ai-shell" target="_blank">AI Shell</a> | `ai-shell` | 将自然语言转换为 Shell 命令的 CLI 工具，适合命令生成类轻量场景 |

#### 1.11.12 机器学习、浏览器端模型、语音和视觉 AI

| 地址 | 标签 | 说明 |
| --- | --- | --- |
| <a href="https://tensorflow.google.cn/js" target="_blank">TensorFlow.js</a> | `tensorflow-js` | 在浏览器或 Node.js 下运行机器学习/深度学习模型 |
| <a href="https://github.com/tensorflow/tfjs-models" target="_blank">TensorFlow.js Models</a> | `tfjs-models` | TensorFlow.js 预训练模型集合，包含姿态、检测、文本等模型 |
| <a href="https://github.com/ml5js/ml5-library" target="_blank">ML5.js</a> | `ml5` | 面向创意编程和 Web 开发者的友好机器学习库，基于 TensorFlow.js |
| <a href="https://github.com/mljs/ml" target="_blank">ML.js</a> | `mljs` | JavaScript 机器学习算法集合 |
| <a href="https://github.com/huggingface/transformers.js" target="_blank">Transformers.js</a> | `transformersjs` | Hugging Face 浏览器/Node Transformer 模型运行库 |
| <a href="https://github.com/microsoft/onnxruntime" target="_blank">ONNX Runtime Web</a> | `onnxruntime-web` | ONNX Runtime 的 Web 运行能力，适合浏览器端模型推理 |
| <a href="https://github.com/openai/whisper" target="_blank">Whisper</a> | `whisper` | OpenAI 开源语音识别模型 |
| <a href="https://github.com/ggerganov/whisper.cpp" target="_blank">whisper.cpp</a> | `whisper-cpp` | Whisper 的 C/C++ 高性能实现，适合本地/边缘端语音识别 |
| <a href="https://github.com/ricky0123/vad" target="_blank">VAD</a> | `vad` | 浏览器实时语音活动检测库 |
| <a href="https://github.com/microsoft/cognitive-services-speech-sdk-js" target="_blank">Azure Speech SDK</a> | `azure-speech` | 微软 Azure 语音服务 JavaScript SDK |
| <a href="https://github.com/opencv/opencv.js" target="_blank">OpenCV.js</a> | `opencvjs` | OpenCV 的 JavaScript 版本，用于浏览器端计算机视觉 |
| <a href="https://github.com/google-ai-edge/mediapipe" target="_blank">MediaPipe</a> | `mediapipe` | Google 跨平台媒体 AI/视觉任务框架，适合姿态、手势、人脸等场景 |


### 1.12 WebAssembly

地址 | 标签 | 说明
---- | ---- | ----
<a href="https://webassembly.org/" target="_blank">WebAssembly 官网</a> | `wasm` | WebAssembly 官方入口，适合了解 Wasm 标准、生态和基础资料。
<a href="https://developer.mozilla.org/zh-CN/docs/WebAssembly" target="_blank">MDN WebAssembly</a> | `wasm/mdn` | MDN 的 WebAssembly 文档，适合前端开发者入门和查询 Web API 集成方式。
<a href="https://www.assemblyscript.org/" target="_blank">AssemblyScript</a> | `assemblyscript` | TypeScript-like 的 WebAssembly 语言，适合前端/TS 开发者用接近 TypeScript 的语法编写 Wasm；注意它不是直接把完整 TypeScript 编译成 Wasm。
<a href="https://rustwasm.github.io/docs/wasm-pack/" target="_blank">wasm-pack</a> | `wasm-pack` | Rust → Wasm 构建、打包、发布到 npm 的常用工具；原 drager/wasm-pack 链接建议替换为当前 Rust/Wasm 官方生态入口。
<a href="https://rustwasm.github.io/docs/wasm-bindgen/" target="_blank">wasm-bindgen</a> | `wasm-bindgen` | Rust 与 JS/Wasm 绑定与 glue code 工具链核心，常与 wasm-pack 配合使用。
<a href="https://wasmtime.dev/" target="_blank">Wasmtime</a> | `wasmtime` | Bytecode Alliance 主导的快速、安全 Wasm runtime，适合服务端、插件系统、边缘计算等场景。
<a href="https://github.com/wasmerio/wasmer" target="_blank">Wasmer</a> | `wasmer` | 主流 Wasm runtime，可在服务端、边缘、嵌入式等场景运行 WebAssembly。
<a href="https://wasi.dev/" target="_blank">WASI</a> | `wasi` | WebAssembly System Interface，面向非浏览器 Wasm 运行环境的系统接口规范。
<a href="https://component-model.bytecodealliance.org/" target="_blank">WebAssembly Component Model</a> | `wasm-component-model` | WebAssembly 组件模型，用于构建可组合、可互操作的 Wasm 组件，是 Wasm 服务端/插件生态的重要方向。
<a href="https://github.com/bytecodealliance/wit-bindgen" target="_blank">wit-bindgen</a> | `wit-bindgen` | WebAssembly Component Model 的语言绑定生成工具，基于 WIT 描述 imports/exports 并生成多语言绑定。
<a href="https://www.npmjs.com/package/@bytecodealliance/jco" target="_blank">jco</a> | `jco` | Bytecode Alliance 提供的 JavaScript WebAssembly Component 工具链，支持在 JS 生态中处理 Wasm Components。
<a href="https://github.com/WebAssembly/wabt" target="_blank">WABT</a> | `wabt` | WebAssembly Binary Toolkit，包含 wat2wasm、wasm2wat 等底层转换和分析工具。
<a href="https://github.com/WebAssembly/binaryen" target="_blank">Binaryen</a> | `binaryen` | WebAssembly 编译器和优化工具链基础库，常用于 Wasm 优化、生成和分析。
<a href="https://emscripten.org/" target="_blank">Emscripten</a> | `emscripten` | C/C++ 编译到 WebAssembly 的经典工具链，适合迁移已有 C/C++ 库到 Web 或 Wasm runtime。
<a href="https://wasmedge.org/" target="_blank">WasmEdge</a> | `wasmedge` | CNCF 生态中的 WebAssembly runtime，常用于云原生、边缘计算和轻量服务场景。
<a href="https://github.com/WebAssembly/wasi-sdk" target="_blank">WASI SDK</a> | `wasi-sdk` | 面向 WASI 的 C/C++ 工具链，用于将 C/C++ 程序编译到 WASI 目标。
<a href="https://github.com/extism/extism" target="_blank">Extism</a> | `extism` | 基于 WebAssembly 的插件系统框架，适合构建多语言、安全沙箱化的插件能力。
<a href="https://github.com/suborbital/reactr" target="_blank">Suborbital Reactr</a> | `reactr` | 历史/参考：基于 WebAssembly 的函数运行和插件框架，适合了解 Wasm 在服务端插件系统中的探索。
<a href="https://mbebenita.github.io/WasmExplorer/" target="_blank"> WasmExplorer </a> | `WasmExplorer` | 历史参考：早期在线 Wasm playground，适合了解 Wasm 编译演示；现代项目建议优先参考 MDN、wasm-pack、WABT、Emscripten 等工具链。


### 1.13 IDE插件

#### 1.13.1 VS Code

地址 | 标签 | 说明
---- | ---- | ----
<a href="https://marketplace.visualstudio.com/" target="_blank">MarketPlace</a> | `marketplace` | VS Code 插件市场首页。
<a href="https://vscode.dev/" target="_blank">VSCode在线</a> | `VSCode` | VS Code 在线版，适合轻量编辑、远程仓库查看和临时开发。
<a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode" target="_blank">Prettier - Code formatter</a> | `prettier` | 官方 Prettier VS Code 插件，现代前端项目常用格式化工具；建议替代 Beautify/stylefmt 等老格式化插件。
<a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint" target="_blank">Eslint插件</a> | `eslint` | JS/TS 代码质量检查插件，现代前端项目常用。
<a href="https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint" target="_blank">stylelint</a> | `stylelint` | CSS/Less/SCSS 样式检查插件。
<a href="https://marketplace.visualstudio.com/items?itemName=Vue.volar" target="_blank">Vue - Official</a> | `volar/vue-official` | Vue 官方 VS Code 插件，Vue3 项目优先使用；可替代 Vetur。
<a href="https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin" target="_blank">TypeScript Vue Plugin</a> | `typescript-vue-plugin` | Vue + TypeScript 支持插件，适合 Vue3/TS 项目。
<a href="https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss" target="_blank">Tailwind CSS IntelliSense</a> | `tailwindcss` | Tailwind CSS 智能提示、补全和 lint 插件，Tailwind 项目常用。
<a href="https://marketplace.visualstudio.com/items?itemName=antfu.unocss" target="_blank">UnoCSS</a> | `unocss` | UnoCSS VS Code 插件，适合原子化 CSS 项目。
<a href="https://marketplace.visualstudio.com/items?itemName=biomejs.biome" target="_blank">Biome</a> | `biome` | Biome 官方 VS Code 插件，适合使用 Biome 做格式化和 lint 的项目。
<a href="https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig" target="_blank">EditorConfig for VS Code</a> | `editorconfig` | EditorConfig 支持插件，用于统一不同编辑器的缩进、换行等基础格式。
<a href="https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens" target="_blank">Error Lens</a> | `error-lens` | 将错误、警告直接展示在代码行内，适合提升开发反馈效率。
<a href="https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker" target="_blank">Code Spell Checker</a> | `code-spell-checker` | 代码单词拼写校验，适合文档、变量名、注释检查。
<a href="https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks" target="_blank">Bookmarks</a> | `bookmarks` | 代码书签插件，适合大项目代码阅读和定位。
<a href="https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens" target="_blank">GitLens</a> | `gitlens` | Git 源代码管理增强插件，可查看 blame、提交历史、作者信息等。
<a href="https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager" target="_blank">Project Manager</a> | `project-manager` | 本地项目管理插件，适合多项目切换。
<a href="https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph" target="_blank">Git Graph</a> | `git-graph` | Git 分支、提交历史图形化查看插件，适合多分支项目。
<a href="https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github" target="_blank">GitHub Pull Requests</a> | `github-pr` | GitHub PR 和 Issue 管理插件，适合在 VS Code 内进行代码评审和协作。
<a href="https://marketplace.visualstudio.com/items?itemName=humao.rest-client" target="_blank">REST Client</a> | `rest-client` | 在 VS Code 中直接发送 HTTP 请求的插件，适合接口调试和保存 API 调试用例。
<a href="https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client" target="_blank">Thunder Client</a> | `thunder-client` | VS Code 内置风格的 API 调试客户端，适合替代轻量 Postman 场景。
<a href="https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker" target="_blank">Docker</a> | `docker` | Docker 官方 VS Code 插件，适合容器、镜像、Compose 文件管理和调试。
<a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers" target="_blank">Dev Containers</a> | `dev-containers` | VS Code 远程容器开发插件，适合统一团队开发环境。
<a href="https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright" target="_blank">Playwright Test for VS Code</a> | `playwright` | Playwright 官方 VS Code 插件，适合编写、调试和运行 E2E 测试。
<a href="https://marketplace.visualstudio.com/items?itemName=vitest.explorer" target="_blank">Vitest</a> | `vitest` | Vitest 测试插件，适合现代 Vite/Vitest 项目。
<a href="https://marketplace.visualstudio.com/items?itemName=GitHub.copilot" target="_blank">GitHub Copilot</a> | `copilot` | GitHub 官方 AI 编码助手插件，适合代码补全、解释和辅助生成。
<a href="https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat" target="_blank">GitHub Copilot Chat</a> | `copilot-chat` | GitHub Copilot 的对话式编码助手插件。
<a href="https://marketplace.visualstudio.com/items?itemName=Continue.continue" target="_blank">Continue</a> | `continue` | 开源 AI 编码助手插件，支持连接多种模型和本地/远程代码上下文。
<a href="https://marketplace.visualstudio.com/items?itemName=SimonSiefke.svg-preview" target="_blank">Svg Preview</a> | `svg-preview` | SVG 图形预览插件。
<a href="https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight" target="_blank">Color Highlight</a> | `color-highlight` | 颜色预览插件。
<a href="https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code" target="_blank">Dart</a> | `dart-code` | Dart 语言开发支持。
<a href="https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter" target="_blank">Flutter</a> | `Flutter` | Flutter 开发支持。
<a href="https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint" target="_blank">Markdownlint</a> | `markdownlint` | Markdown 规范检查插件。
<a href="https://marketplace.visualstudio.com/items?itemName=abusaidm.html-snippets" target="_blank">HTML Snippets</a> | `html-snippets` | 历史参考：HTML 标签片段快速开发插件；现代 VS Code 已有较多内置补全能力。
<a href="https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify" target="_blank">Beautify</a> | `beautify` | 历史参考：JS/JSON/CSS/Sass/HTML 格式化插件，已不建议新项目优先使用；现代项目建议使用 Prettier。
<a href="https://marketplace.visualstudio.com/items?itemName=2gua.rainbow-brackets" target="_blank">Rainbow Brackets</a> | `rainbow-brackets` | 历史参考：括号颜色区分插件；VS Code 已内置 bracket pair colorization，通常无需额外安装。
<a href="https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-stylefmt" target="_blank">stylefmt</a> | `stylefmt` | 历史参考：CSS 格式化插件；现代项目建议使用 Prettier + Stylelint。
<a href="https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome" target="_blank">Debugger For Chrome</a> | `debugger-for-chrome` | 历史参考：VS Code 与 Chrome 联调插件，已废弃；现代 VS Code 已内置 JavaScript Debugger。
<a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin" target="_blank">TypeScript Tslint Plugin</a> | `typescript-tslint-plugin` | 历史参考：TSLint 已废弃；现代 TypeScript 项目建议使用 typescript-eslint。
<a href="https://marketplace.visualstudio.com/items?itemName=octref.vetur" target="_blank">vetur</a> | `vetur` | 存量维护：Vue2/Vetur 老项目维护参考；Vue3 项目建议使用 Vue - Official / Volar。
<a href="https://marketplace.visualstudio.com/items?itemName=maximetinu.identical-sublime-monokai-csharp-theme-colorizer" target="_blank">Identical Sublime Monokai</a> | `identical-sublime-monokai` | Sublime Monokai 风格主题，按个人习惯保留。
<a href="https://marketplace.visualstudio.com/items?itemName=HookyQR.minify" target="_blank">Minify</a> | `minify` | 历史参考：JS/CSS 直接压缩插件；现代项目通常由 Vite/Webpack/Rollup/Rspack 等构建链路处理压缩。
<a href="https://marketplace.visualstudio.com/items?itemName=pnp.polacode" target="_blank">polacode</a> | `polacode` | 代码截图插件，适合分享代码片段。
<a href="https://marketplace.visualstudio.com/items?itemName=sburg.vscode-javascript-booster" target="_blank">JavaScript Booster</a> | `javascript-booster` | JS/TS 快速重构优化工具，比如将 var 替换为 const/let。


### 1.14 Web3/区块链

地址 | 标签 | 说明
---- | ---- | ----
<a href="https://ethereum.org/developers/" target="_blank">Ethereum Developers</a> | `ethereum` | 以太坊官方开发者入口，适合了解钱包、智能合约、节点、工具链和 DApp 开发基础。
<a href="https://docs.soliditylang.org/" target="_blank">Solidity</a> | `solidity` | 以太坊智能合约编程语言官方文档。
<a href="https://github.com/OpenZeppelin/openzeppelin-contracts" target="_blank">OpenZeppelin</a> | `openzeppelin` | 安全的智能合约标准库，包含 ERC20/ERC721/ERC1155 等常用合约实现。
<a href="https://github.com/ethers-io/ethers.js/" target="_blank">Ethers.js</a> | `ethers` | 经典以太坊 JavaScript/TypeScript 库，适合钱包、合约调用、签名、交易等场景；现代新项目也可评估 Viem。
<a href="https://viem.sh/" target="_blank">Viem</a> | `viem` | 现代化、TypeScript 优先的以太坊接口库，轻量、模块化、类型友好。
<a href="https://wagmi.sh/" target="_blank">Wagmi</a> | `wagmi` | React Hooks for Ethereum，当前主线基于 Viem，适合 React DApp 的钱包连接、合约读写、账户状态和交易状态管理。
<a href="https://rainbowkit.com/" target="_blank">RainbowKit</a> | `rainbowkit` | React 钱包连接组件库，适合快速构建较好的钱包连接体验。
<a href="https://connectkit.family/" target="_blank">ConnectKit</a> | `connectkit` | 美观、现代的 Web3 钱包连接组件。
<a href="https://reown.com/appkit" target="_blank">Reown AppKit</a> | `reown-appkit` | WalletConnect/Web3Modal 方向的新入口，提供钱包连接、账户登录、嵌入式钱包等 Onchain App 体验能力。
<a href="https://docs.family.co/web3modal" target="_blank">Web3Modal</a> | `web3modal` | 存量维护/历史参考：以太坊钱包连接库；新项目建议同时关注 Reown AppKit。
<a href="https://metamask.io/sdk/" target="_blank">MetaMask SDK</a> | `metamask-sdk` | MetaMask 官方开发工具包。
<a href="https://walletconnect.com/" target="_blank">WalletConnect</a> | `walletconnect` | 连接去中心化应用与移动钱包的开放协议。
<a href="https://thirdweb.com/" target="_blank">Thirdweb</a> | `thirdweb` | 构建 Web3 应用的完整开发平台，提供 SDK、合约、钱包、基础设施等能力。
<a href="https://moralis.io/" target="_blank">Moralis</a> | `moralis` | Web3 开发平台，提供 API、索引和基础设施能力。
<a href="https://www.alchemy.com/" target="_blank">Alchemy</a> | `alchemy` | 区块链开发平台和 API 提供商，常用于 RPC、NFT、Token、交易等数据服务。
<a href="https://infura.io/" target="_blank">Infura</a> | `infura` | 以太坊、IPFS 等基础设施 API 网关服务。
<a href="https://www.quicknode.com/" target="_blank">QuickNode</a> | `quicknode` | 区块链基础设施 API 服务，支持多链 RPC 和数据服务。
<a href="https://hardhat.org/" target="_blank">Hardhat</a> | `hardhat` | 主流以太坊智能合约开发环境，支持编译、测试、部署、调试等流程。
<a href="https://book.getfoundry.sh/" target="_blank">Foundry</a> | `foundry` | Rust 编写的高性能以太坊智能合约开发工具链，包含 forge、cast、anvil 等工具。
<a href="https://book.getfoundry.sh/anvil/" target="_blank">Anvil</a> | `anvil` | Foundry 生态中的本地区块链节点，适合智能合约本地开发和测试。
<a href="https://github.com/scaffold-eth/scaffold-eth-2" target="_blank">Scaffold-ETH 2</a> | `scaffold-eth` | 现代以太坊 DApp 快速开发模板，常见组合是 Hardhat/Foundry、Viem、Wagmi、RainbowKit、Next.js。
<a href="https://trufflesuite.com/" target="_blank">Truffle</a> | `truffle` | 历史参考：经典以太坊开发框架，Truffle/Ganache 已 sunset 并归档；新项目建议优先 Hardhat 或 Foundry。
<a href="https://tenderly.co/" target="_blank">Tenderly</a> | `tenderly` | 智能合约调试、模拟、监控和链上分析平台。
<a href="https://thegraph.com/docs/" target="_blank">The Graph</a> | `the-graph` | 区块链数据索引协议，适合构建链上数据查询服务。
<a href="https://docs.chain.link/" target="_blank">Chainlink</a> | `chainlink` | 去中心化预言机网络，常用于价格、随机数、自动化等链上/链下数据交互。
<a href="https://docs.safe.global/" target="_blank">Safe</a> | `safe` | 多签钱包和智能账户基础设施，适合 DAO、团队资金管理和账户抽象相关场景。
<a href="https://eips.ethereum.org/EIPS/eip-1193" target="_blank">EIP-1193</a> | `eip-1193` | Ethereum Provider JavaScript API 标准，钱包注入和 DApp 交互的基础规范。
<a href="https://eips.ethereum.org/EIPS/eip-6963" target="_blank">EIP-6963</a> | `eip-6963` | 多钱包注入发现标准，解决多个钱包扩展同时注入时的发现和选择问题。
<a href="https://docs.optimism.io/" target="_blank">Optimism Docs</a> | `optimism` | Optimism / OP Stack 官方文档，适合了解以太坊 L2 和 Rollup 生态。
<a href="https://docs.arbitrum.io/" target="_blank">Arbitrum Docs</a> | `arbitrum` | Arbitrum 官方文档，适合了解 Arbitrum L2、合约部署和前端集成。
<a href="https://docs.polygon.technology/" target="_blank">Polygon Docs</a> | `polygon` | Polygon 官方文档，适合了解 Polygon PoS、zkEVM 和相关开发工具。
<a href="https://docs.base.org/" target="_blank">Base Docs</a> | `base` | Base 官方开发者文档，适合了解 Base 链、合约部署和 Onchain App 开发。
<a href="https://docs.ipfs.tech/" target="_blank">IPFS</a> | `ipfs` | 去中心化存储网络文档，适合了解内容寻址、文件存储和分发。
<a href="https://docs.ceramic.network/" target="_blank">Ceramic Network</a> | `ceramic` | 去中心化数据网络，适合 DID、用户数据和可组合数据场景。
<a href="https://gun.eco/" target="_blank">GUN</a> | `gun` | 去中心化数据同步协议，适合 P2P 数据同步、离线优先应用等实验性场景。


### 1.15 生活篇


地址 | 标签 | 说明
---- | ---- | ----
<a href="https://github.com/Anduin2017/HowToCook" target="_blank">HowToCook</a> | `HowToCook` | 程序员在家做饭方法指南，适合用工程化方式学习做饭。
<a href="https://github.com/geekan/HowToLiveLonger" target="_blank">HowToLiveLonger</a> | `HowToLiveLonger` | 程序员健康生活资料集合，适合作为健康习惯、风险因素和生活方式参考；不替代专业医疗建议。
<a href="https://github.com/awesome-selfhosted/awesome-selfhosted" target="_blank">Awesome Selfhosted</a> | `awesome-selfhosted` | 自托管开源服务集合，适合搭建个人工具、家庭服务器和私有化服务。
<a href="https://github.com/Kickball/awesome-selfhosted" target="_blank">Awesome Selfhosted Archive</a> | `awesome-selfhosted-archive` | 历史参考：早期自托管服务集合，部分内容可能已迁移或过时。
<a href="https://github.com/pluja/awesome-privacy" target="_blank">Awesome Privacy</a> | `awesome-privacy` | 隐私工具和隐私友好型服务集合，适合了解个人数据保护和替代工具。
<a href="https://github.com/trimstray/the-book-of-secret-knowledge" target="_blank">The Book of Secret Knowledge</a> | `secret-knowledge` | 面向工程师的命令行、系统、网络、安全、效率技巧集合。
<a href="https://github.com/sindresorhus/awesome" target="_blank">Awesome</a> | `awesome` | GitHub Awesome 系列总入口，可作为各类技术/生活资料集合的导航。
<a href="https://github.com/jlevy/the-art-of-command-line" target="_blank">The Art of Command Line</a> | `command-line` | 命令行使用技巧集合，适合程序员提升日常效率。
<a href="https://github.com/yangshun/tech-interview-handbook" target="_blank">Tech Interview Handbook</a> | `interview` | 技术面试准备资料集合，适合求职、面试官题库和系统化复习。
<a href="https://github.com/jwasham/coding-interview-university" target="_blank">Coding Interview University</a> | `coding-interview` | 计算机基础与算法面试长期学习计划，适合系统补基础。



------------------


## 2.fe-tools方法/工具库

### 2.1 utils说明

前端开发常用的通用工具方法，适用于浏览器/NodeJS。文档见[https://blog.michealwayne.cn/fe-tools/stable/](https://blog.michealwayne.cn/fe-tools/stable/)

#### 模块

- [env](./utils/packages/env/)：环境判断常量；
- [utils](./utils/packages/utils/)：基础工具方法集合，与环境无关；
- [web-utils](./utils/packages/web-utils/)：web基础工具方法集合。浏览器端DOM操作，CSS操作，事件处理等封装，适用于浏览器；
- [node-utils](./utils/packages/node-utils/)：NodeJS文件，事件处理等封装；
- [node-img-build](./utils/packages/node-img-build/)：webp、base64等图片处理封装，基于gm；
- [canvas-utils](./utils/packages/canvas-utils/)：Canvas图形绘制封装，可在web/node-canvas中使用。
- [ai-utils](./utils/packages/ai-utils/)：AI 大模型相关封装、包括代码检查等一些应用。

#### 启动utils项目步骤

（需要在`./utils`目录下）

- 执行`pnpm install`安装依赖；
- 构建：`npm run build:prod`
- 构建文档：`npm run docs`

> todo: 小程序封装，构建封装。

#### 2.2 project-templates 一些前后端项目模版

`frontend` 前端项目模版

- [webpack](./project-templates/frontend/webpack/)
- [webpack + ts](./project-templates/frontend/webpack%2Bts/)
- [vite + vue3](./project-templates/frontend/vite-vue3+ts/)
- [vue2](./project-templates/frontend/vue/)
- [vite + react 17](./project-templates/frontend/vite-react+ts/)
- [react16](./project-templates/frontend/react/)

`backend` 后端项目模版

- [koa2](./project-templates/backend/koa2/)


#### 2.3 ~~styles基础样式库~~

请移至 CSS 推荐规范[MooCSS](https://github.com/MichealWayne/Moo-CSS)及通用样式库[moo-css-base npm](https://www.npmjs.com/package/moo-css-base)，[moo-css-base github](https://github.com/MichealWayne/Moo-CSS/tree/master/moo-css-base)

------------------

## FE-Tools - Chrome插件

> 具体项目及源码地址：[https://github.com/MichealWayne/fe-tools-chrome-plugin](https://github.com/MichealWayne/fe-tools-chrome-plugin)

![chrome-ext.png](https://blog.michealwayne.cn/images/fe-tools/chrome-ext.png)

辅助前端开发的一个小插件。

### 功能：
- 工具网站搜索（`√`）
- 本地收藏夹网站搜索（`√`）
- 拼音 / 首字母搜索（`√`）
- CSS 属性 / Moo-CSS 搜索（`√`）
- URL 转二维码及 SVG 矢量图（`√`）
- 图片压缩及转 Base64（`√`）
- px/rem/vw 换算计算器（`√`）
- HEX/RGB/HSB/HSL 色值换算（`√`）
- 有道翻译快捷入口（`√`）
- API 测试 / 简易 Postman（`√`）
- 请求环境变量管理（`√`）
- 常用正则查询与测试（`√`）
- JSON 转换、格式化与验证（`√`）
- SVG 在线编辑与优化（`√`）
- 日期 / 时间戳转换与日期计算（`√`）
- Linux 命令查询（`√`）
- 页面截图（整页 / 节点截图并保存）（`√`）
- 当前页面技术栈判断（`√`）
- 工具函数库搜索（`√`）
- 中英文切换（`√`）

[前往>>](https://github.com/MichealWayne/fe-tools/tree/master/chrome-extension)

### 安装方式

clone本仓库到本地，在`“扩展程序”界面`点击`“加载已解压的拓展程序”`选择本地仓库目录下的chrome-extension目录。
